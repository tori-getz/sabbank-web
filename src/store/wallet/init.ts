
import {
    $totalBalance,
    $currencies,
    $transactions
} from './stores';
import {
    setTotalBalance,
    setCurrencies
} from './events';

import {
    getCurrenciesFx,
    getTransactionsFx
} from './effects';

$totalBalance.on(setTotalBalance, (_, totalBalance) => totalBalance);

$currencies.on(getCurrenciesFx.doneData, (_, currencies) => currencies);
$currencies.on(setCurrencies, (_, currencies) => currencies);

$transactions.on(getTransactionsFx.doneData, (_, transactions) => transactions);