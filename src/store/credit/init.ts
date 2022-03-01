
import {
    $creditsList
} from './stores';

import {
    setCreditsList
} from './events';

$creditsList.on(setCreditsList, (_, creditsList) => creditsList);
