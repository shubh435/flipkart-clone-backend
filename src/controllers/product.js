const slugify = require("slugify");
const Category = require("../models/product");
const shortId =require('shortid')
exports.createProducts = (req, res) => {
//   const productsObj = {
//     name: req.body.name,
//     slug: slugify(req.body.name),
//   };
//   const cat = new products(productsObj);
//   cat.save((error, products) => {
//     if (error) res.status(400).json({ error });
//     if (products) {
//       return res.status(201).json({ products });
//     }
//   });
return res.status(201).json({ file :req.file,body:req.body})
};

