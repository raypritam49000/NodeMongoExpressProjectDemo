const Order = require('../models/Order');
const axios = require('axios');

exports.createOrder = async (req, res) => {
    try {
        const order = req.body;

        if (!order) {
            return res.status(401).json({ mesage: "All Parameters Required", status: "BAD_REQUEST", "statusCode": 401, "success": false });
        }

        const savedOrder = await Order.create(order);
        return res.status(201).send({ message: "Order Created", status: "Created", "statusCode": 201, success: true, "data": savedOrder });

    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}

exports.findById = async (req, res) => {
    try {
        const order = await Order.findById({ _id: req.params.id });

        if (!order) {
            return res.status(404).json({ mesage: "Book Not Found", status: "NOT_FOUND", "statusCode": 404, "success": false });
        }

        const { user_id, book_id, ...other } = order._doc;

        const responseBook = await axios.get(`http://localhost:3000/books/${book_id}`);
        const bookData = responseBook.data.data;

        const responseUser = await axios.get(`http://localhost:5000/findById/${user_id}`);
        const userData = responseUser.data.data;
        console.log(userData);

        other.book = bookData;
        other.user = userData;

        return res.status(200).json({ mesage: "Order Success", status: "OK", "statusCode": 200, "data": other, "success": true });
    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}