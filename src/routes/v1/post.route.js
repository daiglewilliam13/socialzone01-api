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
            likes: 0,
            dislikes: 0,
            likedBy: [],
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
                res.send(foundPost[0]);
            });
        })

router
    .route('/author/:id')
    .get(async (req,res)=>{
        const id = req.params.id
        const posts = await Post.find({authorId:id}).sort({created:-1})
        res.send(posts)    
    });
router
    .route('/:id/like')
    .post(async (req,res)=>{
        const postId = req.params.id
        Post.findOne({"_id":postId}).then((foundPost)=>{
            if(foundPost.likedBy.includes(req.body.id)) {
                foundPost.updateOne({
                    $inc:{ 'likes':-1 },
                    $pull: {'likedBy': req.body.id }
                }).exec(
                    res.send(foundPost)
                )
            } else {
                foundPost.updateOne({
                    $inc: { 'likes': 1 },
                    $push: { 'likedBy': req.body.id }
                }).exec(
                    res.send(foundPost)
                )
            }
        })
    })
    .get(async (req, res) => {
        const id = req.params.id
        const foundPost = await Post.findOneAndUpdate({ _id: id }, { $inc: { 'dislikes': 1 } })
        res.send(await foundPost);
    })
router
    .route('/:id/dislike')
    .post(async (req, res) => {
        const postId = req.params.id
        Post.findOne({ "_id": postId }).then((foundPost) => {
            if (foundPost.dislikedBy.includes(req.body.id)) {
                foundPost.updateOne({
                    $inc: { 'dislikes': -1 },
                    $pull: { 'dislikedBy': req.body.id }
                }).exec(
                    res.send(foundPost)
                )
            } else {
                foundPost.updateOne({
                    $inc: { 'dislikes': 1 },
                    $push: { 'dislikedBy': req.body.id }
                }).exec(
                    res.send(foundPost)
                )
            }
        })
    })

router
.route('/:userId/feed')
.post(async(req,res)=>{
    const foundUser = await User.findById(req.params.userId);
    console.log(req.body)
    const followingList = foundUser.following;
    const feedArray = await Post.find({
        authorId: followingList
    }).sort({createdAt: -1})
    .skip(req.body.limit*req.body.pageNum)
    .limit(req.body.limit)
    res.send({document: feedArray})
})

module.exports = router; 