const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const validateInvoice = require("../validators/invoice.validator");

const {
    generateInvoice,
    getAllInvoices,
    getInvoiceById,
    downloadInvoicePDF
} = require("../controllers/invoice.controller");

// ==============================
// Get All Invoices
// ==============================
router.get(
    "/",
    authMiddleware,
    getAllInvoices
);

// ==============================
// Download Invoice PDF
// IMPORTANT: Keep this route BEFORE "/:id"
// ==============================
router.get(
    "/:id/pdf",
    authMiddleware,
    downloadInvoicePDF
);

// ==============================
// Get Invoice By ID
// ==============================
router.get(
    "/:id",
    authMiddleware,
    getInvoiceById
);

// ==============================
// Generate Invoice (Admin Only)
// ==============================
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    validateInvoice,
    generateInvoice
);

module.exports = router;