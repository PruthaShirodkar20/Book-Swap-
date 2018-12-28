var offer= function(userid, itemcodeown, itemcodewant, itemuserid, itemstatus)
{
    this.userID =userid;
    this.itemCodeOwn =itemcodeown;
    this.itemCodeWant =itemcodewant;
    this.itemUserId =itemuserid;
    this.itemStatus =itemstatus;

    
    var Offer={
        userID:this.userID,
        itemCodeOwn:this.itemCodeOwn,
        itemCodeWant:this.itemCodeWant,
        itemUserId:this.itemUserId,
        itemStatus:this.itemStatus       
    }
    
    return Offer;
}

module.exports.offer=offer;