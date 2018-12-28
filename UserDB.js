var user=require('./model/User.js');
var itemdb=require('./ItemDB.js');
var userprofile= require('./model/UserProfile.js')
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var assert=require('assert');
var MongoClient = require("mongodb").MongoClient;
var autoIncrement = require("mongodb-autoincrement");
var userDetails=[];
var userProfileDetails=[];


MongoClient.connect(url, function(err,db)
{
    assert.equal(err,null);
    var cursor=db.collection('User').find();
    cursor.forEach(function(document,error)
   {
      assert.equal(error,null);
      userDetails.push(user.user(document));
      
   })

});

(function()
{
    return MongoClient.connect(url).then(function(db) {
      var dbo=db.db("booksdb");
      var collection = dbo.collection('UserItem');
      return collection.find().toArray();
    }).then(function(items) {
      userProfileDetails.push(userprofile.UserProfile(1,items[0].item, items[0].status));
      userProfileDetails.push(userprofile.UserProfile(1,items[1].item, items[1].status));
      userProfileDetails.push(userprofile.UserProfile(2,items[2].item, items[2].status));
      userProfileDetails.push(userprofile.UserProfile(2,items[3].item, items[3].status));
      userProfileDetails.push(userprofile.UserProfile(2,items[4].item, items[4].status));
      console.log("userProfileDetails");
      console.log(userProfileDetails);
      return userProfileDetails;
    });
  })();


module.exports.getAllUsers = function()
{
    return MongoClient.connect(url).then(function(db) {
      var dbo=db.db("booksdb");
      var collection = dbo.collection('User');
      return collection.find().toArray();
    }).then(function(items) {
      
      return items;
    });
  };


module.exports.getUser=function(userid)
{
    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("booksdb");
    var query = { userID: userid };
    dbo.collection("User").find(query).toArray(function(err, result) {
    if (err) throw err;
   
    return result;
    db.close();
  });
});
}

module.exports.addUser=function(username, password,firstName, lastName, email, address1, address2, city, state, zipcode, country)
{
  
    console.log("addUser");
    var userObj= user.user(username, password,firstName, lastName, email, address1, address2, city, state, zipcode, country);
    module.exports.addUserDatabase(userObj);
}

module.exports.addOffer=  async function(userid, availableItemCode, swapItemCode, sttus)
{
    var db= await MongoClient.connect(url);
    var dbo = await db.db("booksdb");
    var userItem=  await itemdb.getItem(availableItemCode);
    console.log("userItem"+userItem[0].itemName);
    
    var swpItem= await itemdb.getItem(swapItemCode);
    console.log("swpItem"+swpItem[0].itemName);
    
    var userItems = await dbo.collection("UserItem").updateOne({"item.itemCode": parseInt(availableItemCode,10)}, {$set: {"swapitem" : swpItem, "status": "Pending"}});
    var userItems1 = await dbo.collection("UserItem").updateOne({"item.itemCode": parseInt(swapItemCode,10)}, {$set: {"swapitem" : userItem, "status": "Offered"}});
   
}

async function getAllItems()
{
    var db= await MongoClient.connect(url);
    var dbo = await db.db("booksdb");
    var itemresult=await dbo.collection("item").find().toArray();
    return itemresult;
    db.close();
};


module.exports.addUserDatabase=function (userObj)
{
   
    MongoClient.connect(url, function (err, db) {
    var dbo = db.db("booksdb");
    autoIncrement.getNextSequence(dbo,"User", function (err, autoIndex) {
         
         var collection = dbo.collection("User");
         collection.insert({
             userID: autoIndex,
             username:userObj.username,
             password:userObj.password,
             firstName:userObj.firstName,
             lastName:userObj.lastName,
             emailAddress:userObj.emailAddress,
             address1:userObj.address1,
             address2:userObj.address2,
             city:userObj.city,
             state:userObj.state,
             postalCode:userObj.postalCode,
             country:userObj.country

         });
     });
  });
  }

module.exports.getUserProfile=function(userid)
{
    profile=[];
    for(var i=0;i<userProfileDetails.length;i++)
        {
            if(userid ==userProfileDetails[i].userID)
                {
                    profile.push(userProfileDetails[i]);
                 
                }
        }
        if(profile.length>0)
        {
           
            return profile;
        }
        else
            return undefined;
}

module.exports.otherUserProfile=function(userid)
{
    profile=[];
    for(var i=0;i<userProfileDetails.length;i++)
        {
            if(userid !==userProfileDetails[i].userID)
                {
                    profile.push(userProfileDetails[i]);
                 
                }
        }
        if(profile.length>0)
        {
           
            return profile;
        }
        else
            return undefined;
}

module.exports.changeItemStatus=function(currentsession, itemid, status){
    for(var i=0;i< currentsession.userItems.length;i++){
        if(currentsession.userItems[i].item.itemCode === itemid){
            currentsession.useritem[i].status = status;
        }
    }
};


module.exports.deletebooks=function(currentsession, bkid, swpid)
{
    for(var i=0;i<2;i++){
        if( currentsession[i].userItems.item.itemCode == bkid){
          currentsession.splice(i,1);
          break;
        }
        else if(currentsession[i].userItems.swapItem.itemCode == swpid){
          currentsession.splice(i,1);
          break;

        }
    }
       
    return true;
}

module.exports.checkIfValidEntry=function(userId, itemId)
{
    var uitem = this.getUserProfile(userId);
    for(var i=0;i<uitem.length;i++)
        {
            if(uitem[i].userItems.itemCode == itemId)
                {
                return true;
                }
        }
    return false;
}






