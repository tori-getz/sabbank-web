
import React, { useState, useEffect } from 'react';

import {
    TextInput, 
    Button,
    Label,
    ErrorLabel
} from '@components/ui';

import { useTranslation, useProfile } from '@hooks';

import styles from './ProfileSettings.module.sass';
import cn from 'classnames';

import { phone as phoneValidator } from 'phone';
import isEmail from 'is-email';

interface IProfileSettings {};

export const ProfileSettings: React.FC<IProfileSettings> = () => {
    const { t } = useTranslation();

    const {
        user,
        updateProfile,
        updatePhone
    } = useProfile();
    
    const [ name, setName ] = useState('');
    const [ phone, setPhone ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');

    const [ nameError, setNameError ] = useState<string>('');
    const [ phoneError, setPhoneError ] = useState<string>('');
    const [ emailError, setEmailError ] = useState<string>('');

    const [ loading, setLoading ] = useState<boolean>(false);

    const getValues = (): string => {
        if (!user) return;

        setEmail(user?.email || '');

        const firstName = user?.first_name || '';
        const lastName = user?.last_name || '';

        if (lastName === '') {
            setName(`${firstName}`);
        } else {
            setName(`${firstName} ${lastName}`)
        }
    }

    useEffect(() => {
        getValues();
    }, [user]);

    const handleChangeName = (newValue) => {
        const wordsLength = newValue.split(' ').length;

        if (wordsLength > 2) {
            setNameError('Enter first name and last name')
        } else {
            setNameError('');
        }

        setName(newValue);
    }

    const handleChangePhone = (newValue) => {
        if (!phoneValidator(newValue, { country: 'ru' }).isValid) {
            setPhoneError('Enter phone number');
        } else {
            setPhoneError('');
        }

        setPhone(newValue);
    }

    const handleChangeEmail = (newValue) => {
        if (!isEmail(newValue)) {
            setEmailError('Enter email');
        } else {
            setEmailError('');
        }

        setEmail(newValue);
    }

    const onSubmit = async () => {
        try {
            setLoading(true);

            await updateProfile({
                userId: user?.id,
                full_name: name,
                email
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="widgetTitle">{t('Profile')}</div>
            <Label>{t('Name')}</Label>
            <TextInput
                value={name}
                error={nameError !== ''}
                onChange={e => handleChangeName(e.target.value)}
            />
            {nameError && (
                <ErrorLabel>
                    {t(nameError)}
                </ErrorLabel>
            )}
            <Label className='mt-4'>{t('Phone number')}</Label>
            {/* <TextInput
                value={phone}
                error={phoneError !== ''}
                onChange={e => handleChangePhone(e.target.value)}
            />
            {phoneError && (
                <ErrorLabel>
                    {t(phoneError)}
                </ErrorLabel>
            )} */}
            <Label className='mt-4'>Email</Label>
            <TextInput
                error={emailError !== ''}
                value={email}
                onChange={e => handleChangeEmail(e.target.value)}
            />
            {emailError && (
                <ErrorLabel>
                    {t(emailError)}
                </ErrorLabel>
            )}
            <Button
                label={t('Save')}
                onClick={onSubmit}
                loading={loading}
                disabled={nameError !== '' || phoneError !== '' || emailError !== ''}
                className={cn(styles.saveBtn, 'mt-4')}
            />
        </>
    )
}
