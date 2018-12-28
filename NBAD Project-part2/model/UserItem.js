var UserItem= function (item, rating, status, swapItem, swapItemRating, swapperRating)
{
    this.item=item;
    this.rating=rating;
    this.status=status;
    this.swapItem=swapItem;
    this.swapItemRating=swapItemRating;
    this.swapperRating=swapperRating;
    
    var userItem
    {
        item:this.item,
        rating:this.rating,
        status:this.status,
        swapItem:this.swapItem,
        swapItemRating:this.swapItemRating,
        swapperRating:this.swapperRating        
    }
    
    return userItem;
}

module.exports.UserItem=UserItem;