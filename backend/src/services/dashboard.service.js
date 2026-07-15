const Product = require("../models/product.model");

const getInventoryStatistics = async () => {

    const today = new Date();

    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const totalProducts = await Product.countDocuments();

    const lowStock = await Product.countDocuments({
        quantity: {
            $lte: 10
        }
    });

    const outOfStock = await Product.countDocuments({
        quantity: 0
    });

    const expiringSoon = await Product.countDocuments({
        expiryDate: {
            $gte: today,
            $lte: next30Days
        }
    });

    return {
        totalProducts,
        lowStock,
        outOfStock,
        expiringSoon
    };

};

module.exports = {
    getInventoryStatistics
};