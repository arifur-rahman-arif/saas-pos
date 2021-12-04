const nodemailer = require("nodemailer");
const ErrorResponse = require("../ErrorResponse");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendMail = async (args) => {
    const { toEmail, message, subject } = args;

    if (!toEmail || !message || !subject) {
        new ErrorResponse("Missing parameter for email request", 400);
    }

    let options = {
        from: process.env.SMTP_USERNAME,
        to: toEmail,
        subject: subject,
        html: message,
    };

    return await transporter.sendMail(options);
};

module.exports = sendMail;
