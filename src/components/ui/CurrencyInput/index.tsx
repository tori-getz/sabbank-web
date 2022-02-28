
import React, { useCallback, useState } from 'react';

import styles from './CurrencyInput.module.sass';
import cn from 'classnames';

import { Icon, Spinner } from '@components/ui';

import {
    CryptoCurrencyService
} from '@services';

import {
    moneyAmountFormatter
} from '@utils';

import { debounce } from 'lodash';

interface ICurrencyInput {
    value: string
    assetFrom: string
    assetTo?: string
    className?: string
    onChange: (newValue: string) => any
    loading?: boolean
};

export const CurrencyInput: React.FC<ICurrencyInput> = ({
    value,
    className,
    assetFrom,
    assetTo = 'usdt',
    onChange,
    loading
}) => {
    const cryptoCurrencyService = new CryptoCurrencyService();

    const [ toValue, setToValue ] = useState<string>('');
    
    const [ fromLoading, setFromLoading ] = useState<boolean>(false);
    const [ toLoading, setToLoading ] = useState<boolean>(false);

    const formatValue = (newValue: string): string => {
        if (!newValue) {
            return '';
        }

        const formattedValue: string = newValue.replace(',', '.');
        const separatorCount: number = formattedValue.toString().split("").filter(symbol => symbol === '.').length;

        const withConditionValue: string = separatorCount <= 1 ? formattedValue : value;

        return withConditionValue;
    }

    const exchangeToValue = useCallback(
        debounce(async (newValue: string) => {
            try {
                setToLoading(true);

                const { result } = await cryptoCurrencyService.aetExchangeRate({
                    asset_from: assetFrom,
                    asset_to: assetTo,
                    amount: Number(newValue)
                });

                setToValue(moneyAmountFormatter(result, 2));
            } catch (e) {
                console.error(e);
            } finally {
                setToLoading(false);
            }
        }, 500),
        [assetFrom]
    );

    const exchangeFromValue = useCallback(
        debounce(async (newValue: string) => {
            try {
                setFromLoading(true);

                const { result } = await cryptoCurrencyService.aetExchangeRate({
                    asset_from: assetTo,
                    asset_to: assetFrom,
                    amount: Number(newValue)
                });

                onChange(moneyAmountFormatter(result, 8));
            } catch (e) {
                console.error(e);
            } finally {
                setFromLoading(false);
            }
        }, 500),
        [assetTo]
    );

    const handleFromChange = (newValue: string) => {
        onChange(formatValue(newValue));

        if (assetFrom !== assetTo) {
            exchangeToValue(formatValue(newValue));   
        }
    }

    const handleToChange = (newValue: string) => {
        setToValue(newValue);

        exchangeFromValue(newValue);
    }

    return (
        <div className={styles.wrapper}>
            <div className={cn(styles.field, className)}>
                <input
                    value={value}
                    onChange={e => handleFromChange(e.target.value)}
                    className={styles.input}
                    placeholder='0'
                />
                {(loading || fromLoading) ? (
                    <Spinner />
                ) : (
                    <div>{assetFrom.toUpperCase()}</div>
                )}
            </div>
            {assetFrom !== assetTo && (
                <>
                    <Icon name='equals' />
                    <div className={cn(styles.field, className)}>
                        <input
                            value={toValue}
                            onChange={e => handleToChange(e.target.value)}
                            className={styles.input}
                            placeholder='0'
                        />
                        {toLoading ? (
                            <Spinner />
                        ) : (
                            <div>{assetTo.toUpperCase()}</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
