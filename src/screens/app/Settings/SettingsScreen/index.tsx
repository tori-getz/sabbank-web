
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { ProfileSettings } from '@components';

import { SettingsButton } from '@components/ui';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import styles from './SettingsScreen.module.sass';

interface ISettingsScreen {};

export const SettingsScreen: React.FC<ISettingsScreen> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <ScreenContainer title={t('Settings')}>
            <div className="widgetTitleL">{t('Settings')}</div>
            <Card>
                <CardContent>
                    <div className={styles.wrapper}>
                        <ProfileSettings />
                    </div>
                </CardContent>
            </Card>
            <SettingsButton
                title={t('FAQ and support')}
                onClick={() => navigate('/support')}
            />
        </ScreenContainer>
    )
}
