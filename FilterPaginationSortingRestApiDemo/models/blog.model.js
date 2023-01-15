const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    short_description: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true,
        toObject:{
            virtuals:true
        },
        toJSON:{
            virtuals:true
        }
    }
);

blogSchema.virtual('image_url').get(function(req,res){
    var fullUrl = `http://${process.env.HOST}:${process.env.PORT}`
    return fullUrl+'/uploads/blog_images/'+this.image;
})



const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;