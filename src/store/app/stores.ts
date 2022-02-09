
import { $app } from '@store/domains';

import { getLocale } from '@utils';

export const $locale = $app.createStore<string>(getLocale());
