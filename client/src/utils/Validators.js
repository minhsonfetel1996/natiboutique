const capitalize = (value) => {
  if (!value) {
    return "";
  } else {
    const result = value.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    return result ? result.charAt(0).toUpperCase() + result.slice(1) : "";
  }
};

const ErrorMessages = (fieldName) => {
  return {
    required: `${capitalize(fieldName)} is required`,
    minLength: (min) =>
      `${capitalize(fieldName)} must have at least ${min} characters.`,
    maxLength: (max) =>
      `The length of ${fieldName} should not have more than ${max} characters.`,
    email: `${capitalize(fieldName)} have invalid email format.`,
    phoneNumber: `${capitalize(fieldName)} have invalid phone format.`,
  };
};

export const Validators = {
  required: (fieldName, value) => {
    if ((value instanceof String && value && value.length > 0) || !!value) {
      return null;
    } else {
      return ErrorMessages(fieldName).required;
    }
  },

  minLength: (min) => (fieldName, value) => {
    if (value && value.length >= min) {
      return null;
    } else {
      return ErrorMessages(fieldName).minLength(min);
    }
  },

  maxLength: (max) => (fieldName, value) => {
    if (value && value.length <= max) {
      return null;
    } else {
      return ErrorMessages(fieldName).maxLength(max);
    }
  },

  email: (fieldName, value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      return null;
    } else {
      return ErrorMessages(fieldName).email;
    }
  },

  phoneNumber: (fieldName, value) => {
    if (/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(value)) {
      return null;
    } else {
      return ErrorMessages(fieldName).phoneNumber;
    }
  },
};
