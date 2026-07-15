const invoicePdfService = require("../services/invoicePdf.service");
const invoiceService = require("../services/invoice.service");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess, sendError } = require("../utils/response");

// Generate Invoice
const generateInvoice = asyncHandler(async (req, res) => {

    const invoice = await invoiceService.generateInvoice(req.body);

    return sendSuccess(
        res,
        invoice,
        "Invoice generated successfully",
        201
    );

});

// Get All Invoices
const getAllInvoices = asyncHandler(async (req, res) => {

    const invoices = await invoiceService.getAllInvoices();

    return sendSuccess(
        res,
        invoices,
        "Invoices fetched successfully"
    );

});

// Get Invoice By ID
const getInvoiceById = asyncHandler(async (req, res) => {

    const invoice = await invoiceService.getInvoiceById(req.params.id);

    if (!invoice) {
        return sendError(
            res,
            404,
            "Invoice not found"
        );
    }

    return sendSuccess(
        res,
        invoice,
        "Invoice fetched successfully"
    );

});
// Download Invoice PDF
const downloadInvoicePDF = asyncHandler(async (req, res) => {

    const invoice = await invoiceService.getInvoiceById(req.params.id);

    invoicePdfService.generateInvoicePDF(invoice, res);

});

module.exports = {
    generateInvoice,
    getAllInvoices,
    getInvoiceById,
    downloadInvoicePDF
};