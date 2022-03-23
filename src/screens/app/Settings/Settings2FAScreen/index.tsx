
import React, { useState } from 'react';

import {
    useTranslation,
    useTwoFactorAuth
} from '@hooks';

import { ScreenContainer } from '@containers';

import { useNavigate } from 'react-router-dom';

import {
    GoBack,
    Label,
    QRCode,
    TextInput,
    Button
} from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import { SettingsSwitch } from '@components';

import styles from './Settings2FAScreen.module.sass';

interface ISettings2FAScreen {}

export const Settings2FAScreen: React.FC<ISettings2FAScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const {
        enabled,
        getInfo,
        enable: enable2FA
    } = useTwoFactorAuth();

    const [ toggle, setToggle ] = useState<boolean>(enabled);

    const enable = async () => {
        const { secret } = await getInfo();

        setSecret(secret);
        setToggle(true);
        setConfigureVisible(true);
    }

    const disable = async () => {
        setToggle(false);
        setConfigureVisible(false);
    }

    const [ configureVisible, setConfigureVisible ] = useState<boolean>(false);
    const [ secret, setSecret ] = useState<string>('');

    const [ code, setCode ] = useState<string>('');

    const handleSubmit = async () => {
        await enable2FA({
            otp: code
        })

        setConfigureVisible(false);
    }
    
    const renderConfigure = () => {
        return (
            <>
                <h4 className='mt-5 mb-3'>{t('Setting up two-factor authentication')}</h4>
                <Label>{t('2fa step 1')}</Label>
                <Label>{t('2fa step 2')}</Label>
                <div className={styles.qrcode}>
                    <Card>
                        <CardContent>
                            <QRCode
                                text={secret}
                                size={150}
                            />
                        </CardContent>
                    </Card>
                    <Label className='mt-4'>{t('Activation key')}</Label>
                    <TextInput
                        value={secret}
                    />
                </div>
                <Label>{t('2fa step 3')}</Label>
                <Label className='mt-3'>{t('Enter 2FA code')}</Label>
                <TextInput
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    maxLength={6}
                />
                <Button
                    className='mt-3'
                    label={t('Save')}
                    disabled={code.length !== 6}
                    onClick={handleSubmit}
                />
            </>
        )
    }

    return (
        <ScreenContainer title={t('Two-factor authentication')}>
            <GoBack onClick={() => navigate(-1)} />
            <h2>{t('Two-factor authentication')}</h2>
            <SettingsSwitch
                title='2FA'
                value={toggle}
                onChange={toggle ? disable : enable}
            />
            {configureVisible && renderConfigure()}
        </ScreenContainer>
    )
}
