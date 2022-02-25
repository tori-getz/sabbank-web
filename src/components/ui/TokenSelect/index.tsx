
import React, { useState } from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import { Icon } from '@components/ui';

import type {
    iCurrency
} from '@typing'

interface ITokenSelect {
    items: Array<iCurrency>
    defaultValue: iCurrency
    onChange: (token) => any
}

import styles from './TokenSelect.module.sass';
import cn from 'classnames';

export const TokenSelect: React.FC<ITokenSelect> = ({
    items,
    defaultValue,
    onChange
}) => {
    const [ isOpen, setOpen ] = useState<boolean>(false);

    return (
        <Card inset>
            <CardContent>
                <div className='p-2'>
                    <div className={styles.defaultValue}>
                        <div>token</div>
                        <div
                            className={cn(
                                styles.expand,
                                { [styles.expandOpen]: isOpen }
                            )}
                            onClick={() => setOpen(!isOpen)}
                        >
                            <Icon name='arrow-down' />
                        </div>
                    </div>
                    <div
                        className={cn(
                            styles.items,
                            { [styles.itemsOpen]: isOpen }
                        )}
                    >
                        <div>token</div>
                        <div>token</div>
                        <div>token</div>
                        <div>token</div>
                        <div>token</div>
                        <div>token</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
