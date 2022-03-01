
import { $credit } from '@store/domains';

import type {
    ICredit
} from '@typing';

export const $creditsList = $credit.createStore<ICredit[]>([]);
