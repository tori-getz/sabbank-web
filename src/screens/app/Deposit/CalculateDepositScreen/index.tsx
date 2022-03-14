
import React, { useCallback, useState } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useWallet,
    useDeposit
} from '@hooks';

import {
    Divider, 
    GoBack,
    Label,
    TokenSelect,
    CurrencyInput,
    Button
} from '@components/ui';

import { CalculateDepositHeader, DepositCreateConfirm } from '@components';

import { useNavigate, useLocation } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';

import {
    iCurrency,
    IDepositSettingCurrency,
    IDepositSettingCurrencyPeriod,
} from '@typing';

interface ILocationState {
    currency: IDepositSettingCurrency | iCurrency,
    period: IDepositSettingCurrencyPeriod,
    depositId?: string
}

import styles from './CalculateDepositScreen.module.sass';
import cn from 'classnames';

interface ICalculateDepositScreen {};

export const CalculateDepositScreen: React.FC<ICalculateDepositScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state as ILocationState;
    const { currency, period } = location.state as ILocationState;

    const { currencies } = useWallet();
    const { createDeposit, topUpDeposit } = useDeposit();

    const [ confirmVisible, setConfirmVisible ] = useState<boolean>(false);
    const [ confirmLoading, setConfirmLoading ] = useState<boolean>(false);

    const [ selectedCurrency, setSelectedCurrency ] = useState<iCurrency>(currencies.find(c => c.asset === currency.asset));

    const [ amount, setAmount ] = useState<string>('');

    const getButtonDisabledState = useCallback((): boolean => {
        const formattedValue = Number(amount);
        const formattedBalance = Number(selectedCurrency.balance);
        const depositLimit = period?.depositPeriod?.deposit_limit || 0; 

        if (formattedValue < depositLimit) return true;

        return formattedValue > formattedBalance || formattedValue === 0;
    }, [amount]);

    const getButtonText = useCallback((): string => {
        const formattedValue = Number(amount);
        const depositLimit = period?.depositPeriod?.deposit_limit || 0;
        const formattedBalance = Number(selectedCurrency.balance);

        if (formattedValue > formattedBalance) return t('Insufficient balance').toUpperCase();
        
        if (formattedValue < depositLimit) return `${t('Below min. deposit')} ${moneyAmountFormatter(depositLimit, 8)} ${currency.asset.toUpperCase()}`.toUpperCase();

        return `${t('Deposit')} ${formattedValue} ${selectedCurrency.asset.toUpperCase()}`.toUpperCase();
    }, [selectedCurrency, amount]);

    const onConfirm = async () => {
        try {
            setConfirmLoading(true);

            if (!state?.depositId) {
                const { id } = await createDeposit({
                    deposit_settings: period?.depositPeriod?.settingsId,
                    amount: amount
                });

                navigate(`/deposit/success/${id}`);
            } else {
                await topUpDeposit({
                    deposit_id: state?.depositId,
                    amount: amount
                });

                navigate(`/deposit/${state?.depositId}`);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setConfirmVisible(false);
            setConfirmLoading(false);
        }
    }

    return (
        <ScreenContainer title={t('Deposit')}>
            <GoBack
                onClick={() => navigate(-1)}
            />
            <h3>{t('Deposit')}</h3>
            <CalculateDepositHeader
                currency={currency as IDepositSettingCurrency}
                period={period}
            />
            <Card>
                <CardContent>
                    <div className='p-2 pt-4 pb-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Wallet from which funds for the deposit will be credited')}</Label>
                        <TokenSelect
                            defaultValue={selectedCurrency}
                            items={currencies}
                            onChange={setSelectedCurrency}
                        />
                        <Divider className='mt-4 mb-4' />
                        <h4>{t('Deposit amount')}</h4>
                        <Label>{t('Enter the deposit amount')}</Label>
                        <CurrencyInput
                            value={amount}
                            onChange={setAmount}
                            assetFrom={selectedCurrency.asset}
                            // value={amount}
                        />
                        <Button
                            label={getButtonText()}
                            disabled={getButtonDisabledState()}
                            onClick={() => setConfirmVisible(true)}
                            className={cn(
                                styles.nextButton,
                                'mt-4'
                            )}
                        />
                    </div>
                </CardContent>
            </Card>
            <DepositCreateConfirm
                currency={currency as IDepositSettingCurrency}
                period={period}
                selectedWallet={selectedCurrency}
                amount={amount}
                visible={confirmVisible}
                onClose={() => setConfirmVisible(false)}
                loading={confirmLoading}
                onConfirm={onConfirm}
            />
        </ScreenContainer>
    )
}
