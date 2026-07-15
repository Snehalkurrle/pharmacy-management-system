const { body, validationResult } = require("express-validator");

const validateSupplier = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Supplier name is required."),

    body("companyName")
        .trim()
        .notEmpty()
        .withMessage("Company name is required."),

    body("email")
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email address."),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required.")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone number must be exactly 10 digits.")
        .isNumeric()
        .withMessage("Phone number must contain only numbers."),

    body("address")
        .trim()
        .notEmpty()
        .withMessage("Address is required."),

    body("gstNumber")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn(["Active", "Inactive"])
        .withMessage("Status must be either Active or Inactive."),

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

module.exports = validateSupplier;