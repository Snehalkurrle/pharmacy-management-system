const purchaseService = require("../services/purchase.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// Create Purchase
const createPurchase = asyncHandler(async (req, res) => {

    const purchase = await purchaseService.createPurchase(req.body);

    return sendSuccess(
        res,
        purchase,
        "Purchase created successfully",
        201
    );

});

// Get All Purchases
const getAllPurchases = asyncHandler(async (req, res) => {

    const purchases = await purchaseService.getAllPurchases();

    return sendSuccess(
        res,
        purchases,
        "Purchases fetched successfully"
    );

});

// Get Purchase By ID
const getPurchaseById = asyncHandler(async (req, res) => {

    const purchase = await purchaseService.getPurchaseById(req.params.id);

    if (!purchase) {
        return sendError(
            res,
            404,
            "Purchase not found"
        );
    }

    return sendSuccess(
        res,
        purchase,
        "Purchase fetched successfully"
    );

});

module.exports = {
    createPurchase,
    getAllPurchases,
    getPurchaseById
};