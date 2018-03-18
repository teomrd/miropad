import notify from '../notify';

const errorHandler = (e) => {
  console.error(e); // eslint-disable-line
  notify.error(e);
};

export default errorHandler;
