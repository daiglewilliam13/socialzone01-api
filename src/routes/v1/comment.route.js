const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const Comment = require('../../models/comment.model');
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
            id: mongoose.Types.ObjectId(),
            authorId: data.author,
            authorName: data.name,
            text: data.text,
            created: Date.now(),
            replyTo: data.replyTo,
        })
        newComment.save(),
        res.send(newComment)
    })

module.exports = router;