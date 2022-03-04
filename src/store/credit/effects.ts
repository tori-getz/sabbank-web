
import { $credit } from '@store/domains';

import { CreditService } from '@services';

const creditService = new CreditService();

export const getCreditInfoFx = $credit.createEffect(async () => {
    return creditService.getSettings();
});
