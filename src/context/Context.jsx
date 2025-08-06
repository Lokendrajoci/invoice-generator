import { useState } from "react";
import PropTypes from "prop-types";
import { counterContext } from "./context";
import { VALIDATION_TYPES, validateEmail as validateEmailUtil } from "./types";

export const CounterProvider = ({ children }) => {
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [invoice, setInvoice] = useState(1);
  const [Tinvoice, setTinvoice] = useState("");
  const [Temail, setTemail] = useState("");
  const [Tadress, setTadress] = useState("");
  const [Finvoice, setFinvoice] = useState("");
  const [Femail, setFemail] = useState("");
  const [Fadress, setFadress] = useState("");

  // Validation errors state
  const [errors, setErrors] = useState({});

  // General validation function
  const validateField = (fieldName, value, fieldType = "text") => {
    const newErrors = { ...errors };

    switch (fieldType) {
      case VALIDATION_TYPES.EMAIL:
        if (value && !validateEmailUtil(value)) {
          newErrors[fieldName] = "Please enter a valid email address";
        } else {
          delete newErrors[fieldName];
        }
        break;
      case VALIDATION_TYPES.REQUIRED:
        if (!value || value.trim() === "") {
          newErrors[fieldName] = "This field is required";
        } else {
          delete newErrors[fieldName];
        }
        break;
      case VALIDATION_TYPES.NUMBER:
        if (value && (isNaN(value) || parseFloat(value) < 0)) {
          newErrors[fieldName] = "Please enter a valid positive number";
        } else {
          delete newErrors[fieldName];
        }
        break;
      case VALIDATION_TYPES.PAST_DATE: {
        const today = new Date().toISOString().split("T")[0];
        if (value && value < today) {
          newErrors[fieldName] = "Due date cannot be in the past";
        } else if (!value) {
          newErrors[fieldName] = "Due date is required";
        } else {
          delete newErrors[fieldName];
        }
        break;
      }
      case VALIDATION_TYPES.TAX_RATE:
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
        ) {
          newErrors[fieldName] = "Tax rate must be between 0 and 100";
        } else {
          delete newErrors[fieldName];
        }
        break;
      case VALIDATION_TYPES.DISCOUNT_RATE:
        if (
          value &&
          (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 100)
        ) {
          newErrors[fieldName] = "Discount rate must be between 0 and 100";
        } else {
          delete newErrors[fieldName];
        }
        break;
      default:
        delete newErrors[fieldName];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Provide the context value as an object
  return (
    <counterContext.Provider
      value={{
        tax,
        setTax,
        discount,
        setDiscount,
        invoice,
        setInvoice,
        Tinvoice,
        setTinvoice,
        Temail,
        setTemail,
        Tadress,
        setTadress,
        Finvoice,
        setFinvoice,
        Femail,
        setFemail,
        Fadress,
        setFadress,
        errors,
        setErrors,
        validateField,
        validateEmail: validateEmailUtil,
      }}
    >
      {children}
    </counterContext.Provider>
  );
};

CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
