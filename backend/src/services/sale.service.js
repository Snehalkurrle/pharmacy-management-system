const Sale = require("../models/sale.model");
const Product = require("../models/product.model");

const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");

// Create Sale
const createSale = async (saleData) => {

    const product = await Product.findById(saleData.product);

    if (!product) {
        throw new NotFoundError("Product not found.");
    }

    if (product.quantity < saleData.quantity) {
        throw new BadRequestError("Insufficient stock available.");
    }

    saleData.totalAmount =
        saleData.quantity * saleData.sellingPrice;

    const sale = await Sale.create(saleData);

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

    const sale = await Sale.findById(id)
        .populate("product", "name manufacturer");

    if (!sale) {
        throw new NotFoundError("Sale not found.");
    }

    return sale;

};

module.exports = {
    createSale,
    getAllSales,
    getSaleById
};