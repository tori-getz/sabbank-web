
import {
    $totalBalance,
    $currencies
} from './stores';
import {
    setTotalBalance
} from './events';

import {
    getCurrenciesFx
} from './effects';

$totalBalance.on(setTotalBalance, (_, totalBalance) => totalBalance);

$currencies.on(getCurrenciesFx.doneData, (_, currencies) => currencies);