import * as React from "react";
import InputDropDown from "./components/ui/InputDropDown";

type Currency = "USD" | "IRR";

function convert(amount: number, from: Currency, to: Currency, rate: number) {
  if (from === to) throw new Error("Cannot convert the same currencies");
  return from === "USD" ? amount * rate : amount / rate;
}

function App() {
  const [currency1, setCurrency1] = React.useState<Currency>("USD");
  const [currency2, setCurrency2] = React.useState<Currency>("IRR");
  const [inputVal, setInputVal] = React.useState<string>("");
  const [rate, setRate] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  function convertMoney() {
    const value = Number(inputVal);
    const rateValue = Number(rate);

    if (!inputVal || isNaN(value) || value <= 0) {
      setMessage("Please enter a valid number");
      return;
    }

    if (!rate || isNaN(rateValue) || rateValue <= 0) {
      setMessage("Please enter a valid rate");
      return;
    }

    try {
      const result = convert(value, currency1, currency2, rateValue);
      setMessage(
        currency2 === "IRR"
          ? `${result.toLocaleString("fa-IR")}تومان`
          : `${result.toLocaleString("en-US")} $`
      );
    } catch (err: any) {
      setMessage(err.message);
    }
  }

  function handleSwap() {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setMessage("");
  }

  const isValid =
    inputVal !== "" &&
    !isNaN(Number(inputVal)) &&
    Number(inputVal) > 0 &&
    rate !== "" &&
    !isNaN(Number(rate)) &&
    Number(rate) > 0;

  return (
    <>
      <div className="flex flex-col items-center justify-between bg-[#708993]/30 w-[35rem] mx-auto mt-[5rem] p-[1.5rem] rounded-[1rem]">
        <div className="w-full flex flex-col items-start mb-[2rem]">
          <label htmlFor="">Enter the USD rate</label>
          <input
            className="w-full p-[0.5rem] border border-solid border-[#708993] rounded-[0.5rem] focus:outline-none"
            type="number"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            placeholder="in IRR"
          />
        </div>
        <div className="w-full flex items-center justify-around">
          <div>
            <label htmlFor="">From</label>
            <InputDropDown value={currency1} onChange={setCurrency1} />
          </div>
          <button className="hover:cursor-pointer" onClick={handleSwap}>
            Swap
          </button>
          <div>
            <label htmlFor="">To</label>
            <InputDropDown value={currency2} onChange={setCurrency2} />
          </div>
        </div>

        <div className="w-full flex flex-col items-start mb-[2rem]">
          <label htmlFor="">Enter the value</label>
          <input
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
            className="w-full p-[0.5rem] border border-solid border-[#708993] rounded-[0.5rem] focus:outline-none"
            type="text"
            placeholder="به تومان یا دلار"
          />
        </div>

        <div className="w-full text-center text-[1.3rem] mb-[1rem]">
          <h2>{message}</h2>
        </div>

        <button
          onClick={convertMoney}
          disabled={!isValid}
          className="bg-[#708993] text-blue-50 p-[0.5rem] rounded-[0.5rem] transition-colors duration-300 hover:text-[#708993] hover:bg-[#708993]/40 hover:cursor-pointer disabled:bg-gray-300 disabled:text-[#708993]"
        >
          Convert
        </button>
      </div>
    </>
  );
}

export default App;
