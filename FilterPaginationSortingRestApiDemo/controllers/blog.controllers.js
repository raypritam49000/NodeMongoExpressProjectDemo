const Blog = require('../models/blog.model');
const fs = require('fs');

exports.create = async (req, res) => {
    try {

        const { title, short_description, category, description } = req.query;

        if (!title || !short_description || !category || !description || !req.files || !req.files.image) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        if (req.files && req.files.image) {
            var image_file = req.files.image;
            var image_file_name = Date.now() + '-blog-image-' + image_file.name;
            var image_path = publicPath + '/uploads/blog_images/' + image_file_name;
            await image_file.mv(image_path);
        }

        const newBlog = new Blog({
            title: title,
            short_description: short_description,
            description: description,
            category: category,
            created_by: req.user._id,
            image: image_file_name
        });

        let blogData = await newBlog.save();

        return res.status(200).json({
            message: 'Blog Created', statusCode: 201, statusMessage: "CREATED", isSuccess: true, data: blogData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.blogList = async (req, res) => {
    try {
        let blogList = await Blog.find().populate('category').populate('created_by');

        if (blogList && blogList.length > 0) {
            return res.status(200).json({
                message: 'Blog List', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: blogList
            });
        }
        else {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}


exports.findDataBetweenData = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }
        else {

            let blogList = await Blog.find({
                createdAt: {
                    $gte: new Date(startDate).toISOString(),
                    $lte: new Date(endDate).toISOString()
                }
            });

            if (blogList && blogList.length > 0) {
                return res.status(200).json({
                    message: 'Blog List', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: blogList
                });
            }
            else {
                return res.status(404).json({
                    message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.blogListWithPagination = async (req, res) => {
    try {
        const pageNo = req.query.pageNo * 1 || 1;
        const pageSize = req.query.pageSize * 1 || 10;
        const skip = (pageNo - 1) * pageSize;

        var sortObject = {};
        const sortBy = req.query.sortBy || '_id'
        const sortDir = parseInt(req.query.sortDir) || 1;
        sortObject[sortBy] = sortDir;
        const totalData = await Blog.countDocuments(Blog.find());
        const pages = Math.ceil(totalData / pageSize);

        const blogList = await Blog.find().sort(sortObject).skip(skip).limit(pageSize);

        if (blogList && blogList.length > 0) {
            return res.status(200).json({
                message: 'Blog List', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: { pageNo, pageSize, sortBy, sortDir, totalData, pages, result: blogList }
            });
        }
        else {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }


    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.findBlogById = async (req, res) => {
    try {

        const blogId = req.params.id

        if (!blogId) {
            return res.status(400).json({
                message: 'please enter id', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const blog = await Blog.findOne({ _id: blogId }).populate('category').populate('created_by');

        if (blog) {
            return res.status(200).json({
                message: 'Blog List', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: blog
            });
        }
        else {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.query.id
        const blog = await Blog.findOne({ _id: blogId });

        if (!blog) {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

        if (blog.created_by != req.user._id) {
            return res.status(404).json({
                message: 'Access Denied', statusCode: 403, statusMessage: "ACCESS_DENIED", isSuccess: false
            });
        }

        const { title, short_description, category, description } = req.query;

        if (!title || !short_description || !category || !description || !req.files || !req.files.image) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        if (req.files && req.files.image) {
            var image_file = req.files.image;
            var image_file_name = Date.now() + '-blog-image-' + image_file.name;
            var image_path = publicPath + '/uploads/blog_images/' + image_file_name;
            await image_file.mv(image_path);

            let old_path = publicPath + '/uploads/blog_images/' + blog.image;

            if (fs.existsSync(old_path)) {
                fs.unlinkSync(old_path);
            }
        }

            blog.title = title;
            blog.short_description = short_description,
            blog.description = description,
            blog.category = category,
            blog.created_by = req.user._id,
            blog.image = image_file_name

        const updateBlog = await blog.save();

        return res.status(203).json({
            message: 'Blog UPDATED', statusCode: 203, statusMessage: "UPDATED", isSuccess: true, data: updateBlog
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.query.id
        const blog = await Blog.findOne({ _id: blogId });

        if (!blog) {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

        if (blog.created_by != req.user._id) {
            return res.status(403).json({
                message: 'Access Denied', statusCode: 403, statusMessage: "ACCESS_DENIED", isSuccess: false
            });
        }

        let old_path = publicPath + '/uploads/blog_images/' + blog.image;

        if (fs.existsSync(old_path)) {
            fs.unlinkSync(old_path);
        }

        await Blog.deleteOne({_id:blogId});

        return res.status(200).json({
            message: 'Blog Deleted', statusCode: 200, statusMessage: "DELETED", isSuccess: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}