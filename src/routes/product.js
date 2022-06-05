const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const { createProducts, getProductsBySlug } = require("../controllers/product");
const multer = require("multer");
const router = express.Router();
const shortId = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/product/create",
  requireSignin,
  adminMiddleWare,
  upload.array("productPicture"),
  createProducts
);
router.get("/product/:slug",  getProductsBySlug );
// router.get("/product/getCategory", getCategories);
module.exports = router;
