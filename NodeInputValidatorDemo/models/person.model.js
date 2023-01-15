const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type: String
    },
    city: {
        type: String
    },
    email: {
        type: String, 
        unique: true
    },
    salary: {
        type: Number
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;