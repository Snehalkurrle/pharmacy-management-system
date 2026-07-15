const { body, validationResult } = require("express-validator");

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

module.exports = validateSale;