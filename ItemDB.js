var item= require('./model/item.js');
var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/booksdb";
var assert=require('assert');


MongoClient.connect(url, function(err,db)
{
    bookDetails =[]
    assert.equal(err,null);
    var cursor=db.collection('item').find();
    cursor.forEach(function(document,error)
   {
      assert.equal(error,null);
      bookDetails.push(item.item(document));
   })
    
});

  
function addItem(itemCode, itemName, categoryCode, catalogCategory, description, imageUrl)
{
  
    var itemObj= item.item(itemCode, itemName, categoryCode, catalogCategory, description, imageUrl);
    addItemDatabase(itemObj);
}

function addItemDatabase(itemObj)
{
     MongoClient.connect(url, function(err, db) {
     if (err) throw err;
     var dbo = db.db("booksdb");
     dbo.collection("item").insertOne(itemObj, function(err, res) {
     if (err) throw err;
    
     db.close();
  });
});
}

async function getAllItems()
{
    var db= await MongoClient.connect(url);
    var dbo = await db.db("booksdb");
    var itemresult=await dbo.collection("item").find().toArray();
    return itemresult;
    db.close();
};



async function getItem(itemID)
{
    var db= await MongoClient.connect(url);
    var dbo = await db.db("booksdb");
    var query = { itemCode: parseInt(itemID,10) };
    var itemresult=await dbo.collection("item").find(query).toArray();
    console.log(itemresult);
    return itemresult;
    db.close();
};



module.exports = {
    getItem: getItem,
    addItem:addItem,
    getAllItems:getAllItems,
    addItemDatabase:addItemDatabase
}