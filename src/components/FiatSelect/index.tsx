
import React, { useEffect, useState } from 'react';

import { useProfile } from '@hooks';

import styles from './FiatSelect.module.sass';

import type {
    IUserFiatCurrency
} from '@typing';

interface IFiatSelect {};

export const FiatSelect: React.FC<IFiatSelect> = () => {
    const {
        fiatList,
        settings,
        getFiatList,
        updateSettings
    } = useProfile();

    const [ isOpen, setOpen ] = useState<boolean>(false);
    
    useEffect(() => {
        getFiatList();
    }, []);

    const handleChangeFiat = async (fiat: IUserFiatCurrency) => {
        await updateSettings({
            fiat_currency_id: fiat.id
        });

        setOpen(false);
    }
    
    return (
        <div>
            <div
                className={styles.btn}
                onClick={() => setOpen(!isOpen)}
            >
                {settings.fiat_currency.iso_code.toUpperCase()} {`>`}
            </div>
            {isOpen && (
                <div className={styles.menu}>
                    {fiatList.map((fiat, key) => (
                        <div 
                            className={styles.fiat}
                            onClick={() => handleChangeFiat(fiat)}
                            key={key}
                        >
                            {fiat.iso_code.toUpperCase()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
