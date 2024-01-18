import "./css/table.css";
import "./css/style.css";
import { Customer } from "./types/customer";
import { setUpTable } from "./table";
import { validateCustomer } from "./validate";

function showMessage(message:string, type : "success" | "error") {
  const messageElement = document.querySelector<HTMLDivElement>("#message")!;
  messageElement.innerHTML = message;
  messageElement.classList.remove("hide", "success", "error"); // remove all classes
  messageElement.classList.add(type);
}

function setupForm(formElement: HTMLFormElement, customers: Customer[], callback:() => void) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const customer = validateCustomer({
        name: document.querySelector<HTMLInputElement>("#customerName")?.value,
        isVerlified: document.querySelector<HTMLInputElement>("#isVerified")?.checked,
        payment: {
          type: document.querySelector<HTMLInputElement>("#paymentType")?.value,
          amount: document.querySelector<HTMLInputElement>("#amount")?.value,
          metadata: {
            cardNumber: document.querySelector<HTMLInputElement>("#cardNumber")?.value,
            cardHolderName: document.querySelector<HTMLInputElement>("#cardHolderName")?.value,
            accountNumber: document.querySelector<HTMLInputElement>("#accountNumber")?.value,
            bankName: document.querySelector<HTMLInputElement>("#bankName")?.value,
          }
        }
      })
  
      customers.push(customer);
      callback();
      showMessage("Submitted", "success")

    } catch (error) {
      if (error instanceof Error) {
        showMessage(error.message, "error")
      } else {
        showMessage(String(error), "error")
      }
    }
  })
  
  formElement.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    const creditCardMetadata = document.querySelector<HTMLDivElement>("#creditCardMetadata")!;
    const onlineBankingMetadata = document.querySelector<HTMLDivElement>("#onlineBankingMetadata")!;
  
    if (target.value === "Cash") {
      creditCardMetadata.classList.add("hide");
      onlineBankingMetadata.classList.add("hide");
    }
    if (target.value === "CreditCard") {
      creditCardMetadata.classList.remove("hide");
      onlineBankingMetadata.classList.add("hide");
    }
    if (target.value === "OnlineBanking") {
      creditCardMetadata.classList.add("hide");
      onlineBankingMetadata.classList.remove("hide");
    }
  })
}

export function setup() {
  const customers: Customer[] = [];

  customers.push({
    name: "John",
    isVerlified: true,
    payment: {
      type: "Cash",
      amount: 100,
      metadata: undefined,
    },
  });

  const tableElement =
    document.querySelector<HTMLTableElement>("#paymentTable")!;
  const tableCullumns = [
    "Customer Name",
    "Amount",
    "Payment Method",
    "Metadata",
    "Is Verified",
  ];
  setUpTable(tableElement,tableCullumns,customers)

  const formElement = document.querySelector<HTMLFormElement>("#addCustomerForm")!;
  setupForm(formElement, customers, () => setUpTable(tableElement,tableCullumns,customers))
}

setup();
