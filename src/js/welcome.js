import notify from './notify';

const welcomeUser = () => {
  const lastVisit = localStorage.getItem('miropad.user');
  if (lastVisit) {
    notify.info(`Happy to see again from ${lastVisit}`);
  } else {
    localStorage.setItem('miropad.user', new Date().toLocaleDateString());
    notify.info('Welcome 😃');
  }
};

export default welcomeUser;
