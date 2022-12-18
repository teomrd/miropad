import storage from "./localstorage";
import notify from "../components/molecules/notify";

const sendMail = async (body, email, subject = "MiroPad note") => {
  if (!body) {
    notify.error("👻No message to send, type something and try again! 🤓");
    return undefined;
  }
  try {
    const response = fetch("https://miropad-oauth-service.vercel.app/mail", {
      method: "POST",
      headers: {
        "x-secret-token": storage.get("MIROPAD_SECRET_TOKEN"),
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject,
        html: `${body}`,
      }),
    }).then((response) => response.json());

    // eslint-disable-next-line no-console
    console.log("email response 👉", response);
    notify.info("Email sent 🚀");
  } catch (error) {
    notify.error(
      "Error not went through 💥! Check your credentials and try again!"
    );
  }
};

const getUserMailingPreferences = () => {
  const savedMail = storage.get("mail");
  if (savedMail) {
    const mailSameAgainQuestion = window.prompt(
      `Mail ${savedMail} again? (y)es/(no)`,
      "yeap"
    );
    if (mailSameAgainQuestion === null) {
      return mailSameAgainQuestion;
    }
    if (mailSameAgainQuestion.slice(0, 1).toLowerCase() === "y") {
      return savedMail;
    }
  }
  const whoMailing = window.prompt("Where do you wanna send the mail to?");
  const wannaSaveDat = window.prompt(
    "Do you wanna save that to your preferences for later on? (y)es/(no)",
    "yeap"
  );
  if (wannaSaveDat && wannaSaveDat.slice(0, 1).toLowerCase() === "y") {
    storage.set("mail", whoMailing);
  }
  return whoMailing;
};

const mailTo = (what) => {
  const email = getUserMailingPreferences();
  if (email === null) {
    notify.info("Sending mail cancelled 😶");
    return undefined;
  }
  sendMail(what, email);
};

export { mailTo };
