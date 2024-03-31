export interface TokenSDKTransaction {
	bookingTime: string;
	creditor: string;
	id: string;
	debtor: string;
	message: string;
	status: string;
	transactionAmount: TransactionAmount
}

interface TransactionAmount {
	amount: number;
	currency: string;
}

export interface TokenSDKTransactionWithStringAmount {
	bookingTime: string;
	creditor: string;
	id: string;
	debtor: string;
	message: string;
	status: string;
	transactionAmount: TransactionAmountString
}

interface TransactionAmountString {
	amount: string;
	currency: string;
}