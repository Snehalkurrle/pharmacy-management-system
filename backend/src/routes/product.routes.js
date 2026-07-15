const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const validateProduct = require("../validators/product.validator");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getExpiryAlertProducts
} = require("../controllers/product.controller");

// Get All Products
router.get("/", authMiddleware, getAllProducts);

// Low Stock Products
router.get(
    "/low-stock",
    authMiddleware,
    getLowStockProducts
);

// Expiry Alert Products
router.get(
    "/expiry-alert",
    authMiddleware,
    getExpiryAlertProducts
);

// Get Product By ID
router.get("/:id", authMiddleware, getProductById);

// Create Product (Admin Only)
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validateProduct,
    createProduct
);

// Update Product (Admin Only)
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    validateProduct,
    updateProduct
);

// Delete Product (Admin Only)
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteProduct
);

module.exports = router;