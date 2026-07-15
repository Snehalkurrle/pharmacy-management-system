const Sale = require("../models/sale.model");
const Product = require("../models/product.model");

// Create Sale
const createSale = async (saleData) => {

    // Find Product
    const product = await Product.findById(saleData.product);

    if (!product) {
        throw new Error("Product not found.");
    }

    // Check Stock
    if (product.quantity < saleData.quantity) {
        throw new Error("Insufficient stock available.");
    }

    // Calculate Total Amount
    saleData.totalAmount =
        saleData.quantity * saleData.sellingPrice;

    // Save Sale
    const sale = await Sale.create(saleData);

    // Reduce Product Stock
    await Product.findByIdAndUpdate(
        saleData.product,
        {
            $inc: {
                quantity: -saleData.quantity
            }
        }
    );

    return sale;

};

// Get All Sales
const getAllSales = async () => {

    return await Sale.find()
        .populate("product", "name manufacturer")
        .sort({
            createdAt: -1
        });

};

// Get Sale By ID
const getSaleById = async (id) => {

    return await Sale.findById(id)
        .populate("product", "name manufacturer");

};

module.exports = {
    createSale,
    getAllSales,
    getSaleById
};