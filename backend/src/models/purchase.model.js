const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        purchasePrice: {
            type: Number,
            required: true,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true
        },

        invoiceNumber: {
            type: String,
            required: true,
            trim: true
        },

        batchNumber: {
            type: String,
            required: true,
            trim: true
        },

        expiryDate: {
            type: Date,
            required: true
        },

        purchaseDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Purchase", purchaseSchema);