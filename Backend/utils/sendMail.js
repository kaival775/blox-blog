const nodemail = require("nodemailer");
const { senderemail, emailpassword } = require("../configs/keys");
const sendMail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: senderemail,
      pass: emailpassword,
    },
  });
  const message = {
    to: emailTo,
    subject,
    html: `
        <div>
        <h3>Use this below code to ${content}</h3>
        <h1>${code}</h1>
        </div>
       `,
  };
  await transporter.sendMail(message);
};

module.exports = sendMail;
