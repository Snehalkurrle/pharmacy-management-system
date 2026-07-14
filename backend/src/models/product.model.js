const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        manufacturer: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        strength: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        purchasePrice: {
            type: Number,
            required: true
        },

        sellingPrice: {
            type: Number,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        batchNumber: {
            type: String,
            required: true,
            unique: true
        },

        expiryDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);