const express = require("express");
const { requireSignin, adminMiddleWare } = require("../../common-middleware");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();

router.post("/admin/initialData", requireSignin, adminMiddleWare, initialData);

module.exports = router;
