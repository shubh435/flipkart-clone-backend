const express = require("express");
const { requireSignin, adminMiddleWare } = require("../common-middleware");
const { addCategory, getCategories } = require("../controllers/category");
const router = express.Router();
router.post("/category/create", requireSignin, adminMiddleWare, addCategory);
router.get("/category/getCategory", getCategories);
module.exports = router;
