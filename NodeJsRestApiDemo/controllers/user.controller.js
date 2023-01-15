const User = require('../models/user.model.js');

exports.createUser = async (req, res) => {
    try {
        const { name, city, salary } = req.body;

        if (!name || !city || !salary) {
            return res.json({ message: "All Parameters Required", status: 400, isSuccess: false });
        }
        else {
            const createUser = await User.create({ name: name, city: city, salary: salary });
            return res.json({ message: "User Created", status: 201, isSuccess: true, data: createUser });
        }
    }
    catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (users.length < 0) {
            return res.json({ message: "Data Not Found", status: 404, isSuccess: false });
        }
        else {
            return res.json({ message: "User List", status: 200, isSuccess: true, data: users });
        }
    }
    catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        if (!user) {
            return res.json({ message: "Data Not Found", status: 404, isSuccess: false });
        }
        else {
            return res.json({ message: "User List", status: 200, isSuccess: true, data: user });
        }
    }
    catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { deletedCount } = await User.deleteOne({ _id: req.params.id })
        console.log(deletedCount);

        if (deletedCount <= 0) {
            return res.json({ message: "Data Not Found", status: 404, isSuccess: false });
        }
        else {
            return res.json({ message: "User Deleted", status: 203, isSuccess: true });
        }
    }
    catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
}

exports.updateUser = async (req, res) => {
    try {

        const user = await User.findById({ _id: req.params.id });

        if (!user) {
            return res.json({ message: "Data Not Found", status: 404, isSuccess: false });
        }

        const { name, city, salary } = req.body;

        if (!name || !city || !salary) {
            return res.json({ message: "All Parameters Required", status: 400, isSuccess: false });
        }

        user.name = name;
        user.city = city;
        user.salary = salary;

        const updatedUser = await user.save();

        return res.json({ message: "User Updated", status: 201, isSuccess: true, data: updatedUser });

    }
    catch (error) {
        return res.json({ message: error.message, isSuccess: 501, isSuccess: false });
    }
}