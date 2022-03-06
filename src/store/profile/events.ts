
import { $profile } from '@store/domains';

import type {
    IUser
} from '@typing';

export const setUser = $profile.createEvent<IUser>('set user');
