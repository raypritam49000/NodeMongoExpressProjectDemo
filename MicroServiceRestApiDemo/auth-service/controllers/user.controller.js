const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ mesage: "User doesn't exist", status: "NOT_FOUND", "statusCode": 404, "success": false });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ mesage: "Password Incorrect", status: "Unauthorized", "statusCode": 401, "success": false });
        }

        const payload = { id: user._id, email, name: user.name };

        const token = await jwt.sign(payload, "secret");

        return res.status(200).json({ mesage: "User Login Successfully", status: "OK", "statusCode": 200, "success": true, "data": { user, token } });

    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ mesage: "User already exists", status: "ALREADY_EXISTS", "statusCode": 409, "success": false });
        }

        const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = new User({ email, name, password: hashPassword });
        newUser.save();

        return res.status(201).json({ message: "User Registered", status: "Created", "statusCode": 201, success: true, "data": newUser });

    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }

}

exports.findById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({ mesage: "User Not Found", status: "NOT_FOUND", "statusCode": 404, "success": false });
        }

        return res.status(200).json({ mesage: "User List", status: "OK", "statusCode": 200, "data": user, "success": true });
    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}
