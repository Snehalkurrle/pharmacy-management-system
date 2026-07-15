const Product = require("../models/product.model");

// Get All Products with Search, Category, Sorting & Pagination
const getAllProducts = async (
    search = "",
    category = "",
    sort = "createdAt",
    page = 1,
    limit = 10
) => {

    const query = {};

    if (search) {
        query.name = {
            $regex: search,
            $options: "i"
        };
    }

    if (category) {
        query.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    const totalProducts = await Product.countDocuments(query);

    return {
        products,
        totalProducts,
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit)
    };
};

// Get Product By ID
const getProductById = async (id) => {
    return await Product.findById(id);
};

// Create Product
const createProduct = async (productData) => {
    return await Product.create(productData);
};

// Update Product
const updateProduct = async (id, productData) => {
    return await Product.findByIdAndUpdate(
        id,
        productData,
        {
            new: true,
            runValidators: true
        }
    );
};

// Delete Product
const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

// Low Stock Products
const getLowStockProducts = async () => {

    return await Product.find({
        quantity: {
            $lte: 10
        }
    }).sort({
        quantity: 1
    });

};

// Expiry Alert
const getExpiryAlertProducts = async () => {

    const today = new Date();

    const next30Days = new Date();

    next30Days.setDate(today.getDate() + 30);

    return await Product.find({
        expiryDate: {
            $gte: today,
            $lte: next30Days
        }
    }).sort({
        expiryDate: 1
    });

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getExpiryAlertProducts
};