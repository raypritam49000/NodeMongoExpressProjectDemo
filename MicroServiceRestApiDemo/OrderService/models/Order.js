const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    book_id:{
        type: mongoose.SchemaTypes.Number,
        ref:"book"
    },
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    price: Number,
    description: String,
    created_at: {
        type: Date,
        default: Date.now(),
    }
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;