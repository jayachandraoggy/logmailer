const nodemailer = require("nodemailer");
const config = require("config");

async function sendMail(toEmail) {
    const transportConfig = config.get('mailer.transport');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: transportConfig.host,
        port: transportConfig.port,
        secure: transportConfig.secure, // true for 465, false for other ports
        auth: {
            user: transportConfig.auth.user, // generated ethereal user
            pass: transportConfig.auth.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Log Mailer" <logmailer@domain.com>',
        to: toEmail, // list of receivers
        subject: "Git History from Log Mailer",
        html: "<b>PFA for the commits history.</b>",
        attachments: [
            {
                path: '/tmp/history.log'
            }
        ]
    });
}

module.exports = sendMail;