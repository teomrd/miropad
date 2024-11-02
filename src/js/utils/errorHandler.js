import notify from "../components/molecules/notify.ts";

const errorHandler = (error) => {
  const { message = "Unexpected error occurred!" } = error;
  notify.error(message);
};

export default errorHandler;
