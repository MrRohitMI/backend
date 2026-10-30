const express = require("express")
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const {createProduct,getProducts,updateProduct,deleteProduct,getProduct} = require("../controller/products")
router.route("/").post(checkAuth,createProduct).get(getProducts)
router.get("/edit/:id", checkAuth,getProduct);
router.post("/edit/:id", checkAuth,updateProduct);
router.post("/delete",checkAuth, deleteProduct);
module.exports = router