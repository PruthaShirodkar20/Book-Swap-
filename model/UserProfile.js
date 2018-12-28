var UserProfile= function (userID, userItems,status)
{
    this.userID=userID;
    this.userItems=userItems;
    this.status=status;
    
    var userprofile=
    {
        userID:this.userID,
        userItems:this.userItems,
        status:this.status
    }
    
    this.removeUserItem= function(userID)
    {
       delete UserProfile.userID;
    }

    this.getUserItems = function(){
        return this.userItems;
    };


    this.emptyProfile=function()
    {
        delete UserProfile.userID;
        while(userItems.length > 0) {
             userItems.pop();
        }
    }
    this.getUserItem = function(itemCode){
        for(var i=0;i<this.userItems.length;i++){
            if(itemCode === this.userItems[i].item.itemCode){
                return this.userItems[i];
            }
        }
        return null;
    }
    
    return userprofile;
}


module.exports.UserProfile=UserProfile;