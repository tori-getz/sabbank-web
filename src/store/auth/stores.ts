
import { $auth } from '@store/domains';

export const $accessToken = $auth.createStore<string>('');
export const $refreshToken = $auth.createStore<string>('');
