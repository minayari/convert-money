type TCurrency = "USD" | "IRR";

export default function convert(
  amount: number,
  from: TCurrency,
  to: TCurrency,
  rate: number
) {
  if (from === to) throw new Error("Cannot convert the same currencies");
  return from === "USD" ? amount * rate : amount / rate;
}
