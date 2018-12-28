var feedback= require('./model/Feedback.js');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var assert=require('assert');

module.exports.addFeedback= function (userid1,userid2,offerid,itemcode, offerrating, itemrating) 
{
    console.log("in addFeedback ");
    var feedbackObj= feedback.feedback(userid1,userid2,offerid,itemcode, offerrating, itemrating);
    console.log(feedbackObj);
    this.addFeedbackDatabase(feedbackObj);
}
       
module.exports.addFeedbackDatabase=function(feedbackObj)
{
    console.log("in addFeedback 1");
    MongoClient.connect(url, function (err, db) {
    var dbo = db.db("booksdb");
    var collection = dbo.collection("feedback");
    collection.insert({
             feedbackObj
         });
     });
  }