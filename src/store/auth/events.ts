
import { $auth } from '@store/domains';

export const setAccessToken = $auth.createEvent<string>('set access token');
export const setRefreshToken = $auth.createEvent<string>('set refresh token');
