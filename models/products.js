const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    id:Number,
    title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    price: { type: Number, min:[1, 'wrong min price'], max:[10000, 'wrong max price']},
    discountPercentage: { type: Number, min:[1, 'wrong min discount'], max:[99, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String, required: true},
    category: { type : String, required: true},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    colors:{ type : [Schema.Types.Mixed] },
    sizes:{ type : [Schema.Types.Mixed]},
    highlights:{ type : [String] },
    discountPrice: { type: Number},
    deleted: { type : Boolean, default: false},
})

exports.Product = mongoose.model("Product", productSchema);

// "id": 2,
// "title": "iPhone X",
// "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
// "price": 899,
// "discountPercentage": 17.94,
// "rating": 4.44,
// "stock": 34,
// "brand": "Apple",
// "category": "smartphones",
// "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
// "images": [
// "https://i.dummyjson.com/data/products/2/1.jpg",
// "https://i.dummyjson.com/data/products/2/2.jpg",
// "https://i.dummyjson.com/data/products/2/3.jpg",
// "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
// ]
