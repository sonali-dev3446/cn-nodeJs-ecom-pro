import UserModel from '../user/user.model.js';
export default class ProductModel {
  constructor(name, price, sizes, imageUrl, desc = null, category = null, id = null) {
        this.name = name;
        this.price = price;
        this.sizes = sizes;
        this.imageUrl = imageUrl;
        this.desc = desc;
        this.category = category;
        this._id = id;
    }

//  static search(name, minPrice, maxPrice, category) {
//     return products.filter(product => {

//         const matchName =
//             !name ||
//             product.name.toLowerCase().includes(name.toLowerCase());

//         const matchMin =
//             !minPrice ||
//             Number(product.price) >= Number(minPrice);

//         const matchMax =
//             !maxPrice ||
//             Number(product.price) <= Number(maxPrice);

//         const matchCategory =
//             !category ||
//             String(product.category).toLowerCase() === category.toLowerCase();

//         return matchName && matchMin && matchMax && matchCategory;
//     });
// }
 }

 var products = [
    new ProductModel(
        1,
        "Laptop",
        "HP Core i5 12th Gen Laptop",
        55,
        "https://via.placeholder.com/80",
        'category1',
        ['M', 'XL', 'S']

    ),

    new ProductModel(
        2,
        "Mobile",
        "Samsung Galaxy Smartphone",
        18999,
        "https://via.placeholder.com/80",
                'category2',
        ['M', 'XL', 'S']

    ),

    new ProductModel(
        3,
        "Headphones",
        "Noise Cancelling Wireless Headphones",
        2499,
        "https://via.placeholder.com/80",
                'category3',
        ['M', 'XL', 'S']

    ),

    new ProductModel(
        4,
        "Keyboard",
        "Mechanical RGB Keyboard",
        3499,
        "https://via.placeholder.com/80",
                'category4',
        ['M', 'XL', 'S']

    ),

    new ProductModel(
        5,
        "Mouse",
        "Wireless Gaming Mouse",
        1599,
        "https://via.placeholder.com/80",
                'category5',
        ['M', 'XL', 'S']

    )
];