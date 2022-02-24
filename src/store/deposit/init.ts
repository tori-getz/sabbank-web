
import {
    $totalAmount,
    $totalIncome,
    $depositList
} from './stores';

import {
    setTotalAmount,
    setTotalIncome,
    setDepositList
} from './events';

$totalAmount.on(setTotalAmount, (_, totalAmount) => totalAmount);
$totalIncome.on(setTotalIncome, (_, totalIncome) => totalIncome);
$depositList.on(setDepositList, (_, depositList) => depositList);
