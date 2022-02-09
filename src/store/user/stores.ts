
import { $user as $userDomain } from '@store/domains';
import type {
    IUser
} from '@typing';

export const $user = $userDomain.createStore<IUser | null>(null);
