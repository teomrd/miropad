import notify from "../notify";

const mailTo = what => {
  if (!what) {
    notify.error("👻No message to send, type something and try again! 🤓");
    return undefined;
  }
  const mailLink = document.createElement("a");
  mailLink.target = "_blank";
  const email = "mironidis.gr@gmail.com";
  const mailBody = what;
  const subject = "MiroPad note";
  mailLink.href = `mailto:${email}?&subject=${subject}&body=${mailBody}`;
  document.body.appendChild(mailLink);
  mailLink.click();
  document.body.removeChild(mailLink);
};

export { mailTo };
