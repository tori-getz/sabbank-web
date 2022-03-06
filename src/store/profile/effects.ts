
import {
    AuthService,
    ProfileService
} from '@services';

import { $profile } from '@store/domains';

const authService = new AuthService();
const profileServoce = new ProfileService();

export const getUserFx = $profile.createEffect(async () => {
    return authService.getProfile();
});

export const getFiatListFx = $profile.createEffect(async () => {
    return profileServoce.getFiatList();
});
