const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        id: mongoose.Types.ObjectId,
        event: string,
        recipient: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        sender: {
                type: mongoose.Types.ObjectId,
                ref: "User"
        },
        referenceObject: {
            type: mongoose.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true,
    }
);


const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;