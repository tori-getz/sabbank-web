
import { $wallet } from '@store/domains';

import {
    CryptoCurrencyService,
    WalletService
} from '@services';

const cryptoCurrencyService = new CryptoCurrencyService();
const walletService = new WalletService();

export const getCurrenciesFx = $wallet.createEffect(async () => {
    return cryptoCurrencyService.all();
});

export const getRateDataFx = $wallet.createEffect(async () => {
    return cryptoCurrencyService.getRateData();
});

export const getTransactionsFx = $wallet.createEffect(async () => {
    return walletService.getTransactions();
})
