
import axios from 'axios';

import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { AuthService } from '../services/AuthService';
import { ConfigService } from '../services/ConfigService';

const HTTPClient = axios.create({
    baseURL: ConfigService.get('API_URL')
});

export const refreshInterceptor = ({ config }) => {
    if (!config._isRetryRequest) {
        config._retry = true;

        AuthService.refreshToken().then(accessToken => {
            return HTTPClient({
                ...config,
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        });
    }

    return Promise.resolve();
}

createAuthRefreshInterceptor(HTTPClient, refreshInterceptor);

export { HTTPClient };
