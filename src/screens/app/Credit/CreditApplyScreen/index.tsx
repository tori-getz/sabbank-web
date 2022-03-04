
import React, { useState, useEffect, useCallback } from 'react';

import { ScreenContainer } from '@containers';

import type {
    iCurrency,
    ICreditSetting
} from '@typing';

import {
    useTranslation,
    useWallet,
    useCredit
} from '@hooks';

import {
    GoBack,
    TokenSelect,
    Label,
    CurrencyInput,
    CurrencyAmount,
    Spinner
} from '@components/ui';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';
import { debounce, head, isEmpty } from 'lodash';

interface ICreditApplyScreen {};

export const CreditApplyScreen: React.FC<ICreditApplyScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currencies } = useWallet();
    const {
        getCreditAmount,
        getSettings
    } = useCredit();

    const [ token, setToken ] = useState<iCurrency>(head(currencies));
    const [ depositAmount, setDepositAmount ] = useState<string>('');

    const [ loanAmount, setLoanAmount ] = useState<string>('0');
    const [ loanAmountLoading, setLoanAmountLoading ] = useState<boolean>(false);

    const [ settingsObject, setSettingsObject ] = useState<ICreditSetting[]>([]);
    const [ filteredSettingsObject, setFilteredSettingsObject ] = useState<ICreditSetting[]>([]);

    const handleCreditAmount = useCallback(
        debounce(async () => {
            if (!depositAmount) return setLoanAmount('0');

            try {
                setLoanAmountLoading(true);
    
                const amount = await getCreditAmount(depositAmount, token.asset);
    
                setLoanAmount(moneyAmountFormatter(amount, 8));
            } catch (e) {
                console.error(e);
            } finally {
                setLoanAmountLoading(false);
            }
        }, 500),
        [depositAmount]
    );

    useEffect(() => {
        getSettings();
    }, []);

    useEffect(() => {
        handleCreditAmount();
    }, [depositAmount]);

    return (
        <ScreenContainer title={t('Credit')}>
            <GoBack onClick={() => navigate('/credit')}/>
            <h2>{t('Credit')}</h2>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{t('Cryptocurrency')}</h4>
                        <Label>{t('Choose a cryptocurrency for collateral')}</Label>
                        <TokenSelect
                            defaultValue={token}
                            items={currencies.filter(c => c.asset !== 'usdt')}
                            onChange={c => setToken(c)}
                        />
                        <h4 className='mt-5'>{t('DepositAmount')}</h4>
                        <Label>{t('Enter the depositamount')}</Label>
                        <CurrencyInput
                            value={depositAmount}
                            onChange={setDepositAmount}
                            assetFrom={token?.asset}
                        />
                        <h4 className='mt-5'>{t('Loan amount')}</h4>
                        <CurrencyAmount
                            amount={loanAmount}
                            asset='usdt'
                        >
                            {loanAmountLoading && <Spinner />}
                        </CurrencyAmount>
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    );
}
