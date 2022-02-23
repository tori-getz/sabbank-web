import React from 'react';
import { Card, CardContent } from 'ui-neumorphism';
import { Spinner, Icon } from '@components/ui';
import styles from './ButtonWalletAction.module.sass';
import cn from 'classnames';


interface IButtonWalletAction {
    label: string
    icon: string
    loading?: boolean
    variant?: 'primary' | 'secondary'
    onClick?: () => any
    disabled?: boolean
    className?: string
}

export const ButtonWalletAction: React.FC<IButtonWalletAction> = ({
    label, 
    icon,
    loading,
    className,
    onClick,
    disabled = false,
    ...props
}) => {
    const renderLabel = () => {
        if (loading) {
            return (
                <Spinner
                    variant='light'
                />

            )
        }

        return label;
    }
    return (
        <Card className={className}>
            <CardContent >
                <div 
                    onClick={!disabled ? onClick : null}
                    className={cn(
                        styles.button,
                        { [styles.buttonDisabled]: disabled }
                    )}
                    {...props}
                >
                    <Icon name={icon} size={32}></Icon>
                    {renderLabel()}
                </div>
            </CardContent>
        </Card>
    )
}