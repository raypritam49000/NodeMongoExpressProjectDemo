const Employee = require('../models/employee.model');

class EmployeeController {

    static createEmployee = async (req, res) => {
        try {
            const { firstName, lastName, city, email, password } = req.body;

            if (!firstName || !lastName || !city || !email || !password) {
                return res.status(400).json({
                    message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const employee = await Employee.findOne({ where: { email: email } });

            if (employee) {
                return res.status(400).json({
                    message: 'Email are already exitst', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const createEmployee = await Employee.create({ firstName, lastName, city, email, password });

            return res.status(201).json({
                message: 'Employee Created', statusCode: 201, statusMessage: "CREATED", isSuccess: true, data: createEmployee
            });

        } catch (error) {
            return res.status(500).json({
                message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }


    static getAllEmployees = async (req, res) => {
        try {
            const employeeList = await Employee.findAll();

            if (employeeList && employeeList.length > 0) {
                return res.status(200).json({
                    message: 'Employee List', statusCode: 201, statusMessage: "SUCCESS", isSuccess: true, data: employeeList
                });
            }
            else {
                return res.status(404).json({
                    message: "Data Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }


    static getEmployee = async (req, res) => {
        try {
            const employeeId = req.params.id

            if (employeeId <= 0) {
                return res.status(400).json({
                    message: 'please enter id are greater than zero', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const employee = await Employee.findByPk(employeeId);

            if (employee) {
                return res.status(200).json({
                    message: 'Employee List', statusCode: 201, statusMessage: "SUCCESS", isSuccess: true, data: employee
                });
            }
            else {
                return res.status(404).json({
                    message: "Data Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }

    static deleteEmployee = async (req, res) => {
        try {
            const employeeId = req.params.id

            if (employeeId <= 0) {
                return res.status(400).json({
                    message: 'please enter id are greater than zero', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const employee = await Employee.findByPk(employeeId);

            if (employee) {

                Employee.destroy({ where: { id: employeeId } });

                return res.status(200).json({
                    message: 'Employee Deleted', statusCode: 203, statusMessage: "SUCCESS", isSuccess: true
                });
            }
            else {
                return res.status(404).json({
                    message: "Data Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }

    static updateEmployee = async (req, res) => {
        try {
            const employeeId = req.params.id

            if (employeeId <= 0) {
                return res.status(400).json({
                    message: 'please enter id are greater than zero', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const { firstName, lastName, city, email, password } = req.body;
            if (!firstName || !lastName || !city || !email || !password) {
                return res.status(400).json({
                    message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
                });
            }

            const employee = await Employee.findByPk(employeeId);

            if (employee) {
                await Employee.update({ firstName, lastName, city, email, password }, { where: { id: employeeId } });
                return res.status(202).json({
                    message: 'Employee Updated', statusCode: 204, statusMessage: "UPDATED", isSuccess: true, data: employee
                });
            }
            else {
                return res.status(404).json({
                    message: "Data Not Found", statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }

        } catch (error) {
            return res.status(500).json({
                message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
            });
        }
    }


}

module.exports = EmployeeController;