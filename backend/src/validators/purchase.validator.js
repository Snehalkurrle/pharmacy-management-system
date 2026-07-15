const { body, validationResult } = require("express-validator");

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

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const formattedErrors = errors.array().map(error => ({
                field: error.path,
                message: error.msg
            }));

            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors: formattedErrors
            });

        }

        next();

    }

];

module.exports = validatePurchase;