const dashboardService = require("../services/dashboard.service");

const getInventoryStatistics = async (req, res) => {

    try {

        const statistics = await dashboardService.getInventoryStatistics();

        res.status(200).json({
            success: true,
            data: statistics
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getInventoryStatistics
};