
import type {
    IUserSettings
} from '@typing';

export interface IProfileUpdateDto {
    userId: number
    full_name: string
    email: string
}

export interface IProfileUpdatePhoneDto {
    userId: number
    phone: string
}

export interface IProfileUpdateSettingsDto extends Partial<IUserSettings> {
    fiat_currency_id?: number
}

export interface IProfile2FAToggleDto {
    otp: string
}

export interface IProfile2FAVerifyDto {
    otp: string
}
