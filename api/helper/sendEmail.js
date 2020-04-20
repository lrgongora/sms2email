const nodemailer = require('nodemailer');
      middleware = require('../middleware/default');
      config     = require('../config/default');
      ejs        = require('ejs')

sendEmail = (recipient, subject, template, data) => {
    const transporter = nodemailer.createTransport(config.email);
    ejs.renderFile(`${process.cwd()}/api/assets/templates/${template}`, {
        data: data
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            let options = {
                from: '"Sms2Email" <lrgongora@outlook.com>',
                to: recipient,
                subject: subject,
                html: data,
            };
            transporter.sendMail(options, function(err, info) {
                if (err) {
                    middleware.logsHandler("error", err.message)
                }
            })
        }
    })
};

module.exports = sendEmail;