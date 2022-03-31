
import React, { useState } from 'react';

import {
    Modal,
    TextInput,
    Button,
    Label
} from '@components/ui';

import {
    useTranslation,
    useTwoFactorAuth
} from '@hooks';

interface ITwoFactorModal {
    visible: boolean
    onClose: () => any
    onConfirm: (code?: string) => any
}

export const TwoFactorModal: React.FC<ITwoFactorModal> = ({
    visible,
    onClose,
    onConfirm
}) => {
    const { t } = useTranslation();

    const { verify } = useTwoFactorAuth();

    const [ code, setCode ] = useState<string>('');

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<boolean>(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const isValid = await verify({
                otp: code
            });

            if (!isValid) return setError(true);

            onConfirm(code);
        } catch (e) {
            console.error(e);

            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={t('Two-factor authentication')}
        >
            <Label>{t('Enter 2FA code')}</Label>
            <TextInput
                value={code}
                onChange={e => {
                    if (error) setError(false);
                    setCode(e.target.value)
                }}
                error={error}
                placeholder='******'
                maxLength={6}
            />
            <Button
                className='mt-4 w-100'
                label={t('Next')}
                loading={loading}
                disabled={code.length !== 6 || loading}
                onClick={onSubmit}
            />
        </Modal>
    )
}
