
import { $credit } from '@store/domains';

import type {
    ICredit,
    ICreditSetting
} from '@typing';

export const $creditsList = $credit.createStore<ICredit[]>([]);

export const $creditSettings = $credit.createStore<ICreditSetting[]>([]);
