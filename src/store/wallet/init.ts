
import {
    $totalBalance,
    $currencies,
    $transactions,
    $rateData
} from './stores';
import {
    setTotalBalance,
    setCurrencies
} from './events';

import {
    getCurrenciesFx,
    getTransactionsFx,
    getRateDataFx
} from './effects';

$totalBalance.on(setTotalBalance, (_, totalBalance) => totalBalance);

$currencies.on(getCurrenciesFx.doneData, (_, currencies) => currencies);
$currencies.on(setCurrencies, (_, currencies) => currencies);

$rateData.on(getRateDataFx.doneData, (_, rateData) => rateData);

$transactions.on(getTransactionsFx.doneData, (_, transactions) => transactions);