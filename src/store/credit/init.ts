
import {
    $creditsList,
    $creditSettings
} from './stores';

import {
    setCreditsList
} from './events';

import {
    getCreditInfoFx
} from './effects';

$creditsList.on(setCreditsList, (_, creditsList) => creditsList);

$creditSettings.on(getCreditInfoFx.doneData, (_, settings) => settings);
