const express = require("express");
const {
  upload,
  requireSignin,
  adminMiddleWare,
} = require("../../common-middleware");
const { createPage, getPage } = require("../../controllers/admin/page");
const router = express.Router();

router.post(
  "/page/create",
  requireSignin,
  adminMiddleWare,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);
router.get("/page/get", getPage);

module.exports = router;
