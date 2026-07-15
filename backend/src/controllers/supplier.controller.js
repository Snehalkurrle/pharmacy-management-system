const supplierService = require("../services/supplier.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// Create Supplier
const createSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.createSupplier(req.body);

    return sendSuccess(
        res,
        supplier,
        "Supplier created successfully",
        201
    );

});

// Get All Suppliers
const getAllSuppliers = asyncHandler(async (req, res) => {

    const {
        search = "",
        page = 1,
        limit = 10
    } = req.query;

    const result = await supplierService.getAllSuppliers(
        search,
        Number(page),
        Number(limit)
    );

    return sendSuccess(
        res,
        {
            suppliers: result.suppliers,
            totalSuppliers: result.totalSuppliers,
            currentPage: result.currentPage,
            totalPages: result.totalPages
        },
        "Suppliers fetched successfully"
    );

});

// Get Supplier By ID
const getSupplierById = asyncHandler(async (req, res) => {

    const supplier = await supplierService.getSupplierById(req.params.id);

    if (!supplier) {
        return sendError(
            res,
            404,
            "Supplier not found"
        );
    }

    return sendSuccess(
        res,
        supplier,
        "Supplier fetched successfully"
    );

});

// Update Supplier
const updateSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.updateSupplier(
        req.params.id,
        req.body
    );

    if (!supplier) {
        return sendError(
            res,
            404,
            "Supplier not found"
        );
    }

    return sendSuccess(
        res,
        supplier,
        "Supplier updated successfully"
    );

});

// Delete Supplier
const deleteSupplier = asyncHandler(async (req, res) => {

    const supplier = await supplierService.deleteSupplier(req.params.id);

    if (!supplier) {
        return sendError(
            res,
            404,
            "Supplier not found"
        );
    }

    return sendSuccess(
        res,
        null,
        "Supplier deleted successfully"
    );

});

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};
