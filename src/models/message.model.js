const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        senderId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        recipientId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        body: {
            type: String,
        },
        isRead: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;