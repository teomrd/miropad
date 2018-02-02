import notify from './notify';

const welcomeUser = () => {
  const lastVisit = localStorage.getItem('miropad.user');
  if (lastVisit) {
    notify.info(`Happy to see you again from ${lastVisit}`);
  } else {
    notify.info(
      `<h1>Welcome 😃</h1>
    <p>Use  Ctrl+S:  to save your note<p/>
    <p>& Ctrl+P: to format a JSON doc<p/>`,
      10,
    );
  }
  localStorage.setItem('miropad.user', new Date().toLocaleDateString());
};

export default welcomeUser;
