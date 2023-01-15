const Person = require('../models/person.model');
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

module.exports = {

    createPerson: async (req, res) => {
        try {
            const v = new Validator(req.body, {
                email: 'required|email',
                city: 'required',
                name: 'required',
                salary: 'required'
            });

            const matched = await v.check();

            if (!matched) {
                return res.status(422).json({
                    message: "All Parameter are required", statusCode: 422, statusMessage: "BAD_REQUIRED", isSuccess: false, body: v.errors
                });
            }

            const person = await Person.findOne({ email: req.body.email });

            if (person) {
                const err = {
                    email: {
                        message: "The email field is unique.",
                        rule: "unique"
                    }
                };
                return res.status(400).json({
                    message: "Email already in use", statusCode: 400, statusMessage: "BAD_REQUIRED", isSuccess: false, body: err
                });
            }


            const newPerson = new Person({
                city: req.body.city,
                salary: req.body.salary,
                name: req.body.name,
                email: req.body.email
            });

            const personData = await newPerson.save();

            return res.status(201).json({
                message: "Person Create Successfully", statusCode: 201, statusMessage: "CREATED", isSuccess: true, body: personData
            });

        } catch (error) {
            return res.status(501).json({
                message: error.message, statusCode: 501, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    },

    getAllPersons: async (req, res) => {
        try {
            const persons = await Person.find();

            if (persons && persons.length > 0) {
                return res.status(200).json({
                    message: "Person Lists", statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, body: persons
                });
            }
            else {
                return res.status(404).json({
                    message: "Person Details Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false, body: persons
                });
            }

        } catch (error) {
            return res.status(501).json({
                message: error.message, statusCode: 501, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    },

    getPersonById: async (req, res) => {
        try {
            const personId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(personId)) {
                const err = {
                    _id: {
                        message: "Please enter valid id",
                        rule: "valid id"
                    }
                };

                return res.status(400).json({
                    message: "Invalid Id", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false, body: err
                });
            }

            const person = await Person.findOne({ _id: personId });

            if (person) {
                return res.status(200).json({
                    message: "Person Lists", statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, body: person
                });
            }
            else {
                return res.status(404).json({
                    message: "Person Details Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }

        } catch (error) {
            return res.status(501).json({
                message: error.message, statusCode: 501, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    },

    updatePerson: async (req, res) => {
        try {
            const personId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(personId)) {
                const err = {
                    _id: {
                        message: "Please enter valid id",
                        rule: "valid id"
                    }
                };

                return res.status(400).json({
                    message: "Invalid Id", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false, body: err
                });
            }

            const v = new Validator(req.body, {
                email: 'required|email',
                city: 'required',
                name: 'required',
                salary: 'required'
            });

            const matched = await v.check();

            if (!matched) {
                return res.status(422).json({
                    message: "All Parameter are required", statusCode: 422, statusMessage: "BAD_REQUIRED", isSuccess: false, body: v.errors
                });
            }

            const person = await Person.findOne({ _id: personId });

            if (!person) {
                return res.status(404).json({
                    message: "Person Details Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }

            person.email = req.body.email;
            person.name = req.body.name;
            person.salary = req.body.salary;
            person.city = req.body.city;

            const updatePerson = await person.save();

            return res.status(200).json({
                message: "Person Updated", statusCode: 202, statusMessage: "UPDATED", isSuccess: true, body: updatePerson
            });

        } catch (error) {
            return res.status(501).json({
                message: error.message, statusCode: 501, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    },

    deletePerson: async (req, res) => {
        try {
            const personId = req.params.id;

            if (!mongoose.Types.ObjectId.isValid(personId)) {
                const err = {
                    _id: {
                        message: "Please enter valid id",
                        rule: "valid id"
                    }
                };

                return res.status(400).json({
                    message: "Invalid Id", statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false, body: err
                });
            }

            const person = await Person.findOne({ _id: personId });

            if (!person) {
                return res.status(404).json({
                    message: "Person Details Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }

            await Person.deleteOne({ _id: personId });

            return res.status(200).json({
                message: "Person Deleted", statusCode: 200, statusMessage: "DELETED", isSuccess: true
            });

        } catch (error) {
            return res.status(501).json({
                message: error.message, statusCode: 501, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }

}