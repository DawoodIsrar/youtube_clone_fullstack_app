export const createError = (status, error) => {
  const newError = new Error();
  newError.status = status;
  newError.message = error.message;
  return newError;
};
