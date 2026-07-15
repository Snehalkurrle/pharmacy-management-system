const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
    {
        invoiceNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        sale: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale",
            required: true
        },

        customerName: {
            type: String,
            trim: true,
            default: "Walk-in Customer"
        },

        subtotal: {
            type: Number,
            required: true
        },

        discount: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        grandTotal: {
            type: Number,
            required: true
        },

        paymentMethod: {
            type: String,
            enum: ["Cash", "UPI", "Card"],
            default: "Cash"
        },

        paymentStatus: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid"
        },

        invoiceDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Invoice", invoiceSchema);