
var item= require('./model/item.js');

bookDetails =[]


bookDetails.push(item.item(10001, "Anne Frank", "Non-Fiction","Biography book of Anne Frank",4, "anne-frank.jpg"));

bookDetails.push(item.item(10002, "A Night To Remember", "Non-Fiction","Book that depicts the sinking of the RMS Titanic on 15 April 1912",4, "a-night-to-remember.jpg"));

bookDetails.push(item.item(10003, "STEVE JOBS", "Non-Fiction","Biography book of Steve Jobs",4, "steve-jobs.jpg"));

bookDetails.push(item.item(10004, "MARTIN LUTHER KING JR.", "Non-Fiction","Biography book of Martin Luther King Jr.",4, "martin-luther.jpg"));

bookDetails.push(item.item(10005, "The Sea Inside", "Non-Fiction","It is based on the real-life story of Ramón Sampedro (played by Javier Bardem), who was left quadriplegic after a diving accident, and his 28-year campaign in support of euthanasia and the right to end his life.",4, "the-sea-inside.jpg"));

bookDetails.push(item.item(20001, "HARRY POTTER", "Fiction","Harry Potter is a series of fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. ",3, "harry-potter.jpg"));

bookDetails.push(item.item(20002, "GOOSEBUMPS", "Fiction","Goosebumps is a series of children's horror fiction novels by American author R. L. Stine, published by Scholastic Publishing. The stories follow child characters, who find themselves in scary situations, usually involving monsters and other supernatural elements. ",4, "goose-bumps.jpg"));

bookDetails.push(item.item(20003, "SYDNEY SHELDON: MEMORIES OF MIDNIGHT", "Fiction","Memories of Midnight,sometimes known as The Other Side of Midnight, is a 1990 novel by Sidney Sheldon. It is a sequel to Sheldon's 1973 bestseller The Other Side of Midnight.",3, "midnight.jpg"));

bookDetails.push(item.item(20004, "SYDNEY SHELDON: MORNING, NOON AND NIGHT", "Fiction","It is a book by Sydney Sheldon base on thriller and suspense",4, "morning-noon-night.jpg"));

bookDetails.push(item.item(20005, "SYDNEY SHELDON: IF TOMORROW COMES", "Fiction","It is a book by Sydney Sheldon base on thriller and suspense",4, "if-tomorrow-comes.jpg"));



function getItems()
{
	return bookDetails;
}

function getItem(itemID){
    books = [];
    for(var i = 0; i < bookDetails.length; i++){
        if(itemID == bookDetails[i].itemCode){
            books.push(bookDetails[i]);
        }
    }
    if(books.length > 0){
        return books[0];
    } else {
        return undefined;
    }
};




module.exports = {
    getItem: getItem,
    getItems: getItems,
}