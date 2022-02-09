import type { AxiosInstance } from "axios";

import { HTTPClient } from "@http";
import type {
    IAuthDto,
    IAuthResponse
} from "@dtos";

export class AuthService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    async login (credentials: IAuthDto): Promise<IAuthResponse> {
        const { data } = await this.http.post<IAuthResponse>('/auth/login', credentials);;
        
        return data;
    }
}
