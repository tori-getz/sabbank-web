
export interface IUserFiatCurrency {
    id: number
    iso_code: string
    iso_num: string
    name: string
    symbol: string
    ts: string
}

export interface IUserSettings {
    face_recognition: boolean
    finger_print: boolean
    language: 'ru' | 'en'
    password: boolean
    two_factor: boolean
    verified: string
    fiat_currency: IUserFiatCurrency
}

export interface IUser {
    created_ts: string
    email: string
    first_name: string
    last_name: string
    id: number
    phone: string
    settings: IUserSettings
}
