
import axios from 'axios';

import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { AuthService } from '../services/AuthService';
import { ConfigService } from '../services/ConfigService';

import { $accessToken } from '../store/auth';

const HTTPClient = axios.create({
    baseURL: ConfigService.get('API_URL'),
    headers: {
        'Authorization': `Bearer ${$accessToken.getState()}`
    }
});

export const refreshInterceptor = ({ config }) => {
    if (!config._isRetryRequest) {
        config._retry = true;

        AuthService.refreshToken()
    }

    return Promise.resolve();
}

createAuthRefreshInterceptor(HTTPClient, refreshInterceptor);

export { HTTPClient };
