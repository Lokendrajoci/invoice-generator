import { useContext, useState } from "react";
import { counterContext } from "/src/context/context";
import { VALIDATION_TYPES } from "/src/context/types";
import PropTypes from "prop-types";

export default function Navbar({ formattedDate }) {
  const value = useContext(counterContext);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    setQuantity(inputValue);
    value.setInvoice(inputValue);
    value.validateField("invoice", inputValue, VALIDATION_TYPES.NUMBER);
  };

  const handleDueDateChange = (e) => {
    const inputValue = e.target.value;
    setDueDate(inputValue);
    value.validateField("dueDate", inputValue, VALIDATION_TYPES.PAST_DATE);
  };

  return (
    <>
      <div className="flex justify-between mt-10 ml-10 mr-10 mb-4">
        <div>
          <div>
            <p className="text-base font-semibold">
              Current Date:{" "}
              <span className="font-normal text-sm">{formattedDate}</span>
            </p>
          </div>

          <div>
            <p className="text-base font-semibold flex gap-2 items-center mt-3">
              Due Date:
              <span className="">
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={dueDate}
                  className={`bg-semiBlack p-2 font-normal text-sm rounded-md border ${
                    value.errors.dueDate
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-pink-800"
                  }`}
                  onChange={handleDueDateChange}
                />
              </span>
            </p>
            {value.errors.dueDate && (
              <p className="text-red-500 text-xs mt-1">
                {value.errors.dueDate}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-base font-semibold">
            Invoice Number:
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              step="1"
              onChange={handleQuantityChange}
              className={`ml-2 p-2 rounded-md h-10 w-20 bg-semiBlack focus:outline-none focus:border-4 focus:rounded-md focus:delay-300 ${
                value.errors.invoice
                  ? "border-red-500 focus:border-red-600"
                  : "border-gray-300 focus:border-semiBlue"
              }`}
            />
          </p>
          {value.errors.invoice && (
            <p className="text-red-500 text-xs mt-1">{value.errors.invoice}</p>
          )}
        </div>
      </div>
      <hr className="border-t-2 border-hrColor w-11/12 ml-8" />
    </>
  );
}

Navbar.propTypes = {
  formattedDate: PropTypes.string.isRequired,
};
