
import React, { useState, useEffect, useCallback } from 'react';

import { Modal, Icon } from '@components/ui';

import { useTranslation, useContent } from '@hooks';

import type {
    IDepositAgreementContent
} from '@typing';

import {
    Checkbox,
    Label,
    Button
} from '@components/ui';

import styles from './DepositAgreement.module.sass';
import cn from 'classnames';

interface IDepositAgreement {
    visible: boolean
    onClose: () => any
    onAgree: () => any
}

export const DepositAgreement: React.FC<IDepositAgreement> = ({
    visible,
    onClose,
    onAgree
}) => {
    const { t, language } = useTranslation();
    const { getContent } = useContent();

    const [ content, setContent ] = useState<IDepositAgreementContent[]>(null);
    const [ checkboxes, setCheckboxes ] = useState<number[]>([]);

    const getAgreementContent = async (): Promise<void> => {
        try {
            const agreementContent = await getContent<IDepositAgreementContent[]>('term');

            setContent(agreementContent);
        } catch (e) {
            console.error(e);
        }
    }

    const getCheckboxValue = useCallback((id: number): boolean => {
        return checkboxes.includes(id);
    }, [checkboxes]);

    useEffect(() => {
        getAgreementContent();
    }, []);

    useEffect(() => {
        console.log(checkboxes);
    }, [checkboxes]);

    return (
        <Modal
            visible={visible}
            onClose={() => {
                setCheckboxes([]);
                onClose();
            }}
        >
            <div className='p-4'>
                <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h3>{t('Terms')}</h3>
                    <div
                        className={styles.close}
                        onClick={onClose}
                    >
                        <Icon
                            name='close'
                        />
                    </div>
                </div>
                {content && content.map((item, key: number) => (
                    <div
                        className={cn(
                            styles.term,
                            'my-2'
                        )}
                        key={key}
                    >
                        <Checkbox
                            value={getCheckboxValue(item.id)}
                            onChange={() => !checkboxes.includes(item.id) ? setCheckboxes([ ...checkboxes, item.id ]) : setCheckboxes(checkboxes.filter(c => c !== item.id))}
                        />
                        <Label className={styles.termBody}>{item[`body_${language}`]}</Label>
                    </div>
                ))}
                <Button
                    className={styles.agree}
                    onClick={() => {
                        setCheckboxes([]);
                        onClose();
                        onAgree();
                    }}
                    disabled={content?.length !== checkboxes.length}
                    label={t('Agree').toUpperCase()}
                />
            </div>
        </Modal>
    )
}
