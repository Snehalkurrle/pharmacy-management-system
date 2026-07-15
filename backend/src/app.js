const express = require("express");

const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const supplierRoutes = require("./routes/supplier.routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/suppliers", supplierRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Pharmacy Management System API 🚀"
    });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;