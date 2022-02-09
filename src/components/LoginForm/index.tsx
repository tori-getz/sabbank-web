
import React, { useState } from 'react';

import { Button, TextField } from 'ui-neumorphism';

import { useAuth } from '@hooks';

interface ILoginForm {};

export const LoginForm: React.FC<ILoginForm> = () => {
    const [ phone, setPhone ] = useState<string>(''); 
    const [ password, setPassword ] = useState<string>('');

    const { login } = useAuth();

    return (
        <div>
            <TextField
                placeholder='телефон'
                value={phone}
                onChange={({ value }) => setPhone(value)}
            />
            <TextField
                placeholder='пароль'
                value={password}
                onChange={({ value }) => setPassword(value)}
            />
            <Button onClick={() => login({ phone, password })}>
                вход
            </Button>
        </div>
    )
}
