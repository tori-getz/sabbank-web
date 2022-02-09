
import { $user } from '@store/domains';

import type {
    IUser
} from '@typing';

export const setUser = $user.createEvent<IUser>('set user');
