require("dotenv").config();

const app = require("./app");
const connectDB = require("./database/database");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server");
        console.error(error.message);
    }
};

startServer();