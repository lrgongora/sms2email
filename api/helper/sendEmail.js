    bodyParser   = require('body-parser'),
    nodemailer   = require('nodemailer');
    path         = require('path');
    fs           = require('fs');
    ldapjs       = require('ldapjs');
    User         = require('../models/user');
    middleware = require('../middleware/middleware');
    emailConfig  = require('../config/email');
    configvars   = require('../config/variables');
    ejs          = require('ejs')

    sendEmail = (recipient, subject, template, data) => {
     let transporter = nodemailer.createTransport(emailConfig);
ejs.renderFile(`${process.cwd()}/api/assets/templates/${template}`, {data : data}, function(err, data){
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