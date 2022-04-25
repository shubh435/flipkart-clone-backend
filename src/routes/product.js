const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const {  createProducts } = require("../controllers/product");
const multer =require('multer')
const upload =multer({dest:'upload/'})
const router = express.Router();
const Product = require("../models/product");
router.post("/product/create", requireSignin, adminMiddleWare, upload.single('productImage'),createProducts);
// router.get("/product/getCategory", getCategories);
module.exports = router;
