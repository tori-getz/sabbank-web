
import React, { useState, useCallback } from 'react';

import { ScreenContainer } from '@containers';

import {
    GoBack,
    Label,
    TextInput,
    Button,
    ErrorLabel
} from '@components/ui';

import {
    useTranslation,
    useAuth,
    useProfile
} from '@hooks';

import { useNavigate } from 'react-router-dom';

interface ISettingsChangePasswordScreen {};

export const SettingsChangePasswordScreen: React.FC<ISettingsChangePasswordScreen> = () => {
    const { t } = useTranslation();
    
    const navigate = useNavigate();

    const {
        changePassword
    } = useAuth();

    const { settings } = useProfile();

    const [ activePassword, setActivePassword ] = useState<string>('');
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ repeatNewPassword, setRepeatNewPassword ] = useState<string>('');
    const [ otp, setOtp ] = useState<string>('');

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string>('');

    const getBtnDisabledState = useCallback(() => {
        if (activePassword === '') return true;
        if (newPassword.length < 8) return true;
        if (newPassword !== repeatNewPassword) return true;
        if (loading) return true;
        if (!settings?.two_factor) return true;
        if (otp.length !== 6) return true;

        return false;
    }, [activePassword, newPassword, repeatNewPassword, loading]);

    const onSubmit = async () => {
        try {
            setError('');
            setLoading(true);

            await changePassword({
                password: activePassword,
                new_password: newPassword,
                totp: otp
            });

            navigate('/settings')
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.detail);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <ScreenContainer title={t('Password')}>
            <GoBack onClick={() => navigate(-1)} />
            <h3>{t('Password')}</h3>
            <Label className='mt-4'>{t('Active password')}</Label>
            <TextInput
                value={activePassword}
                onChange={e => setActivePassword(e.target.value)}
                type='password'
                placeholder={t('Enter password')}
            />
            {error && (
                <ErrorLabel className='mt-2'>{error}</ErrorLabel>
            )}
            <Label className='mt-4'>{t('New password')}</Label>
            <TextInput
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                type='password'
                placeholder={t('Enter password')}
            />
            <Label className='mt-4'>{t('Repeat new password')}</Label>
            <TextInput
                value={repeatNewPassword}
                onChange={e => setRepeatNewPassword(e.target.value)}
                type='password'
                placeholder={t('Enter password')}
            />
            <Label className='mt-4'>{t('Enter 2FA code')}</Label>
            <TextInput
                value={otp}
                onChange={e => setOtp(e.target.value)}
                type='password'
                placeholder={t('Enter password')}
            />
            <Button
                disabled={getBtnDisabledState()}
                className='mt-5'
                onClick={onSubmit}
                label={settings?.two_factor ? t('Save') : t('Enable 2FA')}
            />
        </ScreenContainer>
    )
}
