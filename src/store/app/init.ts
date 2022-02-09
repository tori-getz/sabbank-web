
import {
    $locale
} from './stores';

import {
    setLocale
} from './events';

$locale.on(setLocale, (_, locale) => locale);
