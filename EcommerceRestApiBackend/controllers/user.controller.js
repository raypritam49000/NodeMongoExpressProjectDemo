const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(501).json(error);
    }
}



exports.login = async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials!!");

        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);

        const OriginalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        OriginalPassword != req.body.password &&
            res.status(401).json("Wrong Credentials!!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.SECRET_KEY, { expiresIn: "3d" });

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });

    } catch (error) {
        res.status(501).json(error);
    }
}


exports.updateUser = async (req, res) => {
    try {

        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body, }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUserStatus = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
};