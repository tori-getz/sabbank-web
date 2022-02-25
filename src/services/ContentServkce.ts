
import {
    HTTPClient
} from '@http';

import type {
    AxiosInstance
} from 'axios';

import type {
    IContentFindDto
} from '@dtos';

export class ContentService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async find<T = any> (dto: IContentFindDto): Promise<T> {
        const { data } = await this.http.get<T>(`/contents?category=${dto.category}`);

        return data;
    }
}
