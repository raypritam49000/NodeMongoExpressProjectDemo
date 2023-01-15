const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {

    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: 'Please login to continue', statusCode: 401, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const jwt_secret = process.env.JWT_SECRET || 'PritamRay';
        const decoded = jwt.verify(token, jwt_secret);

        if (decoded) {
            req.user = decoded.data;
        }
        else {
            return res.status(401).json({
                message: 'Please login to continue', statusCode: 401, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }


    } catch (error) {
        
        if(error.expireAt && error.expireAt<new Date()){
            return res.status(401).json({
                message: 'Session Expired', statusCode: 401, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }
        else{
            return res.status(401).json({
                message: 'Please login to continue', statusCode: 401, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

    }

    next();

}