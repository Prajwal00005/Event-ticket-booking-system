import { Resend } from "resend";
import config from "../config/index.js";

const sendMail = async (email, subject, body) => {
  const resend = new Resend(config.mailApi);

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: body,
    });

    if (error) {
      console.log(error);
    }

    return data;
  } catch (e) {
    console.log("Mail error:", e.message);
    return null;
  }
};

export default sendMail;
