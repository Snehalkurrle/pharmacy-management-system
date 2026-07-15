const Purchase = require("../models/purchase.model");
const Product = require("../models/product.model");

// Create Purchase
const createPurchase = async (purchaseData) => {

    // Calculate Total Amount
    purchaseData.totalAmount =
        purchaseData.quantity * purchaseData.purchasePrice;

    // Save Purchase
    const purchase = await Purchase.create(purchaseData);

    // Update Product Stock
    await Product.findByIdAndUpdate(
        purchaseData.product,
        {
            $inc: {
                quantity: purchaseData.quantity
            }
        }
    );

    return purchase;

};

// Get All Purchases
const getAllPurchases = async () => {

    return await Purchase.find()
        .populate("supplier", "name companyName")
        .populate("product", "name manufacturer")
        .sort({
            createdAt: -1
        });

};

// Get Purchase By ID
const getPurchaseById = async (id) => {

    return await Purchase.findById(id)
        .populate("supplier", "name companyName")
        .populate("product", "name manufacturer");

};

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById
};