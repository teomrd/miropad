import storage from "./localstorage";
import notify from "../components/molecules/notify";
import { configuration } from "../../configuration";
import { getTitle } from "../components/organisms/noteManager/noteManager";
import { convertMarkDownToHtml } from "../components/organisms/markdown/mdToHtml";

const handleErrorResponse = (response) => {
  const isSuccessfulRequest = response.status.toString().slice(0, 1) === "2";
  if (isSuccessfulRequest) return response;
  else throw new Error(response);
};

const wrapTemplate = (body = "") => {
  return `<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <table style="width:100%;background-color:#ffffff" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation">
      <tbody>
        <tr>
          <td>
            <div><!--[if mso | IE]>
              <table role="presentation" width="100%" align="center" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px;"><tr><td></td><td style="width:37.5em;background:#ffffff">
            <![endif]--></div>

            <div style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px"><img alt="Theo Mironidis Logo" src="https://teomrd.github.io/miroFavicon.f0c5b85b.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;wwwwidth:42px;height:42px" />
              ${body}
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" />
              <a target="_blank" style="color:#b4becc;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif;font-size:14px" href="https://teomrd.github.io">
              ${configuration.mail_service.signature}
              </a>
            </div>
            <div><!--[if mso | IE]>
            </td><td></td></tr></table>
            <![endif]--></div>
          </td>
        </tr>
      </tbody>
    </table>
  </html>`;
};

const sendMail = async (body, email, subject = "MiroPad note") => {
  if (!body) {
    notify.error("👻 No message to send, type something and try again! 🤓");
    return undefined;
  }
  try {
    await fetch(`${configuration.mail_service.api}`, {
      method: "POST",
      headers: {
        "x-secret-token": storage.get("MIROPAD_SECRET_TOKEN"),
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject,
        html: wrapTemplate(body),
      }),
    })
      .then(handleErrorResponse)
      .then((response) => response.json());

    notify.success("Email sent 🚀");
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

  notify.info("Sending mail... 🚀");
  const title = getTitle(what);
  const htmlBody = convertMarkDownToHtml(what);

  sendMail(htmlBody, email, title);
};

export { mailTo };
