
import type { IUser } from "@typing";

export interface IAuthDto {
    email: string
    password: string
}

export interface IAuthRegisterDto {
    email: string
    password: string
}

export interface IAuthRegisterVerifyDto {
    email: string
    verify_code: string
}

export interface IAuthRegisterCompleteRegisterDto {
    email: string
    pin_code: string
    pin_code_confirmation: string
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
