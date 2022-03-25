
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { ProfileSettings } from '@components';

import { SettingsButton } from '@components/ui';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './SettingsScreen.module.sass';

interface ISettingsItem {
    title: string
    path: string
}

interface ISettingsScreen {};

export const SettingsScreen: React.FC<ISettingsScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const settingsList: Array<ISettingsItem> = [
        {
            title: t('Two-factor authentication'),
            path: '/settings/2fa'
        },
        {
            title: t('FAQ and support'),
            path: '/support'
        }
    ];

    return (
        <ScreenContainer title={t('Settings')}>
            <div className="widgetTitleL">{t('Settings')}</div>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <ProfileSettings />
                    </div>
                </CardContent>
            </Card>
            {settingsList.map(({ title, path }: ISettingsItem, key: number) => (
                <SettingsButton
                    key={key}
                    title={title}
                    onClick={() => navigate(path)}
                />
            ))}
        </ScreenContainer>
    )
}
