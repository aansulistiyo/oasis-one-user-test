const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, {
  currency: "IDR",
  style: "currency",
});
export default function formatCurrency(number) {
  if (typeof number === "string") {
    number = number.replaceAll(",", "");
  }

  return CURRENCY_FORMATER.format(number);
}
