const saleService = require("../services/sale.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// Create Sale
const createSale = asyncHandler(async (req, res) => {

    const sale = await saleService.createSale(req.body);

    return sendSuccess(
        res,
        sale,
        "Sale created successfully",
        201
    );

});

// Get All Sales
const getAllSales = asyncHandler(async (req, res) => {

    const sales = await saleService.getAllSales();

    return sendSuccess(
        res,
        sales,
        "Sales fetched successfully"
    );

});

// Get Sale By ID
const getSaleById = asyncHandler(async (req, res) => {

    const sale = await saleService.getSaleById(req.params.id);

    if (!sale) {
        return sendError(
            res,
            404,
            "Sale not found"
        );
    }

    return sendSuccess(
        res,
        sale,
        "Sale fetched successfully"
    );

});

module.exports = {
    createSale,
    getAllSales,
    getSaleById
};