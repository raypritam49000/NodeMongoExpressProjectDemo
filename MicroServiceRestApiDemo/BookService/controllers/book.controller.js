const Book = require('../models/Book');
// find All Books
exports.findAll = async (req, res) => {
    try {
        const bookList = await Book.findAll();

        if (bookList.length <= 0) {
            return res.status(404).json({ mesage: "Book Not Found", status: "NOT_FOUND", "statusCode": 404, "success": false });
        }

        return res.status(200).json({ mesage: "Book List", status: "OK", "statusCode": 200, "data": bookList, "success": true });
    } catch (error) {
        return res.status(502).json({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
};


// Create and Save a new Book
exports.create = async (req, res) => {

    try {
        const book = req.body;
        // Validate request
        if (!book) {
            return res.status(401).json({ mesage: "All Parameters Required", status: "BAD_REQUEST", "statusCode": 401, "success": false });
        }
        // Save Book in the database
        const savedBook = await Book.create(book)
        return res.status(201).send({ message: "Book Saved", status: "Created", "statusCode": 201, success: true, "data": savedBook });
    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
};

exports.findById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({ mesage: "Book Not Found", status: "NOT_FOUND", "statusCode": 404, "success": false });
        }
        return res.status(200).json({ mesage: "Book List", status: "OK", "statusCode": 200, "data": book, "success": true });
    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}

exports.updateById = async (req, res) => {
    try {
        const id = req.params.id;
        let book = await Book.findByPk(id);

        const { title, author, release_date, subject } = req.body;

        if (!title || !author || !release_date || !subject) {
            return res.status(400).send({ message: "all field must be required", status: "BAD_REQUEST", "statusCode": 401, success: false });
        }

        book.title = title;
        book.author = author;
        book.subject = subject;
        book.release_date = release_date;

        await user.save();

       return res.status(201).send({ message: "Updated Book", status: "OK", "statusCode": 204, success: true, data: user });

    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const isDeleted = await Book.destroy({ where: { book_id: id } });

        if (isDeleted == 1) {
          return  res.status(203).json({ message: "User was deleted successfully!",status: "OK", "statusCode": 203, success: true });
        }
        else {
          return  res.status(404).json({ message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,status: "NOT_FOUND", "statusCode": 404, success: false });
        }

    } catch (error) {
        return res.status(501).send({ message: error.message, status: "INTERNAL_SERVER_ERROR", "statusCode": 502, success: false });
    }
}




