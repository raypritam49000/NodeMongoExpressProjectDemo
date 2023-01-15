const BlogComment = require('../models/blogComment.model');
const Blog = require('../models/blog.model');

exports.createBlogComment = async (req, res) => {
    try {
        const blogId = req.params.id;

        const { comment } = req.body;

        if (!blogId || !comment) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        const blog = await Blog.findOne({ _id: blogId });

        if (!blog) {
            return res.status(404).json({
                message: 'Blog Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

        const blogComment = new BlogComment({
            comment: req.body.comment,
            user_id: req.user._id,
            blog_id: blogId
        });

        let blogCommentData = await blogComment.save();

        return res.status(200).json({
            message: 'Blog Comment Created', statusCode: 201, statusMessage: "CREATED", isSuccess: true, data: blogCommentData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}


exports.commentsList = async (req, res) => {
    try {
        const comment = await BlogComment.findOne({ _id: req.params.id }).populate("user_id").populate("blog_id");
        if (comment) {
            return res.status(200).json({
                message: 'Blog Comment', statusCode: 200, statusMessage: "SUCCESS", isSuccess: true, data: comment
            });
        }
        else {
            return res.status(404).json({
                message: 'BlogComment Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}

exports.updateComments = async (req, res) => {
    try {
        const blogCommentId = req.params.id;

        const blogComment = await BlogComment.findOne({ _id: blogCommentId });

        if (!blogComment) {
            return res.status(404).json({
                message: 'BlogComments Details Not Found', statusCode: 404, statusMessage: "NOT_FOUND", isSuccess: false
            });
        }

        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({
                message: 'All Parameter are Required', statusCode: 400, statusMessage: "BAD_REQUEST", isSuccess: false
            });
        }

        if (blogComment.user_id != req.user._id) {
            return res.status(403).json({
                message: 'Access Denied', statusCode: 403, statusMessage: "ACCESS_DENIED", isSuccess: false
            });
        }

        blogComment.comment = comment;

        const blogCommentData = await blogComment.save();

        return res.status(200).json({
            message: 'Blog Comment Update', statusCode: 201, statusMessage: "UPDATED", isSuccess: true, data: blogCommentData
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message, statusCode: 500, statusMessage: "INTERNAL_SERVER_ERROR", isSuccess: false
        });
    }
}