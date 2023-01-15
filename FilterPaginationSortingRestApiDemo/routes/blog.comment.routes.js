const express = require("express");
const route = express.Router();
const { auth } = require("../middlewares/auth");
const { createBlogComment, commentsList, updateComments } = require("../controllers/blog.comment.controller");

route.post('/createComment/:id', auth, createBlogComment);
route.get('/comments/:id', auth, commentsList);
route.put('/updateComment/:id', auth, updateComments);

module.exports = route;