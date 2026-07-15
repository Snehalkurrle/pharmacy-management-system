const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts
} = require("../controllers/product.controller");

// Everyone who is logged in can view products
router.get("/", authMiddleware, getAllProducts);

// Low Stock Products
router.get(
    "/low-stock",
    authMiddleware,
    getLowStockProducts
);

// Get Product By ID
router.get("/:id", authMiddleware, getProductById);

// Only Admin can create products
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    createProduct
);

// Only Admin can update products
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    updateProduct
);

// Only Admin can delete products
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteProduct
);

module.exports = router;