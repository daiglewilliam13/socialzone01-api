const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        eventType: {type:String},
        recipient: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        sender: {
                type: mongoose.Types.ObjectId,
                ref: "User"
        },
        eventLink: { 
            type: mongoose.Types.ObjectId,
            refPath: 'eventType'
        },
        read: Boolean,
    },
    {
        timestamps: true,
    }
);


const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;