var UserProfile= function (userID, userItems)
{
    this.userID=userID;
    this.userItems=userItems;
    
    var userprofile=
    {
        userID:this.userID,
        userItems:this.userItems
    }
    
    this.removeUserIte= function(userID)
    {
       delete UserProfile.userID;
    }


    
    this.emptyProfile=function()
    {
        delete UserProfile.userID;
        while(userItems.length > 0) {
             userItems.pop();
        }
    }
    
    return userprofile;
}


module.exports.UserProfile=UserProfile;