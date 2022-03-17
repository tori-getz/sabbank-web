
import React, { useState, useRef } from 'react';

import { Icon } from '@components/ui';

import { useOutsideClick } from '@hooks';

import styles from './TableFilter.module.sass';
import cn from 'classnames';

interface IFilterItem {
    label: React.ReactNode | string
    value: string
}

interface ITableFilter {
    label: string
    activeLabel?: string
    value: string
    onChange: (value: string) => any
    values: Array<IFilterItem>
}

export const TableFilter: React.FC<ITableFilter> = ({
    label,
    value,
    values,
    onChange,
    activeLabel
}) => {
    const [ isOpen, setOpen ] = useState<boolean>(false);

    const toggleDropdown = () => setOpen(!isOpen);

    const dropdownRef = useRef(null);

    useOutsideClick({
        ref: dropdownRef,
        callback: () => setOpen(false)
    });

    return (
        <div>
            <div className={styles.label}>
                <div
                    className={styles.labelText}
                    onClick={toggleDropdown}
                >
                    {!value ? label : activeLabel}
                </div>
                <div
                    className={styles.icon}
                    onClick={!value ? toggleDropdown : () => onChange('')}
                >
                    <Icon
                        name={!value ? `arrow-${isOpen ? 'up' : 'down'}` : 'close'}
                        size={12}
                    />
                </div>
            </div>
            {isOpen && (
                <div
                    className={styles.dropdown}
                    ref={dropdownRef}
                >
                    {values.map(({ label, ...i }, key: number) => (
                        <div
                            onClick={() => {
                                toggleDropdown();
                                onChange(i.value);
                            }}
                            className={cn(
                                styles.dropdownItem,
                                { [styles.dropdownItemActive]: i.value === value }
                            )}
                            key={key}
                        >
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
