const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config('./env');

const user = process.env.EMAIL_USER;
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: { user, pass: process.env.EMAIL_PASSWORD },
});

module.exports.sendMail = async (additionalMailOption, res) => {
  const mailOptions = {
    from: user,
    to: process.env.EMAIL_SEND_TO,
    ...additionalMailOption,
  };

  await transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(502).json(JSON.stringify(false));
    } else {
      res.status(201).json(JSON.stringify(true));
    }
  });
};
