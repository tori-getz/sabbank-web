
import React from 'react';

import { Row } from 'react-bootstrap';
import { ButtonWalletAction } from '@components/ui';
import styles from './WalletActions.module.sass'
import cn from 'classnames';

import { useTranslation } from '@hooks';

import { useNavigate } from 'react-router-dom';

interface IWalletActions {};

interface IWalletAction {
    label: string
    icon: string
    action: () => any
};

export const WalletActions: React.FC<IWalletActions> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const walletActions: Array<IWalletAction> = [
        {
            label: t('Receive'), 
            icon: 'receive',
            action: () => navigate("/receive")
        },
        {
            label: t('Transfer'), 
            icon: 'transfer',
            action: () => navigate("/transfer")
        },
        {
            label: t('Exchange'), 
            icon: 'exchange',
            action: () => navigate("/exchange")
        },
        {
            label: t('Cashout'), 
            icon: 'cashout',
            action: () => navigate("/cashout")
        },                 
    ];

    return (
        <Row className={cn(styles.walletActionsWrapper)}>
            {walletActions.map((button: IWalletAction, key: number) => (
                <ButtonWalletAction label={button.label} icon={button.icon} onClick={() => button.action() } className="col-sm-6 col-md-3" />
            ))}
        </Row>
    )
}
