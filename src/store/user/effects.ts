
import {
    AuthService
} from '@services';

import { $auth } from '@store/domains';

const authService = new AuthService();

export const getUserFx = $auth.createEffect(async () => {
    return authService.getProfile();
});
