const jwt = require('jsonwebtoken');

module.exports = isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return next({ "message": "Token is Missing", "status": "BAD_REQUEST","statusCode":401, "success": false });

        const user = await jwt.verify(token, "secret");
        req.user = user
        req.session = user;
        next()
    }
    catch (err) {
        next({ "message": err.message, "status": "INTERNAL_SERVER_ERROR","statusCode":501, "success": false });
    }
}