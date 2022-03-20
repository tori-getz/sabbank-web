
import React, { useState, useCallback } from 'react';

import { ScreenContainer } from '@containers';

import {
    useTranslation,
    useAuth
} from '@hooks';

import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from 'ui-neumorphism';

import {
    Divider,
    TextInput,
    Label,
    Button
} from '@components/ui';

import styles from './RegisterScreen.module.sass';
import cn from 'classnames';

interface IRegisterScreen {};

export const RegisterScreen: React.FC<IRegisterScreen> = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { register } = useAuth();

    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ repeatPassword, setRepeatPassword ] = useState<string>('');

    const validate = useCallback(() => {
        if (!email) return false;
        if (!password) return false;
        if (password !== repeatPassword) return false;

        return true;
    }, [email, password, repeatPassword]);

    const onSubmit = async () => {
        try {
            await register({ email, password });

            navigate('/register/verify', { state: { email } });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <ScreenContainer title={t('Sign up')}>
            <div className="row">
                <div className="col-md-5 pb-5 pt-5 mx-auto">
                    <Card className='d-flex align-center flex-column'>
                        <CardContent className="p-4">
                            <h3 className="h4 pt-3 pb-2">{t('Sign up')}</h3>
                            <Divider className='mb-3' />
                            <div className={styles.formTitle}>Email</div>
                            <Label>{t('You will receive a one-time verification code on your email')}</Label>
                            <TextInput
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                maxLength={12}
                            />
                            <div className={cn(styles.formTitle, 'mt-3')}>{t('Password')}</div>
                            <Label>{t('Create a strong password consisting of letters, numbers and symbols')}</Label>
                            <TextInput
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type='password'
                                className='mt-3 mb-3'
                                placeholder='********'
                            />
                            <Label>{t('Repeat password')}</Label>
                            <TextInput
                                value={repeatPassword}
                                onChange={e => setRepeatPassword(e.target.value)}
                                type='password'
                                className='mb-3'
                                placeholder='********'
                            />
                            <Button
                                label={t('Next')}
                                className='mt-3'
                                disabled={!validate()}
                                onClick={onSubmit}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </ScreenContainer>
    )
}
