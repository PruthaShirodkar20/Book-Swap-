var user=require('./model/User.js');
var userprofile= require('./model/UserProfile.js')


userDetails=[]
userProfileDetails=[]
var useritem = [
   {
    item:{
        itemCode: 10003,
        itemName:"Steve Jobs", 
        catalogCategory:"Non-Fiction",
        description:"Biography book of Steve Jobs",
        rating:4,
        imageUrl:"steve-jobs.jpg"
    },
    rating:3,
    status:"pending",
    swapItem:
       {itemCode:10001, 
        itemName:"Anne Frank",
        catalogCategory:"Non-Fiction",
        description:"Biography book of Anne Frank",
        rating:4, 
        imageUrl:"anne-frank.jpg"
       },
    swapItemRating:3,
    swapperRating:4
   },
   {
    item:{
        itemCode:10002, 
        itemName:"A Night To Remember",
        catalogCategory:"Non-Fiction",
        description:"Book that depicts the sinking of the RMS Titanic on 15 April 1912",
        rating:4,
        imageUrl:"a-night-to-remember.jpg"
    },
    rating:4,
    status:"available",
    swapItem:
       {itemCode:20005, 
        itemName:"Sydney Sheldon: If tomorrow comes", 
        catalogCategory:"Fiction",
        description:"It is a book by Sydney Sheldon base on thriller and suspense",
        rating:4, 
        imageUrl:"if-tomorrow-comes.jpg"
       },
    swapItemRating:3,
    swapperRating:4 
   },
   {
    item:{
        itemCode:10004, 
        itemName:"MARTIN LUTHER KING JR.",
        catalogCategory:"Non-Fiction",
        description:"Biography book of Martin Luther King Jr",
        rating:4,
        imageUrl:"martin-luther.jpg"
    },
    rating:2,
    status:"pending",
    swapItem:
       {itemCode:20004, 
        itemName:"SYDNEY SHELDON: MORNING, NOON AND NIGHT", 
        catalogCategory:"Fiction",
        description:"It is a book by Sydney Sheldon base on thriller and suspense",
        rating:4, 
        imageUrl:"morning-noon-night.jpg"
       },
    swapItemRating:3,
    swapperRating:4 
   }
]

userDetails.push(user.user(1, "Prutha","Shirodkar","pruth@gmail.com","10004 UTN","","Charlotte","NC","28262","United States"));


userDetails.push(user.user(2, "Yash","Shirodkar","yash@gmail.com","10005 UTN","","Charlotte","NC","28262","United States"));


userDetails.push(user.user(3, "Nikita","Nalawade","niki@gmail.com","10004 UT","","Charlotte","NC","28262","United States"));
                           

userDetails.push(user.user(4, "Arjun","Yeravdekar","arjun@gmail.com","9823 UT","","New York","NY","10001","United States"));


userDetails.push(user.user(5, "Parth ","Jain","pkunster@gmail.com","3369 Florence","","San Jose","CA","90224","United States"));
                           

userDetails.push(user.user(6, "Aditi","Konde","aditi21@gmail.com","3365 UTN","","Charlotte","NC","28262","United States"));

                           
userProfileDetails.push(userprofile.UserProfile(1,useritem));     


function getUsers()
{
    return this.userDetails;
}

function getProfileItems(userid)
{

    console.log("In getProfile controller ");
    console.log(userid);
    profile=[];
    for(var i=0;i< userProfileDetails.length;i++)
        {
            if(userid ==userProfileDetails[i].userID)
                {
                    profile.push(userProfileDetails[i]);
                }
        }

        console.log("Profile is : ");
        console.log(profile);
        if(profile.length>0)
            {
                console.log("profile");
                return profile[0];
            }
        else
            return undefined;
}

function changeItemStatus(userid, itemid, status){
    for(var i=0;i< getProfileItems(userid).useritem.length;i++){
        if(getProfileItems(userid).useritem[i].item.itemCode === itemid){
            getProfileItems(userid).useritem[i].status = status;
        }
    }
};


function getUser(userid)
{
        user = [];
        for(var i = 0; i < userDetails.length; i++){
        if(userid == userDetails[i].userID){
            user.push(userDetails[i]);
        }
    }
    if(user.length > 0){
        return user[0];
    } else {
        return undefined;
    }
}
function deletebooks(bkid, swpid)
{

    for(var i=0;i<useritem.length;i++){
        var usr_json = useritem[i];
        if(usr_json.item.itemCode == bkid){
          useritem.splice(i,1);
          break;
        }
        else if(usr_json.swapItem.itemCode == swpid){
          useritem.splice(i,1);
          break;

        }
    }

    console.log("after deletion is ");
    console.log(useritem);
       
    return true;
}

function checkIfValidEntry(userId, itemId)
{
    var uitem = getProfileItems(userId).userItems;
    console.log(" Pr UserBd user item  ");
    console.log(uitem[0].item.itemCode);
    console.log("item id is ");
    //console.log
    
    
    for(var i=0;i<uitem.length;i++)
        {
            if(uitem[i].item.itemCode == itemId)
                {
                    console.log("sm");
                return true;
                }
        }
    return false;
}

     function getUserItems(){
        return this.userProfile.userItems;
    };

    function getUserItem (itemCode){
        for(var i=0;i< userProfileDetails[0].userItems.length;i++){
            if(itemCode === this.userItems[i].item.itemCode){
                return userItems[i];
            }
        }
        return null;
    }



module.exports = {
    getUsers: getUsers,
    getUser:getUser,
    getProfileItems:getProfileItems,
    deletebooks:deletebooks,
    checkIfValidEntry:checkIfValidEntry,
    changeItemStatus:changeItemStatus,
    getUserItem:getUserItem,
    getUserItems:getUserItems
    
}




