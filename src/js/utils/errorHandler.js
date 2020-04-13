import notify from "../notify";

const errorHandler = (error) => {
  const { message = "Unexpected error occurred!" } = error;
  console.log('error', error); // eslint-disable-line
  notify.error(message);
};

export default errorHandler;
