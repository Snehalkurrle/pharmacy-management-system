const productService = require("../services/product.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// Get All Products
const getAllProducts = asyncHandler(async (req, res) => {

    const {
        search = "",
        category = "",
        sort = "createdAt",
        page = 1,
        limit = 10
    } = req.query;

    const result = await productService.getAllProducts(
        search,
        category,
        sort,
        Number(page),
        Number(limit)
    );

    return sendSuccess(
        res,
        {
            products: result.products,
            totalProducts: result.totalProducts,
            currentPage: result.currentPage,
            totalPages: result.totalPages
        },
        "Products fetched successfully"
    );

});

// Get Product By ID
const getProductById = asyncHandler(async (req, res) => {

    const product = await productService.getProductById(req.params.id);

    if (!product) {
        return sendError(
            res,
            404,
            "Product not found"
        );
    }

    return sendSuccess(
        res,
        product,
        "Product fetched successfully"
    );

});

// Create Product
const createProduct = asyncHandler(async (req, res) => {

    const product = await productService.createProduct(req.body);

    return sendSuccess(
        res,
        product,
        "Product created successfully",
        201
    );

});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {

    const product = await productService.updateProduct(
        req.params.id,
        req.body
    );

    if (!product) {
        return sendError(
            res,
            404,
            "Product not found"
        );
    }

    return sendSuccess(
        res,
        product,
        "Product updated successfully"
    );

});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
        return sendError(
            res,
            404,
            "Product not found"
        );
    }

    return sendSuccess(
        res,
        null,
        "Product deleted successfully"
    );

});

// Low Stock Products
const getLowStockProducts = asyncHandler(async (req, res) => {

    const products = await productService.getLowStockProducts();

    return sendSuccess(
        res,
        {
            count: products.length,
            products
        },
        "Low stock products fetched successfully"
    );

});

// Expiry Alert Products
const getExpiryAlertProducts = asyncHandler(async (req, res) => {

    const products = await productService.getExpiryAlertProducts();

    return sendSuccess(
        res,
        {
            count: products.length,
            products
        },
        "Expiry alert products fetched successfully"
    );

});

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getExpiryAlertProducts
};