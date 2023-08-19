const express = require("express");
const { getAllProducts, addProducts, getProductById, deleteProduct } = require("../controlers/products");
const router = express.Router();

router
.get("/",getAllProducts)
.get("/:id",getProductById)
.post("/",addProducts)
.delete("/:id",deleteProduct)


exports.router = router