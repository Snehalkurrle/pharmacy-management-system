const Purchase = require("../models/purchase.model");
const Product = require("../models/product.model");
const Supplier = require("../models/supplier.model");

const NotFoundError = require("../errors/NotFoundError");

// Create Purchase
const createPurchase = async (purchaseData) => {

    // Check Supplier
    const supplier = await Supplier.findById(purchaseData.supplier);

    if (!supplier) {
        throw new NotFoundError("Supplier not found.");
    }

    // Check Product
    const product = await Product.findById(purchaseData.product);

    if (!product) {
        throw new NotFoundError("Product not found.");
    }

    // Calculate Total Amount
    purchaseData.totalAmount =
        purchaseData.quantity * purchaseData.purchasePrice;

    // Save Purchase
    const purchase = await Purchase.create(purchaseData);

    // Increase Product Stock
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

    const purchase = await Purchase.findById(id)
        .populate("supplier", "name companyName")
        .populate("product", "name manufacturer");

    if (!purchase) {
        throw new NotFoundError("Purchase not found.");
    }

    return purchase;
};

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById
};