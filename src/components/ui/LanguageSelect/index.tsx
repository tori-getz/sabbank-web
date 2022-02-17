
import React from 'react';

import { NavDropdown } from 'react-bootstrap';

import { useTranslation } from '@hooks';

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
                    {lang.toUpperCase()}
                </NavDropdown.Item>
            ))}
        </NavDropdown>
    )
}
