const express = require('express');

const upload = require('../middlewares/upload');

const router = express.Router();

const { getPosts, createPosts, updatePosts, deletePosts} = require('../controllers/postController')

const Posts = require('../models/post')


router.get('/get-posts', getPosts)

router.post('/create-post', upload.single('image'),  createPosts)

router.put('/update-post/:id', upload.single('image'), updatePosts);

router.delete('/delete-post/:id', deletePosts)

module.exports = router