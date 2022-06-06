const slugify = require("slugify");
const Category = require("../models/category");
const shortid = require("shortid");
function createCategories(categories, parentId = null) {
  const categoriesList = [];
  let category;
  if (parentId === null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoriesList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoriesList;
}
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${shortid.generate(4)}_${slugify(req.body.name)}`,
  };
  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) res.status(400).json({ error });
    if (category) {
      return res.status(201).json({ category });
    }
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const catgoryList = createCategories(categories);
      res.status(200).json({ catgoryList });
    }
  });
};
exports.editCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  let updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }

    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  let deletedCategoriesArray = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({ _id: ids[i]._id });
    deletedCategoriesArray.push(deleteCategory);
  }

  if (deletedCategoriesArray.length === ids.length) {
    res.status(200).json({ message: "Categories deleted" });
  } else {
    res.status(500).json({ message: "something is missed" });
  }
};
