import notify from "../components/molecules/notify.js";

const errorHandler = (error) => {
  const { message = "Unexpected error occurred!" } = error;
  notify.error(message);
};

export default errorHandler;
