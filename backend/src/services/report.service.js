const Sale = require("../models/sale.model");
const Product = require("../models/product.model");

// ==========================
// Total Revenue
// ==========================
const getRevenueReport = async () => {

    const result = await Sale.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalAmount"
                },
                totalSales: {
                    $sum: 1
                }
            }
        }
    ]);

    return result[0] || {
        totalRevenue: 0,
        totalSales: 0
    };
};

// ==========================
// Low Stock Products
// ==========================
const getLowStockProducts = async () => {

    return await Product.find({
        quantity: {
            $lte: 10
        }
    }).select(
        "name manufacturer quantity"
    );

};

// ==========================
// Expiring Products
// ==========================
const getExpiringProducts = async () => {

    const today = new Date();

    const nextMonth = new Date();

    nextMonth.setDate(today.getDate() + 30);

    return await Product.find({
        expiryDate: {
            $gte: today,
            $lte: nextMonth
        }
    }).select(
        "name manufacturer expiryDate quantity"
    );

};

module.exports = {
    getRevenueReport,
    getLowStockProducts,
    getExpiringProducts
};