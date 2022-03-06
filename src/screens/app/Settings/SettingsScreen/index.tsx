
import React from 'react';

import { ScreenContainer } from '@containers';

import { useTranslation } from '@hooks';

import { ProfileSettings } from '@components';

import { Card, CardContent } from 'ui-neumorphism';

interface ISettingsScreen {};

export const SettingsScreen: React.FC<ISettingsScreen> = () => {
    const { t } = useTranslation();

    return (
        <ScreenContainer title={t('Settings')}>
            <h3>{t('Settings')}</h3>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <ProfileSettings />
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
