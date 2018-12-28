db.item.drop();
db.item.insert({itemCode:10001 ,
        itemName:"Anne Frank" ,
        catalogCategory:"Non-Fiction",
        description:"Biography book of Anne Frank" ,
        rating:4 
   });
db.item.insert({
    itemCode:10002 ,
        itemName:"A Night To Remember" ,
        catalogCategory:"Non-Fiction",
        description:"Book that depicts the sinking of the RMS Titanic on 15 April 1912" ,
        rating:4 ,
        imageUrl:"a-night-to-remember.jpg"
});
db.item.insert({itemCode:10003 ,
        itemName:"STEVE JOBS" ,
        catalogCategory:"Non-Fiction",
        description:"Biography book of Steve Jobs" ,
        rating:4 ,
        imageUrl:"steve-jobs.jpg"});
db.item.insert({itemCode:10004 ,
        itemName:"MARTIN LUTHER KING JR." ,
        catalogCategory:"Non-Fiction",
        description:"Biography book of Martin Luther King Jr." ,
        rating:4 ,
        imageUrl:"martin-luther.jpg"});
db.item.insert({itemCode:10005 ,
        itemName:"The Sea Inside" ,
        catalogCategory:"Non-Fiction",
        description:"It is based on the real-life story of Ramón Sampedro (played by Javier Bardem), who was left quadriplegic after a diving accident, and his 28-year campaign in support of euthanasia and the right to end his life." ,
        rating:4 ,
        imageUrl:"the-sea-inside.jpg"});
db.item.insert({itemCode:20001,
        itemName:"HARRY POTTER",
        catalogCategory: "Fiction",
        description:"Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",
        rating:3 ,
        imageUrl:"harry-potter.jpg"});
db.item.insert({itemCode:20002,
        itemName:"GOOSEBUMPS",
        catalogCategory: "Fiction",
        description:"Goosebumps is a series of children's horror fiction novels by American author R. L. Stine, published by Scholastic Publishing. The stories follow child characters, who find themselves in scary situations, usually involving monsters and other supernatural elements. ",
        rating:4 ,
        imageUrl:"goose-bumps.jpg"}
    );
db.item.insert({itemCode:20003,
        itemName:"SYDNEY SHELDON: MEMORIES OF MIDNIGHT",
        catalogCategory: "Fiction",
        description:"Memories of Midnight,sometimes known as The Other Side of Midnight, is a 1990 novel by Sidney Sheldon. It is a sequel to Sheldon's 1973 bestseller The Other Side of Midnight.",
        rating:3 ,
        imageUrl:"midnight.jpg"});
db.item.insert( {itemCode:20004,
        itemName:"SYDNEY SHELDON: MORNING, NOON AND NIGHT",
        catalogCategory: "Fiction",
        description:"It is a book by Sydney Sheldon base on thriller and suspense",
        rating:4 ,
        imageUrl:"morning-noon-night.jpg"}
    );
db.item.insert({itemCode:20005,
        itemName:"SYDNEY SHELDON: IF TOMORROW COMES",
        catalogCategory: "Fiction",
        description:"It is a book by Sydney Sheldon base on thriller and suspense",
        rating:4 ,
        imageUrl:"if-tomorrow-comes.jpg"});

db.User.drop();

db.User.insert({
        userID: 1,
        username:"PruthaShirodkar20",
        password:"prutha20",
        firstName:"Prutha",
        lastName:"Shirodkar",
        emailAddress:"pruth@gmail.com",
        address1:"10004 UTN",
        address2:"",
        city:"Charlotte",
        state:"NC",
        postalCode:"28262",
        country:"United States"
});

db.User.insert({userID:2,
        username:"YashShirodkar10",        
        password:"yash10",
        firstName:"Yash",
        lastName:"Shirodkar",
        emailAddress:"yash@gmail.com",
        address1:"10005 UTN",
        address2:"",
        city:"Charlotte",
        state:"NC",
        postalCode:"28262",
        country:"United States"
});

db.User.insert({userID:3,
        username:"NikitaNalawade10",        
        password:"niki10",
        firstName:"Nikita",
        lastName:"Nalawade",
        emailAddress:"niki@gmail.com",
        address1:"10004 UT",
        address2:"",
        city:"Charlotte",
        state:"NC",
        postalCode:"28262",
        country:"United States"
});

db.User.insert({userID:4,
        username:"ArjunYeravdekar13",        
        password:"arjun13",
        firstName:"Arjun",
        lastName:"Yeravdekar",
        emailAddress:"arjun@gmail.com",
        address1:"9823 UT",
        address2:"",
        city:"New York",
        state:"NY",
        postalCode:"10001",
        country:"United States"
});

db.User.insert(
    {userID:5,
        username:"ParthJain25",        
        password:"parth25",
        firstName:"Parth ",
        lastName:"Jain",
        emailAddress:"pkunster@gmail.com",
        address1:"3369 Florence",
        address2:"",
        city:"San Jose",
        state:"CA",
        postalCode:"90224",
        country:"United States"
});

db.User.insert({userID:6,
        username:"AditiKonde24",        
        password:"aditi24",
        firstName:"Aditi",
        lastName:"Konde",
        emailAddress:"aditi21@gmail.com",
        address1:"3365 UTN",
        address2:"",
        city:"Charlotte",
        state:"NC",
        postalCode:"28262",
        country:"United States"
});


db.UserItem.drop();
db.UserItem.insert(   
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
    status:"Available",
    swapitem:undefined,
    swapItemRating:undefined,
    swapperRating:undefined
   });

db.UserItem.insert({
    item:{
        itemCode:10002, 
        itemName:"A Night To Remember",
        catalogCategory:"Non-Fiction",
        description:"Book that depicts the sinking of the RMS Titanic on 15 April 1912",
        rating:4,
        imageUrl:"a-night-to-remember.jpg"
    },
    rating:3,
    status:"Available",
    swapitem:undefined,
    swapItemRating:undefined,
    swapperRating:undefined
   });
db.UserItem.insert({
        item:{
        itemCode:10004 ,
        itemName:"MARTIN LUTHER KING JR." ,
        catalogCategory:"Non-Fiction",
        description:"Biography book of Martin Luther King Jr." ,
        rating:4 ,
        imageUrl:"martin-luther.jpg"
    },
    rating:3,
    status:"Available",
    swapitem:undefined,
    swapItemRating:undefined,
    swapperRating:undefined
});

db.UserItem.insert({
        item:{
        itemCode:10005, 
        itemName:"The Sea Inside",
        catalogCategory:"Non-Fiction",
        description:"It is based on the real-life story of Ramón Sampedro (played by Javier Bardem), who was left quadriplegic after a diving accident, and his 28-year campaign in support of euthanasia and the right to end his life.",
        rating:4,
        imageUrl:"the-sea-inside.jpg"
    },
    rating:3,
    status:"Available",
    swapitem:undefined,
    swapItemRating:undefined,
    swapperRating:undefined
});

db.UserItem.insert({
        item:{
        itemCode:20002,
        itemName:"GOOSEBUMPS",
        catalogCategory: "Fiction",
        description:"Goosebumps is a series of children's horror fiction novels by American author R. L. Stine, published by Scholastic Publishing. The stories follow child characters, who find themselves in scary situations, usually involving monsters and other supernatural elements. ",
        rating:4 ,
        imageUrl:"goose-bumps.jpg"
    },
    rating:3,
    status:"Available",
    swapitem:undefined,
    swapItemRating:undefined,
    swapperRating:undefined
});












