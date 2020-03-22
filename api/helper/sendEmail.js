    bodyParser   = require('body-parser'),
    nodemailer   = require('nodemailer');
    path         = require('path');
    fs           = require('fs');
    ldapjs       = require('ldapjs');
    User         = require('../models/user');
    middleware = require('../middleware/middleware');
    emailConfig  = require('../config/email');
    ejs          = require('ejs')

    sendEmail = (recipient, subject, template, message) => {
     let transporter = nodemailer.createTransport(emailConfig);
ejs.renderFile(`${process.cwd()}/api/assets/templates/${template}`, {message : message}, function(err, data){
        if(err){
            console.log(err);
        } else {
              var options = {
              from: '"Sms2Email" <lrgongora@outlook.com>',
              to: recipient,
              subject: subject,
              html: data,
             };
  transporter.sendMail(options, function(err, info){
      if(err){
          middleware.logsHandler("error", err.message)      }
      console.log(info)
      console.log("Message sent: %s", info.messageId);})
        }
    })
}

module.exports = sendEmail;