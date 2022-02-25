
import {
    $totalAmount,
    $totalIncome,
    $depositList,
    $currencies,
    $depositPeriods
} from './stores';

import {
    setTotalAmount,
    setTotalIncome,
    setDepositList
} from './events';

import {
    getDepositPeriodsFx
} from './effects';

$totalAmount.on(setTotalAmount, (_, totalAmount) => totalAmount);
$totalIncome.on(setTotalIncome, (_, totalIncome) => totalIncome);
$depositList.on(setDepositList, (_, depositList) => depositList);

$currencies.on(getDepositPeriodsFx.doneData, (_, data) => data.currencies);
$depositPeriods.on(getDepositPeriodsFx.doneData, (_, data) => data.depositPeriods);
