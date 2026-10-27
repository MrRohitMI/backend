const Product = require("../model/Produts");
const { getUser } = require("../services/auth");

async function createProduct(req,res){
    await Product.create({createdBy:req.user._id,...req.body})
    return res.redirect("/create-product")
}
async function getProducts(req,res){
    const products = await Product.find();
    const count = products.length
    const uid = req.cookies.uid;
    const user = getUser(uid);
    res.render("products",{products,count,user})
}
async function updateProduct(req, res) {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/product");
}
async function getProduct(req, res) {
    const product = await Product.findById(req.params.id);
    res.render("edit-product", { product });
}
async function deleteProduct(req, res) {
    const { productId } = req.body;
    console.log(productId,"hello")
    await Product.findByIdAndDelete(productId);
    return res.redirect("/product");
}
module.exports = {createProduct,getProducts,updateProduct,deleteProduct,getProduct}