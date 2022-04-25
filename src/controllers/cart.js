const Cart = require("../models/cart");
exports.addItemCart = (req, res) => {
  res.status(200).json({ msg: "cart" });
};
