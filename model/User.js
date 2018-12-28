var user= function(firstName, lastName, emailAddress, address1, address2, city, state, postalCode, country,username, password)
{
   
    this.firstName=firstName;
    this.lastName=lastName;
    this.emailAddress=emailAddress;
    this.address1=address1;
    this.address2=address2;
    this.city=city;
    this.state=state;
    this.postalCode=postalCode;
    this.country=country;
    this.username=username;
    this.password=password;
    
    
    var User={
        username:this.username,
        password:this.password,
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
    return User;
}

module.exports.user=user;