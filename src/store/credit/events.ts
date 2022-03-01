
import { $credit } from '@store/domains';

import type {
    ICredit
} from '@typing';

export const setCreditsList = $credit.createEvent<ICredit[]>('set credits list');
