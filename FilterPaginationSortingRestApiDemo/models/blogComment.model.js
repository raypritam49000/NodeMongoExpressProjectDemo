const mongoose = require('mongoose');

const blogCommentSchema = new mongoose.Schema({
    comment:{
      type: String
    },
    blog_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
);

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);
module.exports = BlogComment;