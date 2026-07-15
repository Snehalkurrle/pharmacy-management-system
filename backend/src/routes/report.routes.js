const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    getRevenueReport,
    getLowStockProducts,
    getExpiringProducts
} = require("../controllers/report.controller");

// Revenue
router.get(
    "/revenue",
    authMiddleware,
    getRevenueReport
);

// Low Stock
router.get(
    "/low-stock",
    authMiddleware,
    getLowStockProducts
);

// Expiring Medicines
router.get(
    "/expiring",
    authMiddleware,
    getExpiringProducts
);

module.exports = router;