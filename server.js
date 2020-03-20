var express      = require('express'),
    passport     = require('passport'),
    passportLocalStrategy = require('passport-local');
    bodyParser   = require('body-parser'),
    nodemailer   = require('nodemailer');
    mongoose     = require('mongoose');
    path         = require('path');
    fs           = require('fs');
    smsRoute     = require('./api/routes/sms');
    authRoute    = require('./api/routes/auth');
    usersRoute   = require('./api/routes/users');
    logsRoute    = require('./api/routes/logs');
    User         = require('./api/models/user');
    port         = process.env.PORT  || 8080;
    passportJWT  = require("passport-jwt");
    JWTStrategy  = passportJWT.Strategy;
    ExtractJWT   = passportJWT.ExtractJwt;

const mongoUri = process.env.MONGOURI;

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connection to DB was successful!")
  }
})

var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}/dist/`)));
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser(), function(user, done){
    if(user) done(null, user);
});
passport.deserializeUser(User.deserializeUser(), function(id, done){
  done(null, id);
});
passport.use(new passportLocalStrategy(User.authenticate()));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));



//ROUTES SET-UP

app.use('/api/sms', smsRoute)
app.use('/auth', authRoute);
app.use('/api/users', usersRoute)
app.use('/api/logs', logsRoute)

//INITIAL ROUTE

app.all('*', function(req, res){
  res.status(200).sendFile(path.join(`${__dirname}/dist/index.html`))
});


app.listen(port);
