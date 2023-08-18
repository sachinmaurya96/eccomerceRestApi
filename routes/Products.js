const express = require("express");
const { getAllProducts, addProducts } = require("../controlers/products");
const router = express.Router();

router
.get("/",getAllProducts)
.post("/",addProducts)


exports.router = router