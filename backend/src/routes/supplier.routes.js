const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const validateSupplier = require("../validators/supplier.validator");

const {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplier.controller");

// Get All Suppliers
router.get(
    "/",
    authMiddleware,
    getAllSuppliers
);

// Get Supplier By ID
router.get(
    "/:id",
    authMiddleware,
    getSupplierById
);

// Create Supplier (Admin Only)
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validateSupplier,
    createSupplier
);

// Update Supplier (Admin Only)
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    validateSupplier,
    updateSupplier
);

// Delete Supplier (Admin Only)
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("admin"),
    deleteSupplier
);

module.exports = router;