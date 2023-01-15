const express = require("express");
const route = express.Router();
const {create,blogList,findDataBetweenData,blogListWithPagination,findBlogById,updateBlog,deleteBlog } 
= require("../controllers/blog.controllers")
const { auth } = require("../middlewares/auth");

route.post('/create', auth, create);
route.get('/blogList', auth, blogList);
route.post('/blogListBetweenDate',auth,findDataBetweenData);
route.post('/blogListWithPagination',auth,blogListWithPagination);
route.get('/:id',auth,findBlogById);
route.put('/updateBlog',auth,updateBlog);
route.delete('/deleteBlog',auth,deleteBlog);

module.exports = route;
