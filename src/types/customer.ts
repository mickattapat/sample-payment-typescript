import { AllPayments, AllPaymentsForm } from "./payment";

export interface Customer {
  name: string;
  payment: AllPayments;
  isVerlified: boolean;
}

export interface CustomerForm {
  name?: string;
  isVerlified?: boolean;
  payment?: AllPaymentsForm;
}