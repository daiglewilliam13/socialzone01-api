const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');
const mongoose = require('mongoose');
const router = express.Router();
const Notification = require('../../models/notification.model')

router
    .route('/')
    .post(async (req, res) => {
        console.log(req.body)
        const id = new mongoose.Types.ObjectId();
        const obj = {_id: id, ...req.body};
        const newNotification = new Notification(obj)
        const result = await newNotification.save();
        res.send(result)
    })
router
.route('/:id')
.get(async(req, res)=>{
    const foundNotifications = await Notification.find({"recipient":req.params.id}).sort({createdAt:-1})
    res.send(foundNotifications)
})
router
.route('/read/:id')
.get(async(req, res)=>{
    const noticeToUpdate = await Notification.findOneAndUpdate({'_id':req.params.id},{read: true}, {new: true});
    res.send(noticeToUpdate);
})

module.exports = router;