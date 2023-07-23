const nodemailer = require('nodemailer');
const { type } = require('os');
//3.1 create a transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,

    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  //3.2 define the email options
  //   console.log(options.email, options.text);
  //   console.log(process.env.MAIL_PASSWORD);
  const mailOptions = {
    from: 'Benjamin Qian <qianjingning0903@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  //3.3 send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
