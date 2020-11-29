import {CURRENCY} from '../../../common/constants';

export const areYouSureText = (total: number) =>
    `Are you sure you want to pay for this installment?\n ${CURRENCY}${total.toFixed(2)} will be taken from your account`;
