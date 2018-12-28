var item= function(itemCode, itemName, catalogCategory, description, rating, imageUrl)
{

	 this.itemCode =itemCode;
	 this.itemName = itemName;
	 this.catalogCategory = catalogCategory;
	 this.description = description;
	 this.rating = rating;
	 this.imageUrl = imageUrl;


	var Item ={

		itemCode: this.itemCode,
		itemName: this.itemName,
		catalogCategory:this.catalogCategory,
		description: this.description,
		rating: this.rating,
		imageUrl: this.imageUrl
	}

return Item;
}

module.exports.item=item;



