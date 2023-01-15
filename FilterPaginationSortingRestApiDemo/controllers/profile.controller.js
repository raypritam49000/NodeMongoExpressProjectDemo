exports.current_user = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Current User Details', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: req.user
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}