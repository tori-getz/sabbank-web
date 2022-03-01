
import React from 'react';

import { Icon } from '@components/ui';

import { useTranslation } from '@hooks';

import cn from 'classnames';

import styles from './GoBack.module.sass';

interface IGoBack {
    className?: string
    onClick: () => any
}

export const GoBack: React.FC<IGoBack> = ({
    className,
    onClick
}) => {
    const { t } = useTranslation();

    return (
        <div
            className={cn(styles.wrapper, 'd-flex', className)}
            onClick={onClick}
        >
            <Icon name='back' size={14} />
            <span className={styles.text}>{t('Back')}</span>
        </div>
    )
}
