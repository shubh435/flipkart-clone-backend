const slugify = require("slugify");
const Product = require("../models/product");
const shortId = require("shortid");
exports.createProducts = (req, res) => {
  const { name, price, description, offer, quantity, category, createdBy } =
    req.body;
  let productPicture = [];
  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const productsObj = {
    name: name,
    slug: slugify(name),
    price,
    description,
    productPicture,
    category,
    quantity,
    createdBy: req.user._id,
  };
  const product = new Product(productsObj);
  product.save((error, products) => {
    if (error) res.status(400).json({ error });
    if (products) {
      return res.status(201).json({ product });
    }
  });
};
