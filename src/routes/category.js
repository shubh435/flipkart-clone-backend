const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const {
  addCategory,
  getCategories,
  editCategories,
  deleteCategories,
} = require("../controllers/category");
const path = require("path");
const multer = require("multer");
const shortid = require("shortid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

const router = express.Router();
router.post(
  "/category/create",
  requireSignin,
  adminMiddleWare,
  upload.single("categoryImage"),
  addCategory
);
router.post("/category/edit", upload.array("categoryImage"), editCategories);
router.get("/category/getCategory", getCategories);
router.post("/category/delete", deleteCategories);

module.exports = router;
