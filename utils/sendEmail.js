const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host:  process.env.HOST,
    port:  process.env.EPORT,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS, 
    },
    tls: { rejectUnauthorized: false },
  });
  const mailOptions = {
    from: "train station admin <admin@train_station.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
