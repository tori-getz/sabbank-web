
import type { AxiosInstance } from 'axios';

import type { IFaqTheme } from '@typing';

import { HTTPClient } from '@http';

import type {
    ISupportSendFeedbackDto
} from '@dtos';

export class SupportService {
    private http: AxiosInstance;

    public constructor () {
        this.http = HTTPClient;
    }

    public async getFAQs (): Promise<IFaqTheme[]> {
        const { data } = await this.http.get<IFaqTheme[]>('/faq/list');
        
        return data;
    }

    public async sendFeedback (dto: ISupportSendFeedbackDto) {
        const { data } = await this.http.post('/user/feedback', dto);

        return data;
    }
}
