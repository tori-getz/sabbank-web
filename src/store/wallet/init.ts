
import {
    $totalBalance
} from './stores';
import {
    setTotalBalance
} from './events';

$totalBalance.on(setTotalBalance, (_, totalBalance) => totalBalance);
