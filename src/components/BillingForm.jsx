import { useContext } from "react";
import { counterContext } from "/src/context/context";
import { VALIDATION_TYPES } from "/src/context/types";

export default function BillingForm() {
  const value = useContext(counterContext);

  const handleTinvoice = (e) => {
    const inputValue = e.target.value;
    value.setTinvoice(inputValue);
    value.validateField("Tinvoice", inputValue, VALIDATION_TYPES.REQUIRED);
  };

  const handleTemail = (e) => {
    const inputValue = e.target.value;
    value.setTemail(inputValue);
    value.validateField("Temail", inputValue, VALIDATION_TYPES.EMAIL);
  };

  const handleTadress = (e) => {
    const inputValue = e.target.value;
    value.setTadress(inputValue);
    value.validateField("Tadress", inputValue, VALIDATION_TYPES.REQUIRED);
  };

  const handleFinvoice = (e) => {
    const inputValue = e.target.value;
    value.setFinvoice(inputValue);
    value.validateField("Finvoice", inputValue, VALIDATION_TYPES.REQUIRED);
  };

  const handleFemail = (e) => {
    const inputValue = e.target.value;
    value.setFemail(inputValue);
    value.validateField("Femail", inputValue, VALIDATION_TYPES.EMAIL);
  };

  const handleFadress = (e) => {
    const inputValue = e.target.value;
    value.setFadress(inputValue);
    value.validateField("Fadress", inputValue, VALIDATION_TYPES.REQUIRED);
  };

  return (
    <>
      <div className="flex justify-between mx-10 mt-5">
        <div className="flex col flex-col gap-2 w-1/2">
          <label htmlFor="" className="text-base font-semibold">
            Bill to:
          </label>
          <div className="w-full">
            <input
              type="text"
              placeholder="Who is this invoice to?"
              value={value.Tinvoice}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Tinvoice
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleTinvoice}
            />
            {value.errors.Tinvoice && (
              <p className="text-red-500 text-xs mt-1">
                {value.errors.Tinvoice}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email address"
              value={value.Temail}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Temail
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleTemail}
            />
            {value.errors.Temail && (
              <p className="text-red-500 text-xs mt-1">{value.errors.Temail}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Billing address"
              value={value.Tadress}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Tadress
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleTadress}
            />
            {value.errors.Tadress && (
              <p className="text-red-500 text-xs mt-1">
                {value.errors.Tadress}
              </p>
            )}
          </div>
        </div>

        <div className="flex col flex-col gap-2 w-1/2 ml-6">
          <label htmlFor="" className="text-base font-semibold">
            Bill from:
          </label>
          <div className="w-full">
            <input
              type="text"
              placeholder="Who is this invoice from?"
              value={value.Finvoice}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Finvoice
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleFinvoice}
            />
            {value.errors.Finvoice && (
              <p className="text-red-500 text-xs mt-1">
                {value.errors.Finvoice}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              type="email"
              placeholder="Email address"
              value={value.Femail}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Femail
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleFemail}
            />
            {value.errors.Femail && (
              <p className="text-red-500 text-xs mt-1">{value.errors.Femail}</p>
            )}
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Billing address"
              value={value.Fadress}
              className={`bg-semiBlack p-2 font-normal text-sm rounded-md border focus:outline-none w-full ${
                value.errors.Fadress
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-pink-800"
              }`}
              onChange={handleFadress}
            />
            {value.errors.Fadress && (
              <p className="text-red-500 text-xs mt-1">
                {value.errors.Fadress}
              </p>
            )}
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-hrColor w-11/12 ml-8 mt-10" />
    </>
  );
}
