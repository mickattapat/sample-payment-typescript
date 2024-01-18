interface BasePayment<TType extends string, TMetadata = undefined> {
  type: TType;
  amount: number;
  metadata: TMetadata;
}

export type Cash = BasePayment<"Cash">;

export interface CreditCardMetadata {
  cardNumber: string;
  cardHolderName: string;
};

export type CreditCard = BasePayment<"CreditCard", CreditCardMetadata>;

export interface OnlineBankingMetadata {
  accountNumber: string;
  bankName: string;
}

export type OnlineBanking = BasePayment<"OnlineBanking", OnlineBankingMetadata>;

export type AllPayments = Cash | CreditCard | OnlineBanking;

// Payment form
export type AllPaymentsForm = {
  type?: string;
  amount?: string;
  metadata?: Partial<CreditCardMetadata> & Partial<OnlineBankingMetadata>;
}