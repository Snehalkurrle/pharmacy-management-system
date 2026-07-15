const reportService = require("../services/report.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/response");

// Revenue
const getRevenueReport = asyncHandler(async (req, res) => {

    const report = await reportService.getRevenueReport();

    return sendSuccess(
        res,
        report,
        "Revenue report fetched successfully"
    );

});

// Low Stock
const getLowStockProducts = asyncHandler(async (req, res) => {

    const products =
        await reportService.getLowStockProducts();

    return sendSuccess(
        res,
        products,
        "Low stock products fetched successfully"
    );

});

// Expiring Medicines
const getExpiringProducts = asyncHandler(async (req, res) => {

    const products =
        await reportService.getExpiringProducts();

    return sendSuccess(
        res,
        products,
        "Expiring products fetched successfully"
    );

});

module.exports = {
    getRevenueReport,
    getLowStockProducts,
    getExpiringProducts
};