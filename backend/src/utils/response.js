// Success Response
const sendSuccess = (
    res,
    data = null,
    message = "Success",
    statusCode = 200
) => {

    return res.status(statusCode).json({
        success: true,
        message,
        data
    });

};

// Error Response
const sendError = (
    res,
    statusCode = 500,
    message = "Something went wrong",
    errors = null
) => {

    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });

};

module.exports = {
    sendSuccess,
    sendError
};