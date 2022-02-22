
import React from 'react';

import { Divider, Label } from '@components/ui';

import { Card, CardContent } from 'ui-neumorphism';

import { useTranslation } from '@hooks';

interface IRegisterForm {};

export const RegisterForm: React.FC<IRegisterForm> = () => {
    const { t } = useTranslation();

    return (
        <div className="row">
            <div className="col-md-5 pb-5 pt-5 mx-auto">
                <Card className='d-flex align-center flex-column'>
                    <CardContent className="p-4">
                        <h3 className="h4 pt-3 pb-2">{t('Sign up')}</h3>
                        <Divider />
                        {/* <div className="mt-3">
                            <Label>{t('Phone number')}</Label>
                        </div> */}
                        {/* <TextInput
                            value={phone}
                            onChange={({ target: {value} }) => setPhone(value)}
                            id="phone"
                        />
                        <div className="d-flex flex-wrap justify-content-between mt-3">
                            <Label>{t('Password')}</Label>
                            <a href="#" className="">{t('Forgot password?')}</a>
                        </div>
                        <TextInput
                            value={password}
                            onChange={({ target: {value} }) => setPassword(value)}
                        />
                        <div className="mt-4">
                            {error && (
                                <Alert variant='danger'>
                                    {error}
                                </Alert>
                            )}
                            <Button onClick={onSubmit} label={t('Sign in')} className="mt-2"/>
                        </div> */}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
