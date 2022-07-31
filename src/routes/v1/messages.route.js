const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Message = require('../../models/message.model')

router
    .route('/')
    .get(async (req, res) => {
        res.send('messages route')
    })
    .post(async (req, res) => {
        const id = new mongoose.Types.ObjectId();
        const obj = { _id: id, ...req.body };
        const newMessage = new Message(obj);
        const result = await newMessage.save();
        res.send(result);
    })

router
    .route('/:userId')
    .get(async (req, res) => {
        console.log(req.params.userId);
        const foundMessages = await Message.find({
            $or: [{ senderId: req.params.userId }, { recipientId: req.params.userId }]
        },
            function (err, foundMessages) {
                if (err) {
                    res.send(err)
                } else {
                    return foundMessages
                }
            })
        res.send(foundMessages)
    })
router
    .route('/:userId/read/:recipientId')
    .get(async (req, res) => {
        const markedRead = await Message.updateMany(
            {
                $and: [
                    //you are the recipient
                    { recipientId: req.params.userId },
                    //the person you are talking to
                    { senderId: req.params.recipientId },
                    //that haven't been read
                    { isRead: false }
                ]
            }, 
            { isRead: true }, 
            function(error, res){
                if(error){ console.log(error);}
                return (res);
            }
            )
        res.send(markedRead);
    })
module.exports = router;