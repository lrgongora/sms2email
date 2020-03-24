const express      = require('express');
      mongoose     = require('mongoose');      
      AuthorizationCode = require('../models/authorizationCode');
      configVars       = require('../config/variables');

mongoose.connect(configVars.database, {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
  if(err){
    console.log(err);
  }
  else {
    console.log("Connection to DB was successful!")
  }
})

seed = {
      user: null,
      code: "25jj3698"};

function seedDB(){
    AuthorizationCode.create(seed, function(err, newCode){
        if(err){
            console.log(err)
        } else {
            console.log("Seeding was successfull! Please, use code 25jj3698 to register.")
        }
    })
}

seedDB();