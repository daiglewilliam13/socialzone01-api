const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const Comment = require('../../models/comment.model');
const Post = require('../../models/post.model');
const router = express.Router();
const mongoose = require('mongoose');


router
    .route('/')
    .get((req, res) => {
        res.send('comments get route')
    })
    .post((req, res)=>{
        const data = req.body;
        const newComment = new Comment({
            _id: mongoose.Types.ObjectId(),
            authorId: data.author,
            authorName: data.name,
            text: data.text,
            created: Date.now(),
            replyTo: data.replyTo,
        })
        newComment.save(),
        Post.findOneAndUpdate({"_id":data.replyTo}, {$push:{'comments':newComment._id}}).then((doc)=>{
            console.log("post updated")
            res.send(doc)
        })
        
    });
router
    .route('/:id')
    .get((req, res)=>{
        Comment.findOne({"_id": req.params.id}).then((foundComment)=>{
            console.log(foundComment)
            res.send({"data":foundComment[0]})
        })
    })

module.exports = router;