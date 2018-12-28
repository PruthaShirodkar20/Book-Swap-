var offer= require('./model/Offer.js');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var assert=require('assert');
var autoIncrement = require("mongodb-autoincrement");


module.exports.addOffer = function (userId, itemCodeOwn, itemCodeWant, itemUserId, itemStatus) 
{
    console.log("in addItem ");
    var offerObj= offer.offer(userId, itemCodeOwn, itemCodeWant, itemUserId, itemStatus);
    this.addItemDatabase(offerObj);
}
       
module.exports.addItemDatabase=function(offerObj)
{
	MongoClient.connect(url, function (err, db) {
    var dbo = db.db("booksdb");
    autoIncrement.getNextSequence(dbo,"offers", function (err, autoIndex) {
         console.log(autoIndex);
         var collection = dbo.collection("offers");
         collection.insert({
         	 offerID:autoIndex,
             userID: offerObj.userID,
             itemCodeOwn:offerObj.itemCodeOwn,
             itemCodeWant:offerObj.itemCodeWant,
             itemUserId:offerObj.itemUserId,
             itemStatus:offerObj.itemStatus  

         });
     });
  });
}

module.exports.updateOffer=function(offerID, itemStatus)
{
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("booksdb");
    var myquery = { offerID:offerID};
    var newvalues = { $set: {itemStatus:itemStatus}};
    dbo.collection("offers").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});

}


