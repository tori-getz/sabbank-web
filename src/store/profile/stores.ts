
import { $profile } from '@store/domains';
import type {
    IUser,
    IUserFiatCurrency
} from '@typing';

export const $user = $profile.createStore<IUser | null>(null);
export const $fiatList = $profile.createStore<IUserFiatCurrency[]>([]);
