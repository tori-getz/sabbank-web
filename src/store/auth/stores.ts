
import { $auth } from '@store/domains';

import { persist } from 'effector-storage/local'

export const $accessToken = $auth.createStore<string>('');
persist({ store: $accessToken, key: '@sabbank/access_token' });

export const $refreshToken = $auth.createStore<string>('');
persist({ store: $refreshToken, key: '@sabbank/refresh_token' });
