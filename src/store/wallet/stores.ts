
import { $wallet } from '@store/domains';

import type {
    ITotalBalance
} from '@typing';

export const $totalBalance = $wallet.createStore<ITotalBalance>({});
