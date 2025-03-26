import getErrorMessage from "./getErrorMessage";
import getValidationErrors from "./getValidationErrors";

const getServerActionError = (error: unknown) => {
  return {
    data: null,
    error: getErrorMessage(error),
    validationErrors: getValidationErrors(error),
  };
};

export default getServerActionError;
