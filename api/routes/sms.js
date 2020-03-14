var express      = require('express');
    router       = express.Router();
    bodyParser   = require('body-parser'),
    LdapStrategy = require('passport-ldapauth');
    nodemailer   = require('nodemailer');
    path         = require('path');
    fs           = require('fs');
    ldapjs       = require('ldapjs');
    User         = require('../models/user');

router.get('/callback', function(req, res){
  res.send('GET: Callback route works!');
});

router.post('/callback', function(req, res){
  var inboundNumber = req.body.to;
  var authCode = req.body.text;
  User.find({phoneNumber : inboundNumber}, function(data, err){
    if(err){
      return res.status(400).json({"status" : "error", "message" : err});
    }

    async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: data.email, // list of receivers
    subject: "MFA Code", // Subject line
    html: `<b>${authCode}</b>` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
  })

  console.log(req.body);
  res.status(200).end();
});

module.exports = router;
