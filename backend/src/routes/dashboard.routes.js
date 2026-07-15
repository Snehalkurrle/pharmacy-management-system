const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
    getInventoryStatistics
} = require("../controllers/dashboard.controller");

// Inventory Dashboard
router.get(
    "/inventory",
    authMiddleware,
    getInventoryStatistics
);

module.exports = router;