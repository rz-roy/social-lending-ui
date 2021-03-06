/**
 * Type of data send by the form.
 * Note that toAccount is only for simulation purposes; and thus, it is currently ignored by the api.
 */

export interface ExternalTransferData {
    amount: number;
    toAccount: string;
}
