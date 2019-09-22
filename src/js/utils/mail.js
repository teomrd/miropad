import notify from "../notify";
import storage from "./localstorage";

const sendMail = (body, email, subject = "MiroPad note") => {
  if (!body) {
    notify.error("👻No message to send, type something and try again! 🤓");
    return undefined;
  }
  const mailLink = document.createElement("a");
  mailLink.target = "_blank";
  mailLink.href = `mailto:${email}?&subject=${subject}&body=${body}`;
  document.body.appendChild(mailLink);
  mailLink.click();
  document.body.removeChild(mailLink);
};

const getUserMailingPreferences = () => {
  const savedMail = storage.get("mail");
  if (savedMail) {
    const mailSameAgainQuestion = window.prompt(
      `Mail ${savedMail} again? (y)es/(no)`,
      "yeap"
    );
    if (mailSameAgainQuestion.slice(0, 1).toLowerCase() === "y") {
      return savedMail;
    }
  }
  const whoMailing = window.prompt("Where do you wanna send the mail to?");
  const wannaSaveDat = window.prompt(
    "Do you wanna save that to your preferences for later on? (y)es/(no)",
    "yeap"
  );
  if (wannaSaveDat.slice(0, 1).toLowerCase() === "y") {
    storage.set("mail", whoMailing);
  }
  return whoMailing;
};

const mailTo = what => {
  const email = getUserMailingPreferences();
  sendMail(what, email);
};

export { mailTo };
