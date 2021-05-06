import * as currency from "currency.js";
export const getRzpAmountFormat = (amount) => {
  return currency(amount).intValue;
};
