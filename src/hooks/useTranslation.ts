
import {  useStore } from 'effector-react';

import { $locale, setLocale } from '@store/app';
import { locales } from '@locale';

interface IUseTranslation {
    language: string,
    setLanguage: (lang: string) => void,
    t: (key: string) => string
}

export const useTranslation = (): IUseTranslation => {
    const language = useStore($locale);

    const locale = locales[language];

    const setLanguage = (lang: string) => {
        setLocale(lang);
    }
    
    const t = (key: string): string => {
        return locale[key] || key;
    }

    return {
        language,
        setLanguage,
        t
    };
}
