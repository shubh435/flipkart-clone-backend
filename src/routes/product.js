const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const {
  createProducts,
  getProductsBySlug,
  getProductDetailsById,
} = require("../controllers/product");
const router = express.Router();
const multer = require("multer");
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
router.get("/products/:slug", getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);
// router.get("/product/getCategory", getCategories);
module.exports = router;
