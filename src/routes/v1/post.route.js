const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('../../models/post.model.js');
const User = require('../../models/user.model.js');

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
            likes: 1,
            dislikes: 0,
            likedBy: [data.authorId],
            dislikedBy: [],
        });
        newPost.save();
        res.send(newPost);
    });
router
    .route('/:id')
    .get((req, res) => {
        const postId = req.params.id;
        Post.find({ "_id": postId })
            .then((foundPost) => {
                console.log(foundPost)
                res.send({ "data": foundPost[0] });
            });
        })

router
    .route('/author/:id')
    .get(async (req,res)=>{
        const id = req.params.id
        const posts = await Post.find({authorId:id}).sort({created:-1})
        res.send(posts)    
    })
module.exports = router;