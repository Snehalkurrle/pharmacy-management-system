const { body } = require("express-validator");
const validate = require("../middleware/validation.middleware");

const validateInvoice = [

    body("sale")
        .notEmpty()
        .withMessage("Sale ID is required."),

    body("discount")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Discount cannot be negative."),

    body("tax")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Tax cannot be negative."),

    body("paymentMethod")
        .optional()
        .isIn(["Cash", "UPI", "Card"])
        .withMessage("Invalid payment method."),

    body("paymentStatus")
        .optional()
        .isIn(["Paid", "Pending"])
        .withMessage("Invalid payment status."),

    body("customerName")
        .optional()
        .trim(),

    validate
];

module.exports = validateInvoice;