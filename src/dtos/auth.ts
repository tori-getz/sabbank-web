
import type { IUser } from "@typing";

export interface IAuthDto {
    phone: string
    password: string
}

export interface IAuthResponse {
    token: {
        access: string
        refresh: string
    }
    user: IUser
}
