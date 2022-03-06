
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { ScreenContainer } from '@containers';

import {
    GoBack,
    SettingsButton,
    Spinner
} from '@components/ui'

import { useSupport, useTranslation } from '@hooks';

import type { IFaqTheme } from '@typing';

interface IFaqScreen {};

export const FaqScreen: React.FC<IFaqScreen> = () => {
    const navigate = useNavigate();
    const { language } = useTranslation();

    const [ loading, setLoading ] = useState<boolean>(true);

    const [ faqs, setFaqs ] = useState<IFaqTheme[]>([]);

    const { getFAQs } = useSupport();

    const getData = async () => {
        try {
            const loadedFaqs = await getFAQs();

            setFaqs(loadedFaqs);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return (
            <ScreenContainer title='FAQ'>
                <Spinner />
            </ScreenContainer>
        )
    }

    return (
        <ScreenContainer title='FAQ'>
            <GoBack onClick={() => navigate(-1)}/>
            <h3>FAQ</h3>
            {faqs.map((faq: IFaqTheme, key: number) => (
                <SettingsButton
                    title={faq[`theme_${language}`]}
                    onClick={() => navigate('/support/faq/theme', {
                        state: {
                            ...faq
                        }
                    })}
                />
            ))}
        </ScreenContainer>
    )
}

