const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No product found in DB",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenion = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with Images",
      });
    }
    //destructure fields
    let { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }
    let product = new Product(fields);

    //handle files here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big !",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to save product in DB",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete ${deletedProduct}`,
      });
    }
    res.json({
      message: `${deletedProduct} deleted successfully!`,
    });
  });
};

//update controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenion = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with Images",
      });
    }
    //updation code
    let product = req.product;
    product = _.extend(product, fields);

    //handle files here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is too big !",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //save to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update product!",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No products found!",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "No Category found!",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperation, {}, (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed!",
      });
    }
    next();
  });
};
