
import React from 'react';

import { NavDropdown } from 'react-bootstrap';

import { useTranslation } from '@hooks';
import { Icon } from '@components/ui';

import styles from './LanguageSelect.module.sass';

import { locales } from '@locale';

interface ILanguageSelect {};

export const LanguageSelect: React.FC<ILanguageSelect> = () => {
    const { setLanguage, language } = useTranslation();

    const languages: Array<string> = Object.keys(locales);

    return (
        <NavDropdown title={language.toUpperCase()} id="basic-nav-dropdown">
            {languages.map((lang: string, key: number) => (
                <NavDropdown.Item
                    onClick={() => setLanguage(lang)}
                    key={key}
                >
                    <span className={styles.languageItem}>
                        <Icon name="flag-en"/>
                        {lang.toUpperCase()}
                    </span>
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    )
}
