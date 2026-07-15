const Invoice = require("../models/invoice.model");
const Sale = require("../models/sale.model");

const NotFoundError = require("../errors/NotFoundError");

// Generate Invoice
const generateInvoice = async (invoiceData) => {

    // Check Sale
    const sale = await Sale.findById(invoiceData.sale);

    if (!sale) {
        throw new NotFoundError("Sale not found.");
    }

    // Copy customer name from Sale if not provided
    invoiceData.customerName =
        invoiceData.customerName || sale.customerName;

    // Calculate Amounts
    invoiceData.subtotal = sale.totalAmount;

    invoiceData.discount =
        invoiceData.discount || 0;

    invoiceData.tax =
        invoiceData.tax || 0;

    invoiceData.grandTotal =
        invoiceData.subtotal
        - invoiceData.discount
        + invoiceData.tax;

    // Auto Invoice Number
    const count = await Invoice.countDocuments();

    invoiceData.invoiceNumber =
        `INV-${1001 + count}`;

    const invoice = await Invoice.create(invoiceData);

    return invoice;

};

// Get All Invoices
const getAllInvoices = async () => {

    return await Invoice.find()
        .populate({
            path: "sale",
            populate: {
                path: "product",
                select: "name manufacturer"
            }
        })
        .sort({
            createdAt: -1
        });

};

// Get Invoice By ID
const getInvoiceById = async (id) => {

    const invoice = await Invoice.findById(id)
        .populate({
            path: "sale",
            populate: {
                path: "product",
                select: "name manufacturer"
            }
        });

    if (!invoice) {
        throw new NotFoundError("Invoice not found.");
    }

    return invoice;

};

module.exports = {
    generateInvoice,
    getAllInvoices,
    getInvoiceById
};