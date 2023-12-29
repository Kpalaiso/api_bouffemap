const handleError = (err, res) => {
    const { statusCode, message, messageFR } = err;
    console.log(err);
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        messageFR,
    });
};

module.exports = handleError;