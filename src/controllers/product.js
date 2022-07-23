const slugify = require("slugify");
const Product = require("../models/product");
const shortId = require("shortid");
const Category = require("../models/category");
const { response } = require("express");
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

exports.getProductsBySlug = (req, res) => {
  let { slug } = req.params;

  Category.findOne({ slug: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) res.status(400).json({ error });
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) res.status(400).json({ error });
          if (products.length > 0) {
            res.status(200).json({
              products,
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under25k: products.filter(
                  (product) => product.price > 20000 && product.price <= 25000
                ),
                under30k: products.filter(
                  (product) => product.price > 25000 && product.price <= 30000
                ),
                greaterthan30k: products.filter(
                  (product) => product.price > 30000
                ),
              },
            });
          } else {
            response.status(200).json({ products });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  let { productId } = req.params;
  if (productId) {
    Product.find({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Parameter required" });
  }
};
