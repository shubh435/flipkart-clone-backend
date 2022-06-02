const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();

router.post("/admin/initialData", initialData);

module.exports = router;