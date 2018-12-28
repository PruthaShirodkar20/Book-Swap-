var express = require('express');
var session = require('express-session');
var user=require('../UserDB.js');
var itemdb =require('../ItemDB.js');

var path = require('path');
var app = module.exports =express();
app.use(session({secret: "Shh, its a secret!"}));


app.get('/myItems',function(request, response){
     if (request.session.theUser==undefined)
     {
      var path = process.cwd();
      request.session.theUser=user.getUser(1);
      request.session.currentProfile=user.getProfileItems(request.session.theUser.userID);
      var userprofile= request.session.currentProfile;
      response.render('myItems',
                     {
                      itemdata: userprofile
      });
      
     }
    else if(request.session.theUser)
    {
      request.session.currentProfile=user.getProfileItems(request.session.theUser.userID);
        var userid=request.session.theUser.userID;
      var userprofile= request.session.currentProfile;
      var action= request.param('action');
        if(action== undefined )
        {
             response.render('myItems',
                     {
                      success:true,
                      itemdata: userprofile
        });
        }
        else if(action == "update")
        {
            console.log("In Action Update");
            var itemid= request.param('bookid');
            
            if(itemdb.getItem(itemid)==null)
            {
                console.log("in if");
                response.render('myItems',
                                {
                                success:true,
                                itemdata: userprofile
                                });
            }
            else 
            {
                var check = user.checkIfValidEntry(userid, itemid);
                console.log("valid entry " + check);
                if(check)
                    {
                        if(user.getUserItem(itemid).status === "pending")
                        {
                          console.log("pending");
                          response.render('mySwaps',
                           {
                            success:true,
                            swapdt:userprofile
                          });
                        }
                else if(user.getUserItems(itemid).status === "available" || user.getUserItems(itemid).status === "swapped")
                {
                        response.render('item',{
            			success : true,
            			item : user.getUserItem(itemid).item,
                });
                }
                else {
            		response.render('myItems', {
                		success: true,
                		itemdata: userprofile,
           			 });
        		} 
            
             }
            else{
                console.log("user profile : " + userprofile);
            	response.render('myItems', {
                	success: true,
                	itemdata: userprofile,
            	});
        	} 
        
          if( action === "accept" || action === "reject" || action === "withdraw" ){
        	var itemid = request.param('itemCode');
            if(itemdb.getItem(itemid) === null){
                response.render('mySwaps', {
                	success : true,
                	swapdt : userprofile
                });
            }else if((action === "reject" || action === "withdraw") && itemdb.getItem(itemid) !== null){
            	userdb.changeUserItemStatus(request.session.theUser.userID, itemid, "available");
            	response.render('mySwaps',{
            		success: true,
            		swapdt: userprofile
                    });
            		
            }else if(action === "accept" && itemdb.getItem(itemid) !== null){
            	userdb.changeUserItemStatus(request.session.theUser.userID, itemid, "swapped");
            	response.render('mySwaps',{
            		success: true,
            		swapdt: userprofile,
            	});
            }
        }

        if(action === 'delete'){
        	var itemid= request.param('bookid');
        	request.session.currentProfile.removeUserItem();
        	response.redirect("/myItems");
        }
    }
}
}  
});

app.get('/mySwaps/swp', function(request, response){
    
    var bkid = request.param('bookid');
    var swpbkid = request.param('swpbkid');
    user.deletebooks(bkid, swpbkid);

    response.redirect('/mySwaps/');
     
      // if user is not present create a new user session

});

