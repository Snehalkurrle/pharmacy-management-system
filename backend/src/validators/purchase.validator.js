const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const validatePurchase = [

    body("supplier")
        .notEmpty()
        .withMessage("Supplier is required."),

    body("product")
        .notEmpty()
        .withMessage("Product is required."),

    body("quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be greater than 0."),

    body("purchasePrice")
        .isFloat({ gt: 0 })
        .withMessage("Purchase price must be greater than 0."),

    body("invoiceNumber")
        .trim()
        .notEmpty()
        .withMessage("Invoice number is required."),

    body("batchNumber")
        .trim()
        .notEmpty()
        .withMessage("Batch number is required."),

    body("expiryDate")
        .isISO8601()
        .withMessage("Expiry date must be a valid date."),

    validate
];

module.exports = validatePurchase;