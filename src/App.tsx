import * as React from "react";
import InputDropDown from "./components/ui/InputDropDown";
import swapIcon from "./assets/img/icons8-swap-64.png";

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
          ? `${result.toLocaleString("en-US")} IRR`
          : `${result.toLocaleString("en-US")} USD`
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
      <div className="flex flex-col items-center w-[70%] mx-auto mt-[5rem] p-8 rounded-[1rem] shadow-lg shadow-gray-500/50 ">
        <div className="w-full mb-[2rem]">
          <label className="text-gray-400">Enter the USD rate</label>
          <input
            className="w-full p-[0.5rem] bg-gray-100 rounded-[0.5rem] focus:outline-none"
            type="number"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
            placeholder="ex 10.000 IRR"
          />
        </div>

        <div className="w-full flex justify-between items-center p-2 mb-[2rem] max-md:flex-col max-md:gap-2 max-sm:w-[90%]" >
          <div>
            <label className="text-gray-400">From</label>
            <InputDropDown value={currency1} onChange={setCurrency1} />
          </div>
          <div
            onClick={handleSwap}
            className="w-[3rem] max-md:w-[2rem] transition-color duration-300 rounded-md hover:cursor-pointer hover:bg-gray-100"
          >
            <img src={swapIcon} alt="swap" />
          </div>
          <div>
            <label className="text-gray-400">From</label>
            <InputDropDown value={currency2} onChange={setCurrency2} />
          </div>
        </div>

        <div className="w-full flex flex-col items-start mb-[2rem]">
          <label className="text-gray-400">Enter the value</label>
          <input
            value={inputVal}
            onChange={(event) => setInputVal(event.target.value)}
            className="w-full p-[0.5rem] bg-gray-100 rounded-[0.5rem] focus:outline-none"
            type="text"
            placeholder="in USD or IRR"
          />
        </div>

        <div className="w-full text-center text-[1.3rem] mb-[1rem]">
          <h2>{message}</h2>
        </div>

        <button
          onClick={convertMoney}
          disabled={!isValid}
          className="bg-gray-200 p-2 rounded-md transition-color duration-300 disabled:text-gray-400 hover:cursor-pointer hover:bg-gray-400 hover:text-gray-50"
        >
          Convert
        </button>
      </div>
    </>
  );
}

export default App;
