
import React, { useState, useEffect } from 'react';

import { ScreenContainer } from '@containers'

import {
    useTranslation,
    useDeposit,
    useWallet
} from '@hooks';

import {
    useLocation,
    useNavigate
} from 'react-router-dom';

import {
    Spinner,
    Label,
    TokenSelectItem,
    Divider,
    GoBack,
    CurrencyInput,
    Button,
    ConfirmModal
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import { moneyAmountFormatter } from '@utils';

import type {
    IDepositWithdrawInfo,
    IWalletCurrency
} from '@typing';

import styles from './DepositWithdrawScreen.module.sass';
import cn from 'classnames';

interface ILocationState {
    id: string
}

interface IDepositWithdrawScreen {};

export const DepositWithdrawScreen: React.FC<IDepositWithdrawScreen> = () => {
    const { t } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();

    const { currencies } = useWallet();
    const { getWithdrawInfo, withdraw } = useDeposit();

    const { id } = location.state as ILocationState;

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ info, setInfo ] = useState<IDepositWithdrawInfo>();
    const [ token, setToken ] = useState<IWalletCurrency>();

    const [ amount, setAmount ] = useState<string>('');

    const [ confirmVisible, setConfirmVisible ] = useState<boolean>(false);
    const [ confirmLoading, setConfirmLoading ] = useState<boolean>(false);

    const getData = async () => {
        try {
            setLoading(true);

            const withdrawInfo = await getWithdrawInfo({ id });

            setInfo(withdrawInfo);
            setToken(currencies.find(c => c.asset === withdrawInfo?.asset?.ticker));
        } catch (e) {
            console.error(e);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const onConfirm = async () => {
        try {
            setConfirmLoading(true);

            await withdraw({ id, amount });

            if (Number(amount) < Number(info.amount)) {
                navigate(`/deposit/${id}`)
            } else {
                navigate('/deposit')
            }
        } catch (e) {
            console.error(e);
            navigate('/deposit');
        }
    }

    if (loading) {
        return (
            <ScreenContainer title={t('Loading')}>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title={`${t('Withdraw')} ${token.asset.toUpperCase()}`}>
            <GoBack onClick={() => navigate(-1)} />
            <div className="widgetTitleL">{t('Withdraw')} {token.asset.toUpperCase()}</div>
            <Card className={styles.fundsCard}>
                <CardContent>
                    <div className={cn(styles.funds)}>
                        <div>{t('Available assets')}</div>
                        <div className={styles.fundsAmount}>{moneyAmountFormatter(info.amount, 8)} {token.asset.toUpperCase()}</div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className={styles.withdrawFormWrapper}>
                        <div className="widgetTitle">{t('Cryptocurrency')}</div>
                        <Label>{t('Withdrawal of funds to a crypto wallet')}</Label>
                        <div className={cn(styles.token, 'mt-2')}>
                            <TokenSelectItem {...token} />
                        </div>
                        <Divider className='my-4' />
                        <div className="widgetTitle">{t('Withdrawal amount')}</div>
                        <Label>{t('Enter withdrawal amount')}</Label>
                        <CurrencyInput
                            value={amount}
                            onChange={setAmount}
                            assetFrom={token.asset}
                        />
                        <Button
                            label={t('Withdraw')}
                            className={styles.button}
                            disabled={!amount || Number(amount) > Number(info.amount)}
                            onClick={() => setConfirmVisible(true)}
                        />
                    </div>
                </CardContent>
            </Card>
            <ConfirmModal
                label={`${t('Withdraw')} ${token.asset.toUpperCase()}`}
                visible={confirmVisible}
                loading={confirmLoading}
                onClose={() => setConfirmVisible(false)}
                table={[
                    {
                        name: t('Cryptocurrency'),
                        value: token.name
                    },
                    {
                        name: t('Amount'),
                        value: `${amount} ${token.asset.toUpperCase()}`
                    }
                ]}
                onConfirm={onConfirm}
            />
        </ScreenContainer>
    )
}
