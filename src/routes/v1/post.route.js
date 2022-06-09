const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../../models/post.model.js');

router
    .route('/')
    .get((req, res)=>{
        res.send('posts get route')
    })
    .post((req, res)=>{
        console.log(req.body);
        const data = req.body;
        const newPost = new Post({
            body: data.body,
            authorId: data.authorId,
            authorName: data.authorName,
            comments: [],
            _id: mongoose.Types.ObjectId(),
            created: Date.now(),
        });
        newPost.save();
        res.send(newPost);
    });
router
    .route('/:id')
    .get((req,res)=>{
        res.send(req.params.id)
    })

router
    .route('/author/:id')
    .get(async (req,res)=>{
        const id = req.params.id
        const posts = await Post.find({authorId:id});
        res.send(posts)    
    })
module.exports = router;