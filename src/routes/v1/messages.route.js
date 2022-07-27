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
    .post(async (req,res)=>{
        const id = new mongoose.Types.ObjectId();
        const obj = { _id: id, ...req.body };
        const newMessage = new Message(obj);
        const result = await newMessage.save();
        res.send(result);
    })

module.exports = router;