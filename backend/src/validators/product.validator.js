const { body, validationResult } = require("express-validator");

// Validation Rules
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

    // Final Validation Middleware
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array()
            });

        }

        next();

    }

];

module.exports = validateProduct;
