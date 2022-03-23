
import React from 'react';

import { Card, CardContent } from 'ui-neumorphism';

import { Switch } from '@components/ui';

import styles from './SettingsSwitch.module.sass';
import cn from 'classnames';

interface ISettingsSwitch {
    title: string
    value: boolean
    onChange: () => any
}

export const SettingsSwitch: React.FC<ISettingsSwitch> = ({
    title,
    value,
    onChange
}) => {
    return (
        <Card>
            <CardContent>
                <div className={cn(styles.wrapper, 'p-4')}>
                    <div className={styles.title}>{title}</div>
                    <Switch
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
