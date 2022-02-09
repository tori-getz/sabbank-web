
import type { IUser } from "@typing";

export interface IAuthDto {
    phone: string
    password: string
}

export interface IAuthTokens {
    access: string
    refresh: string
}

export interface IAuthResponse {
    token: IAuthTokens
    user: IUser
}
