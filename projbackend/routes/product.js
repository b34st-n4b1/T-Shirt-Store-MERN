const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");

//All fo Params
router.param("productId", getProductById);
router.param("userId", getUserById);

//All of Actual Routes
//Create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

//updateProduct
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//Product Listing
router.get("/products", getAllProducts);

//get unique categories
router.get("/product/categories", getAllUniqueCategories);


module.exports = router;
