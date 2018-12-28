var express = require('express');
var session = require('express-session');
var userdb= require('../UserDB.js');

var path = require('path');
var app = module.exports =express();
app.use(session({secret: "Shh, its a secret!"}));

app.get('/categories',function(request,response)
    {
      var path = process.cwd();
      request.session.theUser=userdb.getUser(1);
      var userid=request.session.theUser.userID;
      request.session.currentProfile=userdb.getProfileItems(request.session.theUser.userID);
      var userprofile= request.session.currentProfile;
    
     console.log(userid);
      response.render('categories',
                     {
          profileitems: userdb.getNotProfileItems(userid)
      })
      
});