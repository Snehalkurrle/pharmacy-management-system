const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const validateProduct = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required."),

    body("manufacturer")
        .trim()
        .notEmpty()
        .withMessage("Manufacturer is required."),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required."),

    body("purchasePrice")
        .isFloat({ gt: 0 })
        .withMessage("Purchase price must be greater than 0."),

    body("sellingPrice")
        .isFloat({ gt: 0 })
        .withMessage("Selling price must be greater than 0."),

    body("quantity")
        .isInt({ min: 0 })
        .withMessage("Quantity cannot be negative."),

    body("expiryDate")
        .isISO8601()
        .withMessage("Expiry date must be a valid date."),

    validate
];

module.exports = validateProduct;