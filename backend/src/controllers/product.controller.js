const productService = require("../services/product.service");

// Get All Products
const getAllProducts = async (req, res) => {

    try {

        const {
            search = "",
            category = "",
            page = 1,
            limit = 10
        } = req.query;

        const result = await productService.getAllProducts(
            search,
            category,
            Number(page),
            Number(limit)
        );

        res.status(200).json({
            success: true,
            totalProducts: result.totalProducts,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            data: result.products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Get Product By ID
const getProductById = async (req, res) => {

    try {

        const product = await productService.getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Create Product
const createProduct = async (req, res) => {

    try {

        const product = await productService.createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Update Product
const updateProduct = async (req, res) => {

    try {

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const product = await productService.deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};