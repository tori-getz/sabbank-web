
import React from 'react';

import { ButtonWalletAction } from '@components/ui';
import styles from './WalletActions.module.sass'
import cn from 'classnames';

interface IWalletActions {};

interface IWalletAction {
    label: string
    icon: string
    action: () => any
};

export const WalletActions: React.FC<IWalletActions> = () => {
    const walletActions: Array<IWalletAction> = [
        {
            label: 'Receive', 
            icon: 'receive',
            action: () => alert("receive")
        },
        {
            label: 'Transfer', 
            icon: 'transfer',
            action: () => alert("transfer")
        },
        {
            label: 'Exchange', 
            icon: 'exchange',
            action: () => alert("exchange")
        },
        {
            label: 'Cashout', 
            icon: 'cashout',
            action: () => alert("cashout")
        },                 
    ];

    return (
        <div className={cn(styles.walletActionsWrapper, "row")}>
            {walletActions.map((button: IWalletAction, key: number) => (
                <ButtonWalletAction label={button.label} icon={button.icon} onClick={() => button.action() } className="col-sm-6 col-md-3" />
            ))}
        </div>
    )
}
