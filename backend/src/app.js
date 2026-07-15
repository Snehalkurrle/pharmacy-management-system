const express = require("express");

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const supplierRoutes = require("./routes/supplier.routes");
const purchaseRoutes = require("./routes/purchase.routes");
const saleRoutes = require("./routes/sale.routes");
const invoiceRoutes = require("./routes/invoice.routes");
const reportRoutes = require("./routes/report.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// ============================
// Middlewares
// ============================
app.use(express.json());

// ============================
// API Routes
// ============================
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/reports", reportRoutes);

// ============================
// Home Route
// ============================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Pharmacy Management System API 🚀"
    });
});

// ============================
// Global Error Handler
// ============================
app.use(errorHandler);

module.exports = app;