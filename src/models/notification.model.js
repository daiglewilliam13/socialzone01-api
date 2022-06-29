const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        id: mongoose.Types.ObjectId,
        eventType: string,
        recipient: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        sender: {
                type: mongoose.Types.ObjectId,
                ref: "User"
        },
        eventLink: string,
    },
    {
        timestamps: true,
    }
);


const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;