
import { $wallet } from '@store/domains';

import type {
    ITotalBalance
} from '@typing';

export const setTotalBalance = $wallet.createEvent<ITotalBalance>('set total balance');
