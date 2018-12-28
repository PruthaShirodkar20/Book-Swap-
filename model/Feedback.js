var feedback= function(userid1,userid2,offerid,itemcode, offerrating, itemrating)

{
    this.userID1 =userid1;
    this.userID2 =userid2;
    this.offerID =offerid;
    this.itemCode =itemcode;
    this.offerRating =offerrating;
    this.itemRating =itemrating;

    
    var Feedback={
        userID1 :this.userID1,
        userID2 :this.userID2,
        offerID :this.offerID,
        itemCode:this.itemCode,
        offerRating :this.offerRating,
        itemRating :this.itemRating      
    }
    
    return Feedback;
}

module.exports.feedback=feedback;