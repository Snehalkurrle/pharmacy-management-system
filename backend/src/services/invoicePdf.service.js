const PDFDocument = require("pdfkit");

const generateInvoicePDF = (invoice, res) => {

    const doc = new PDFDocument({
        margin: 50
    });

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${invoice.invoiceNumber}.pdf`
    );

    doc.pipe(res);

    // Title
    doc
        .fontSize(22)
        .text("PHARMACY MANAGEMENT SYSTEM", {
            align: "center"
        });

    doc.moveDown();

    doc.fontSize(14);

    doc.text(`Invoice Number : ${invoice.invoiceNumber}`);
    doc.text(`Customer       : ${invoice.customerName}`);
    doc.text(`Date           : ${new Date(invoice.invoiceDate).toLocaleDateString()}`);

    doc.moveDown();

    doc.text("-------------------------------------------");

    doc.text(
        `Medicine : ${invoice.sale.product.name}`
    );

    doc.text(
        `Manufacturer : ${invoice.sale.product.manufacturer}`
    );

    doc.text(
        `Quantity : ${invoice.sale.quantity}`
    );

    doc.text(
        `Price : ₹${invoice.sale.sellingPrice}`
    );

    doc.text(
        `Subtotal : ₹${invoice.subtotal}`
    );

    doc.text(
        `Discount : ₹${invoice.discount}`
    );

    doc.text(
        `Tax : ₹${invoice.tax}`
    );

    doc.text(
        `Grand Total : ₹${invoice.grandTotal}`
    );

    doc.moveDown();

    doc.text(
        `Payment Method : ${invoice.paymentMethod}`
    );

    doc.text(
        `Payment Status : ${invoice.paymentStatus}`
    );

    doc.moveDown(2);

    doc
        .fontSize(16)
        .text(
            "Thank You! Visit Again 😊",
            {
                align: "center"
            }
        );

    doc.end();

};

module.exports = {
    generateInvoicePDF
};