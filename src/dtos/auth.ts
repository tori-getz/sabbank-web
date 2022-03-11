
import type { IUser } from "@typing";

export interface IAuthDto {
    phone: string
    password: string
}

export interface IAuthRegisterDto {
    phone: string
    password: string
}

export interface IAuthRegisterVerifyDto {
    phone: string
    verify_code: string
}

export interface IAuthTokens {
    access: string
    refresh: string
}

export interface IAuthResponse {
    token: IAuthTokens
    user: IUser
}

export interface IAuthRestoreDto {
    phone: string
}

export interface IAuthRestoreVerifyDto {
    phone: string
    verify_code: string
}

export interface IAuthRestoreVerifyResponse {
    detail: string
}

export interface IAuthRestoreCompleteDto {
    phone: string
    new_password: string
    verify_code: string
}
