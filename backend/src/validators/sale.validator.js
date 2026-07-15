const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const validateSale = [

    body("product")
        .notEmpty()
        .withMessage("Product is required."),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0."),

    body("sellingPrice")
        .isFloat({ gt: 0 })
        .withMessage("Selling price must be greater than 0."),

    body("invoiceNumber")
        .trim()
        .notEmpty()
        .withMessage("Invoice number is required."),

    body("customerName")
        .optional()
        .trim(),

    validate
];

module.exports = validateSale;