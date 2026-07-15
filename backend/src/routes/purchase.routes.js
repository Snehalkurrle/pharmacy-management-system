const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const validatePurchase = require("../validators/purchase.validator");

const {
    createPurchase,
    getAllPurchases,
    getPurchaseById
} = require("../controllers/purchase.controller");

// Get All Purchases
router.get(
    "/",
    authMiddleware,
    getAllPurchases
);

// Get Purchase By ID
router.get(
    "/:id",
    authMiddleware,
    getPurchaseById
);

// Create Purchase (Admin Only)
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validatePurchase,
    createPurchase
);

module.exports = router;