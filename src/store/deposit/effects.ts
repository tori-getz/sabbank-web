
import { $deposit } from '@store/domains';

import { DepositService } from '@services';

const depositService = new DepositService();

export const getDepositPeriodsFx = $deposit.createEffect(async () => {
    return depositService.getInfo();
});
