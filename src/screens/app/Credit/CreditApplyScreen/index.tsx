
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
    Spinner,
    ToggleButton,
    Checkbox,
    Button,
    Details
} from '@components/ui';

import {
    PaymentMethod,
    CreditAgreement
} from '@components';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';
import { debounce, head, isEmpty } from 'lodash';
import { format as formatDate } from 'date-fns';

import styles from './CreditApplyScreen.module.sass';

interface ICreditApplyScreen {};

interface IDetailsTable {
    name: string
    value: string
}

export const CreditApplyScreen: React.FC<ICreditApplyScreen> = () => {
    const { t, language } = useTranslation();
    const navigate = useNavigate();

    const { currencies } = useWallet();
    const {
        getCreditAmount,
        getSettings,
        settings,
        prepareCredit
    } = useCredit();

    const [ token, setToken ] = useState<iCurrency>(head(currencies));
    const [ depositAmount, setDepositAmount ] = useState<string>('');

    const [ loanAmount, setLoanAmount ] = useState<string>('0');
    const [ loanAmountLoading, setLoanAmountLoading ] = useState<boolean>(false);

    const [ comissionCurrency, setComissionCurrency ] = useState<string>('');

    const [ detailsTable, setDetailsTable ] = useState<IDetailsTable[]>([]);
    const [ agree, setAgree ] = useState<boolean>(false);

    const [ settingsObject, setSettingsObject ] = useState<ICreditSetting>(null);
    const [ filteredSettings, setFilteredSettings ] = useState<ICreditSetting[]>([]);

    const [ creditAgreement, setCreditAgreement ] = useState<boolean>(false);
    const [ prepareLoading, setPrepareLoading ] = useState<boolean>(false);

    const paymentMethods = currencies.filter(c => [ 'tether' ].includes(c.id));

    useEffect(() => {
        setDepositAmount('');
        setLoanAmount('0');

        if (settings?.length > 0) {
            setFilteredSettings(settings.filter(s => s.currency === token.asset));
            setSettingsObject(settings.find(s => s.currency === token.asset));
        }
    }, [token, settings]);

    useEffect(() => {
        if (settingsObject) {
            setDetailsTable([
                {
                    name: t('Interest rate'),
                    value: `${settingsObject.rate}%`
                },
                {
                    name: t('Maturity date'),
                    value: formatDate(new Date(settingsObject?.close_date), 'dd.MM.yyyy')
                },
                {
                    name: t('Liquidation threshold'),
                    value: `${settingsObject.limit_warning}%`
                }
            ]);
        }
    }, [settingsObject, language]);

    const handleCreditAmount = useCallback(
        debounce(async () => {
            if (!depositAmount) return setLoanAmount('0');

            try {
                setLoanAmountLoading(true);
    
                const amount = await getCreditAmount(depositAmount, token.asset, settingsObject?.ltv);
    
                setLoanAmount(moneyAmountFormatter(amount, 8));
            } catch (e) {
                console.error(e);
            } finally {
                setLoanAmountLoading(false);
            }
        }, 500),
        [token, depositAmount, settingsObject]
    );

    const getPaymentComission = (): string => {
        const comission = (Number(settingsObject?.comission) * 100) || 0;

        return comission.toString();
    }

    const getComissionAmount = (): string => {
        const comission = Number(settingsObject?.comission) * Number(loanAmount);

        return comission.toString();
    }

    useEffect(() => {
        getSettings();
    }, []);

    useEffect(() => {
        handleCreditAmount();
    }, [depositAmount, settingsObject]);

    const getBtnDisabledState = (): boolean => {
        if (!settingsObject) return true
        if (!depositAmount) return true
        if (loanAmount === '0') return true
        if (!comissionCurrency) return true;
        if (!agree) return true;

        return false;
    }

    const onAgree = useCallback(
        async () => {
            try {
                setPrepareLoading(true);
    
                const { id } = await prepareCredit({
                    deposit: depositAmount,
                    settings: settingsObject?.id,
                    comission_currency: comissionCurrency
                });
    
                navigate(`/credit/success/${id}`);
            } catch (e) {
                console.error(e)
            } finally {
                setPrepareLoading(false);
            }
        },
        [depositAmount, settingsObject, comissionCurrency]    
    );

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
                        {!isEmpty(filteredSettings) && (
                            <>
                                <h4 className='mt-5'>{t('Loan/collateral ratio (LTV)')}</h4>
                                <div className={styles.ltvSelect}>
                                    {filteredSettings?.map((s: ICreditSetting, key: number) => (
                                        <ToggleButton
                                            active={s.id === settingsObject?.id}
                                            label={`${s.ltv}%`}
                                            onClick={() => setSettingsObject(s)}
                                            key={key}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                        <h4 className='mt-5'>{t('Loan amount')}</h4>
                        <CurrencyAmount
                            amount={loanAmount}
                            asset='usdt'
                        >
                            {loanAmountLoading && <Spinner />}
                        </CurrencyAmount>
                        <h4 className='mt-5'>{t('Commission payment method')}</h4>
                        {paymentMethods.map((pm: iCurrency, key: number) => (
                            <PaymentMethod
                                active={pm.asset === comissionCurrency}
                                onClick={() => setComissionCurrency(pm.asset)}
                                comission={getPaymentComission()}
                                currency={pm}
                                key={key}
                            />
                        ))}
                        <h4 className='mt-5'>{t('Term')}</h4>
                        <Card>
                            <CardContent>
                                <div className={styles.term}>
                                    1 {t('Year').toLowerCase()}
                                </div>
                            </CardContent>
                        </Card>
                        <Details
                            items={detailsTable}
                        />
                        <div className='d-flex mt-5'>
                            <div className={styles.agree}>
                                <Checkbox
                                    value={agree}
                                    onChange={() => setAgree(!agree)}
                                />
                                <div className={styles.agreeLabel}>
                                    {t('By submitting the form you agree to the loan agreement')}
                                </div>
                            </div>
                            <Button
                                label={t('Apply for a loan')}
                                disabled={getBtnDisabledState()}
                                onClick={() => {
                                    setCreditAgreement(true);
                                }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <CreditAgreement
                loanAmount={`${loanAmount} USDT`}
                maturityDate={settingsObject?.close_date && formatDate(new Date(settingsObject?.close_date), 'dd.MM.yyyy')}
                comission={`${getComissionAmount()} ${comissionCurrency.toUpperCase()}`}
                interestRate={`${settingsObject?.rate}%`}
                liquidationThreshold={`${settingsObject?.limit_warning}%`}
                visible={creditAgreement}
                loading={prepareLoading}
                onClose={() => setCreditAgreement(false)}
                onAgree={onAgree}
            />
        </ScreenContainer>
    );
}
