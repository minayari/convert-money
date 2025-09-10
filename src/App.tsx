import * as React from "react";
import SelectInput from "./components/SelectInput";

type Currency = "USD" | "IRR";

function App() {
  const [currency1, setCurrency1] = React.useState<Currency>("USD");
  const [currency2, setCurrency2] = React.useState<Currency>("IRR");
  const [inputVal, setInputVal] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(event.target.value);
  }

  //در حال حاضر قیمت دلار 99.250 تومان هست
  function convertMoney() {
    let convertedMoney;
    if (inputVal === "") {
      setMessage("Please enter a number first!");
    } else if (currency1 === "USD" && currency2 === "IRR") {
      convertedMoney = (Number(inputVal) * 99250).toLocaleString("de-DE");
      setMessage(`${convertedMoney}تومان`);
    } else if (currency1 === "IRR" && currency2 === "USD") {
      convertedMoney = (Number(inputVal) / 99250).toLocaleString("de-DE");
      setMessage(`${convertedMoney}$`);
    } else if (currency1 === currency2) {
      setMessage("Invalid currency. Can't convert!");
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-between bg-[#708993]/30 w-[35rem] h-[20rem] mx-auto mt-[5rem] p-[1.5rem] rounded-[1rem]">
        <input
          value={inputVal}
          onChange={handleChange}
          className="w-full p-[0.5rem] border border-solid border-[#708993] rounded-[0.5rem] focus:outline-none"
          type="text"
          placeholder="Enter a number..."
        />

        <div className="flex gap-24">
          <div>
            <h3 className="text-[#708993]">From:</h3>
            <SelectInput value={currency1} onChange={setCurrency1} />
          </div>
          <div>
            <h3 className="text-[#708993]">To:</h3>
            <SelectInput value={currency2} onChange={setCurrency2} />
          </div>
        </div>

        <div className="w-full text-center text-[1.3rem]">
          <h2>{message}</h2>
        </div>

        <button
          onClick={convertMoney}
          className="bg-[#708993] text-blue-50 p-[0.5rem] rounded-[0.5rem] transition-colors duration-300 hover:text-[#708993] hover:bg-[#708993]/40 hover:cursor-pointer"
        >
          Convert
        </button>
      </div>
    </>
  );
}

export default App;
