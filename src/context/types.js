// Context types and validation functions
export const VALIDATION_TYPES = {
  EMAIL: "email",
  REQUIRED: "required",
  NUMBER: "number",
  PAST_DATE: "pastDate",
  TAX_RATE: "taxRate",
  DISCOUNT_RATE: "discountRate",
};

// Email validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
