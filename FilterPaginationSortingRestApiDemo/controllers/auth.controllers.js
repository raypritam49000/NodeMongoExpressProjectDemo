const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });

        let userData = await newUser.save();
        return res.status(201).json({
            message: 'Registration Successfully', statusCode: 201, statusMessage: "SUCCESS", isSuccess: true, data: userData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User does not Registered", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const token = await user.generateToken();

        return res.status(200).json({
            message: 'Login Successfully', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: { type: "Bearer", token, user }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}