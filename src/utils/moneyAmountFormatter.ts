
import { isNil, parseInt } from 'lodash';

export const moneyAmountFormatter = (amount, precision = 4) => {
    if (isNil(amount) || amount === 0) return 0;

    const amountParts = amount.toString().split('.');

    if (amountParts.length < 2) return amount;
    if (precision < 1) return amountParts[0];

    const integerPart = Math.trunc(amount);
    const fractionalPart = amountParts[1].substr(0, precision);

    let result = null;
    if (parseInt(fractionalPart) === 0) {
        result = integerPart;
    } else {
        result = `${integerPart}.${fractionalPart}`.replace(/\.?0+$/, '');
    }

    return result;
};