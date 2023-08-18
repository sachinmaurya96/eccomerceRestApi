const mongoose = require("mongoose")
const {Schema} = mongoose

const productSchema = new Schema({
    
})

exports.Products = mongoose.model("Products", productSchema)