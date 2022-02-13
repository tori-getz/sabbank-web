
import { $wallet } from '@store/domains';

import { CryptoCurrencyService } from '@services';

const cryptoCurrencyService = new CryptoCurrencyService();

export const getCurrenciesFx = $wallet.createEffect(async () => {
    return cryptoCurrencyService.all();
});
