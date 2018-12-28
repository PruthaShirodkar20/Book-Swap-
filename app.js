var express= require('express');
var app= express();
var ejs = require('ejs');
var bodyParser= require('body-parser');
var itemDB= require('./ItemDB.js'); 
var userDB= require('./UserDB.js');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var assert=require('assert');

MongoClient.connect(url, function(err,db)
{
    assert.equal(err,null);
    console.log("Connected to db");

app.set('view engine', 'ejs');
var session = require('express-session');
app.use(session({secret: "Session secret"}));

app.use('/js', express.static('../models'));
var ProfileController = require('./controllers/ProfileController.js');
app.use(ProfileController);
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/about',express.static('resources'));
app.use('/register',express.static('resources'));
app.use('/signIn',express.static('resources'));
app.use('/',express.static('resources'));
app.use('/contact',express.static('resources'));
app.use('/swap',express.static('resources'));
app.use('/categories',express.static('resources'));
app.use('/mySwaps',express.static('resources'));
app.use('/item',express.static('resources'));
app.use('/myItems',express.static('resources'));

app.get('/',function(request,response)
       {
    response.render('index');
});

app.get('/signIn',function(request,response)
       {
    response.render('signIn',
                    {
                   flg:0});
});

    
app.get('/about',function(request,response)
       {
    response.render('about');
});


app.get('/contact',function(request,response)
       {
      response.render('contact');
});


app.get('/swap',function(request,response)
       {
    response.render('swap');
});


app.get('/signout',function(request,response)
{
     request.session.theUser=null;
     request.session.currentProfile=null;
     response.render('index');
});


app.get('/swap', function(req, res){
      var itemCode = req.query.itemCode;
      for (var i = 0; i < bookDetails.length; i++) {
      if(bookDetails[i].itemCode === itemCode){
        var flag = true;
        res.render('swap', {
          books: itemDB.getItem(req.query.itemCode)
        });
        break;
      }           
    }

    if(!flag){
     res.redirect('categories');    
      }  
    });

});


app.listen(8080);

