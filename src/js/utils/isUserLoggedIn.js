import storage from './localstorage.js';

export const isUserLoggedIn = () => {
  return !!storage.get('authToken');
};
