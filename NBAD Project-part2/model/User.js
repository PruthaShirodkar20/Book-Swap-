var user= function(userID, firstName, lastName, emailAddress, address1, address2, city, state, postalCode, country)
{
    this.userID=userID;
    this.firstName=firstName;
    this.lastName=lastName;
    this.emailAddress=emailAddress;
    this.address1=address1;
    this.address2=address2;
    this.city=city;
    this.state=state;
    this.postalCode=postalCode;
    this.country=country;
    
    
    var User={
        
        userID:this.userID,
        firstName:this.firstName,
        lastName:this.lastName,
        emailAddress:this.emailAddress,
        address1:this.address1,
        address2:this.address2,
        city:this.city,
        state:this.state,
        postalCode:this.postalCode,
        country:this.country       
        
    }
    
    console.log(User);
    return User;
    
}

module.exports.user=user;