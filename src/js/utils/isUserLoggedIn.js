import storage from './localstorage';

export const isUserLoggedIn = () => {
  return !!storage.get('authToken');
};
