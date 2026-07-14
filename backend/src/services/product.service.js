const Product = require("../models/product.model");

// Get All Products with Search, Category & Pagination
const getAllProducts = async (
    search = "",
    category = "",
    page = 1,
    limit = 10
) => {

    const query = {};

    // Search by Name
    if (search) {
        query.name = {
            $regex: search,
            $options: "i"
        };
    }

    // Filter by Category
    if (category) {
        query.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
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

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};