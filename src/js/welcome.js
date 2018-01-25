import notify from './notify';

const welcomeUser = () => {
  const lastVisit = localStorage.getItem('miropad.user');
  if (lastVisit) {
    notify.info(`Happy to see you again from ${lastVisit}`);
  } else {
    notify.info('Welcome 😃');
  }
  localStorage.setItem('miropad.user', new Date().toLocaleDateString());
};

export default welcomeUser;
