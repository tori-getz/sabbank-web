
import React from 'react';

import { ScreenContainer } from '@containers';

import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '@hooks';

import { GoBack, Divider } from '@components/ui';
import { QuestionAccordion } from '@components';

import type { IFaqTheme } from '@typing';

import { Card, CardContent } from 'ui-neumorphism';

interface IFaqThemeScreen {};

export const FaqThemeScreen: React.FC<IFaqThemeScreen> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { language } = useTranslation();

    const faq = location.state as IFaqTheme;

    return (
        <ScreenContainer>
            <GoBack onClick={() => navigate(-1)} />
            <h3>FAQ</h3>
            <Card>
                <CardContent>
                    <div className='p-4'>
                        <h4>{faq[`theme_${language}`]}</h4>
                        {faq.question.map((q, key: number) => (
                           <>
                                <QuestionAccordion
                                    key={key}
                                    question={`${key + 1}. ${q[`question_${language}`]}`}
                                    answer={q[`answer_${language}`]}
                                />
                                {(faq.question.length - 1) !== key && (
                                    <Divider />
                                )}
                            </>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ScreenContainer>
    )
}
