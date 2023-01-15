const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
    try {

        const { slug, name } = req.body;

        if(!slug || !name){
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const newCategory = new Category({
            slug: slug,
            name: name
        })

        let categoryData = await newCategory.save();

        return res.status(200).json({
            message: 'Blog Created', statusCode: 201, statusMessage: "CREATED", isSuccess: true, data: categoryData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}