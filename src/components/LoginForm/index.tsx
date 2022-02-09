
import React, { useState } from 'react';

import { Button, TextField } from 'ui-neumorphism';
import { Alert } from 'react-bootstrap';

import { useAuth, useTranslation } from '@hooks';

interface ILoginForm {};

export const LoginForm: React.FC<ILoginForm> = () => {
    const [ phone, setPhone ] = useState<string>(''); 
    const [ password, setPassword ] = useState<string>('');

    const [ error, setError ] = useState<string>('');

    const { t } = useTranslation();

    const { login } = useAuth();

    const onSubmit = async () => {
        try {
            await login({ phone, password });
        } catch (e) {
            setError(t(e.message));
        }
    }

    return (
        <div>
            <TextField
                placeholder={t('Phone number')}
                value={phone}
                onChange={({ value }) => setPhone(value)}
            />
            <TextField
                placeholder={t('Password')}
                value={password}
                onChange={({ value }) => setPassword(value)}
            />
            {error && (
                <Alert variant='danger'>
                    {error}
                </Alert>
            )}
            <Button onClick={onSubmit}>
                {t('Sign in')}
            </Button>
        </div>
    )
}
