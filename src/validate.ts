import { Customer, CustomerForm } from "./types/customer";
import { AllPayments, AllPaymentsForm } from "./types/payment";

function assertNonEmpty(
  condition: unknown,
  message: string
): asserts condition {
  if (condition === null || condition === undefined || condition === "") {
    throw new Error(message);
  }
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

export function validateCustomer(customer: CustomerForm): Customer {
  assertNonEmpty(customer.name, 'Name is required')
  assertNonEmpty(customer.isVerlified, 'Verified is required')

  return {
    name: customer.name,
    isVerlified: customer.isVerlified,
    payment: validatePayment(customer.payment),
  };
}

export function validatePayment(payment?: AllPaymentsForm): AllPayments {

  assertNonEmpty(payment, 'Payment is required')
  assertNonEmpty(payment.amount, 'Amount is required')

  const amount = parseInt(payment.amount);
  assert(!Number.isNaN(amount), 'Amount must be a number')
  assert(amount > 0, 'Amount must be greater than 0')

  assertNonEmpty(payment.type, 'Type is required')
  
  if(payment.type === 'CreditCard') {
    assertNonEmpty(payment.metadata, 'Metadata is required')
    assertNonEmpty(payment.metadata.cardNumber, 'Card number is required')
    assertNonEmpty(payment.metadata.cardHolderName, 'Card holder name is required')
    return {
      type: payment.type,
      amount,
      metadata: {
        cardNumber: payment.metadata.cardNumber,
        cardHolderName: payment.metadata.cardHolderName,
      }
    }
  }

  if (payment.type === 'OnlineBanking') {
    assertNonEmpty(payment.metadata, 'Metadata is required')
    assertNonEmpty(payment.metadata.accountNumber, 'Account number is required')
    assertNonEmpty(payment.metadata.bankName, 'Bank number is required')
    return {
      type: payment.type,
      amount,
      metadata: {
        accountNumber: payment.metadata.accountNumber,
        bankName: payment.metadata.bankName,
      }
    }
  }

  if (payment.type === 'Cash') {
    return {
      type: payment.type,
      amount,
      metadata: undefined,
    }
  }
  throw new Error('Invalid payment type')
}