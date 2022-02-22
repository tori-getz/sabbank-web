
import {
    $accessToken,
    $refreshToken
} from './stores'
import {
    setAccessToken,
    setRefreshToken,

    logout
} from './events';

import { HTTPClient } from '@http';

$accessToken.on(setAccessToken, (_, accessToken) => accessToken);
$refreshToken.on(setRefreshToken, (_, refreshToken) => refreshToken);

$accessToken.on(logout, (_) => '');
$refreshToken.on(logout, (_) => '');

$accessToken.watch(token => {
    if (!token) return;

    HTTPClient.defaults.headers['Authorization'] = `Bearer ${token}`;
});
