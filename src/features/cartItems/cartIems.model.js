export default class CartItemModel {
    constructor(productID, userID, quantity) {
        this.productID = productID
        this.userID = userID
        this.quantity = quantity
    }

}

var cartItems = [
    // new CartItemModel(1,2,1);
     new CartItemModel(
        1,
        2,
        4
    ),
]