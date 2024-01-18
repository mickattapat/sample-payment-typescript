import { Customer } from "./types/customer";

export function setUpTable(
  tableElement: HTMLTableElement,
  collumnsHeader: string[],
  customers: Customer[]
) {
  tableElement.innerHTML = "";
  const headerRow = tableElement.insertRow();
  headerRow.innerHTML = collumnsHeader.map((c) => `<th>${c}</th>`).join("");
  
  customers.forEach((c) => {
    appendTableRow(tableElement, c);
  })
}

export function appendTableRow(
  tableElement: HTMLTableElement,
  customers: Customer
) {
  const rowElement = tableElement.insertRow();
  const { name , payment , isVerlified } = customers;

  rowElement.innerHTML = `
    <td>${name}</td>
    <td>${payment.amount}</td>
    <td>${payment.type}</td>
    <td>${JSON.stringify(payment.metadata)}</td>
    <td>${isVerlified}</td>
  `;
}