
import {
    $accessToken,
    $refreshToken
} from './stores'
import {
    setAccessToken,
    setRefreshToken,

    logout
} from './events';

$accessToken.on(setAccessToken, (_, accessToken) => accessToken);
$refreshToken.on(setRefreshToken, (_, refreshToken) => refreshToken);

$accessToken.on(logout, (_) => '');
$refreshToken.on(logout, (_) => '');
