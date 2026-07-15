const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const validateSale = require("../validators/sale.validator");

const {
    createSale,
    getAllSales,
    getSaleById
} = require("../controllers/sale.controller");

// Get All Sales
router.get(
    "/",
    authMiddleware,
    getAllSales
);

// Get Sale By ID
router.get(
    "/:id",
    authMiddleware,
    getSaleById
);

// Create Sale (Admin Only)
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validateSale,
    createSale
);

module.exports = router;