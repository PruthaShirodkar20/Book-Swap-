var express = require('express');
var session = require('express-session');
var user=require('../UserDB.js');
var feedbackdb =require('../FeedbackDB.js');
var offer=require('../OfferDB.js');
var itemdb =require('../ItemDB.js');
var async = require('async');
var path = require('path');
var app = module.exports =express();
app.use(session({secret: "Shh, its a secret!"}));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var expressSanitizer = require("express-sanitizer");
var sanitize = require('mongo-sanitize');
var validator = require('express-validator');
var userprofile;
const { check, oneOf, validationResult } = require('express-validator/check');
app.use(validator());

app.post('/signIn',function(request, response)
{
response.render('signIn',
               {
    flg:0
});
});


app.get('/register',function(request,response)
        {
    response.render('register',
                   {
        errors:undefined
    })
});

app.post('/register/register',urlencodedParser,function(request,response)
{
    var action= request.param('action');
    if(action === 'registered')
    {
        var firstname=sanitize(request.body.firstname);
        var lastname=sanitize(request.body.lastname);
        var email=sanitize(request.body.email);
        var address1= sanitize(request.body.address1);
        var address2=sanitize(request.body.address2);
        var city= sanitize(request.body.city);
        var state=sanitize(request.body.state);
        var postalCode=sanitize(request.body.postalCode);
        var country=sanitize(request.body.country);
        var username=sanitize(request.body.username);
        var password=sanitize(request.body.password);
        
        request.checkBody('firstname', "Invalid first name")
    .isAlpha()
    .isLength({ min:3,max: 20 });
        
        request.checkBody('lastname', "Invalid last name")
    .isAlpha()
    .isLength({ min:3,max: 20 });
        
        request.checkBody('email', "Invalid email id.")
    .isEmail()
    .isLength({ min:6,max: 40 });
        
    
        request.checkBody('address1', "Invalid Address.")
    .isLength({ min:1,max: 100 });

    request.checkBody('address2', "Invalid Address.")
    .isLength({ min:1,max: 40 });

    request.checkBody('city', "Invalid City")
    .isLength({min:3,max:50});

    request.checkBody('state', "Invalid State")
    .isLength({min:2,max:50});

    request.checkBody('postalCode', "Invalid Post code")
    .isLength({min:5,max:50});

    request.checkBody('username', "Invalid username")
    .isLength({min:1,max:50});
        
     request.checkBody('country', "Invalid country")
    .isLength({min:2,max:50});

    request.checkBody('password', "Invalid Password(minimum 8 char)")
    .isLength({min:6,max:50});
        
      var errorMap = new Object();
      var errors = request.validationErrors();
      if (errors.length>0) {
        
        errors.forEach(function(err){
          errorMap[err.param] = err.msg;
        });

    response.render('register',
                    {
                   errors: errorMap});
    }
    else
    {
         response.render('signIn',
                        {
             flg:1
         });
    }
}});


//app.get('/mySwaps', async function(req, res){
////	var theUser = req.session.theUser;
////	var currentProfile = req.session.currentProfile;
////    var db= await MongoClient.connect(url);
////    var dbo = db.db("booksdb");
////    console.log(itemid);
////    var query = {"item.itemCode": parseInt(itemid,10) };
////    var result=await dbo.collection("UserItem").find(query).toArray();   
//	if(theUser !== undefined && currentProfile !== undefined){
//		res.render('mySwaps',{
//            		success: true,
//            		userProfile: currentProfile,
//            		userdt:result[0]
//            	});
//	}else{
//		res.redirect("/myItems");
//	}
//
//});
app.post('/mySwaps',function(request,response)
{
 console.log("stttsuustususus");   
       response.render('mySwaps',
                     {
                      swapdt:undefined,
                      userdt: undefined
                    });});


app.post('/signIn/sign',urlencodedParser,async function(request, response)
{
    var action= request.param('action');
    var userprofile="";
    if(action === 'signin')
    {
        
       if(request.session.theUser===null)
       {
       var email=request.body.emailId;          
       var pass=request.body.password;
       var db= await MongoClient.connect(url);
       var dbo = await db.db("booksdb");
       var query = { username: email};
       var result= await dbo.collection("User").find(query).toArray();
       if(result)
      {
          if(result.length===0)
              response.render('signIn');
          else
          {
                 var query = { username: email,password: pass};
                 var dt= await dbo.collection("User").find(query).toArray();
                 var userprofile=await user.getUserProfile(dt[0].userID);
                 request.session.theUser=userprofile;
                
                 response.render('myItems',
                    {
                      itemdata: userprofile
             });  
          };
       }
    }
    else{
        response.render('myItems',
                     {
                      itemdata: userprofile
      }); 
    }
};
});

app.get('/categories',async function(request, response)
{
      request.session.currentProfile=request.session.theUser;
      var userid=request.session.theUser[0].userID;
      var itemdt;
      itemsdt1=await user.otherUserProfile(userid);
      
      response.render('categories',
      {
         notdt:userid,
         itemdt:itemsdt1
      });
});


app.get('/item', async function(request,response){
    
      request.session.currentProfile=request.session.theUser;
      var userid=request.session.theUser[0].userID;
      var itemdt;
      userdt1=await user.getUserProfile(userid);
      itemsdt1=await itemdb.getItem(request.query.itemCode);    
      console.log("item..............");
      response.render('ItemDt', {
                    found: true,
                    books: itemsdt1,
                    userdt: userdt1  
                });
});


app.post("/myItems", urlencodedParser, async function(req, res){

    
        console.log("swpppppppppp");
    var swapItemCode = req.query.itemCode;
    console.log(swapItemCode);
    var action = req.query.action;
    var availableItemCode = req.body.itemSelected;
    var userid=req.session.theUser[0].userID;
    console.log("action"+action);
    if(action && action === "offer"){        
        await user.addOffer(userid, availableItemCode, swapItemCode, "Pending");
        var db= await MongoClient.connect(url);
         var dbo = db.db("booksdb");
        var query = {"item.itemCode": parseInt(availableItemCode,10) };
        var result=await dbo.collection("UserItem").find(query).toArray();
        console.log("reee")
        console.log(result[0]);
        res.render('mySwaps',
                  {
            success:true,
            swapdt:result[0],
            userdt:result[0]
        })
    }
});


app.get('/myItems',async function(request, response){
     console.log("item updte");
     request.session.currentProfile=request.session.theUser;
      var userid=request.session.theUser[0].userID;
       userprofile= request.session.currentProfile;
      
      var action= request.param('action');
      
        if(action=== undefined )
        {
             response.render('myItems',
                     {
                      success:true,
                      itemdata: userprofile
                    });
        }
        else if(action === 'update')
        {
           
            var itemid= request.param('bookid');
    
            if(itemdb.getItem(itemid)===null)
            {
                
                response.render('myItems',
                                {
                                success:true,
                                itemdata: userprofile
                                });
            }
            else 
            {
                var check = user.checkIfValidEntry(userid, itemid);
                if(check)
                    {
                        console.log("checked");
                        
                            var db= await MongoClient.connect(url);
                            var dbo = db.db("booksdb");
                            console.log(itemid);
                            var query = {"item.itemCode": parseInt(itemid,10) };
                            var result=await dbo.collection("UserItem").find(query).toArray();   
                            console.log("result is");
                            console.log(result[0].status);
               if(result[0].status === "Pending" ||result[0].status === "Offered")
                        {
                            response.render('mySwaps',
                           {
                            success:true,
                            swapdt:userprofile.getUserItem(itemid),
                            userdt:result[0]
                          });
                        }
               else if(result[0].status == 'Available' || result[0].status === "Swapped")
                {  
                    console.log("Available");
                        response.render('ItemDt',
                       {
           			     success : true,
        			     books : itemdb.getItem(itemid),
                         userdt: userprofile
                });
               }
                                        
                else {
                    console.log('else');
            		response.render('myItems', {
                		success: true,
                		itemdata: userprofile,
           			 });
        		} 
            
             }
        }
        }
            else{
                
            	response.render('myItems', {
                	success: true,
                	itemdata: userprofile,
            	});
        	} 
        
          if( action === "accept" || action === "reject" || action === "withdraw" ){
        	var itemid = request.param('itemCode');
            if(itemdb.getItem(itemid) === null){
                 var db= await MongoClient.connect(url);
                            var dbo = db.db("booksdb");
                            var query = {"item.itemCode": itemid };
                            var result=dbo.collection("UserItem").find(query).toArray();                      
                          response.render('mySwaps',
                           {
                            success:true,
                            swapdt:userprofile.getUserItem(itemid),
                            userdt:result
                          });
                        };
               
            }else if((action === "reject" || action === "withdraw") && itemdb.getItem(itemid) !== null){
            	userdb.changeUserItemStatus(userid, itemid, "available");
//            	response.render('mySwaps',{
//            		success: true,
//            		swapdt: userprofile
//                    });
                var db= await MongoClient.connect(url);
                            var dbo = db.db("booksdb");
                            var query = {"item.itemCode": itemid };
                            var result=dbo.collection("UserItem").find(query).toArray();                      
                          response.render('mySwaps',
                           {
                            success:true,
                            swapdt:userprofile.getUserItem(itemid),
                            userdt:result
                          });
            		
            }else if(action === "accept" && itemdb.getItem(itemid) !== null){
            	userdb.changeUserItemStatus(userid, itemid, "swapped");
//            	response.render('mySwaps',{
//            		success: true,
//            		swapdt: userprofile,
//            	});
                var db= await MongoClient.connect(url);
                            var dbo = db.db("booksdb");
                            var query = {"item.itemCode": itemid };
                            var result=dbo.collection("UserItem").find(query).toArray();                      
                          response.render('mySwaps',
                           {
                            success:true,
                            swapdt:userprofile.getUserItem(itemid),
                            userdt:result
                          });
            }
        if(action === 'delete'){
        	var itemid= request.param('bookid');
        	request.session.currentProfile.removeUserItem();
        	response.redirect("/myItems");
        }
});

app.get('/mySwaps/swp', function(request, response){
    
    var bkid = request.param('bookid');
    var swpbkid = request.param('swpbkid');
    user.deletebooks(request.session.theUser, bkid, swpbkid);
    response.redirect('/mySwaps/');
     
      // if user is not present create a new user session

});

