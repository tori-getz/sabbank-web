
import React, { useState } from 'react';

import styles from './QuestionAccordion.module.sass';

import {
    Icon
} from '@components/ui';

interface IQuestionAccordion {
    question: string
    answer: string
}

export const QuestionAccordion: React.FC<IQuestionAccordion> = ({
    question,
    answer
}) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return (
        <>
            <div
                className={styles.header}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={styles.question}>{question}</div>
                <Icon
                    name={!isOpen ? 'arrow-down' : 'arrow-up'}
                    size={14}
                />
            </div>
            {isOpen && (
                <div className={styles.answer}>
                    {answer}
                </div>
            )}
        </>
    )
}
