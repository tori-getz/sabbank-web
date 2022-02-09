
import {
    $accessToken,
    $refreshToken
} from './stores'
import {
    setAccessToken,
    setRefreshToken
} from './events';

$accessToken.on(setAccessToken, (_, accessToken) => accessToken);
$refreshToken.on(setRefreshToken, (_, refreshToken) => refreshToken);
