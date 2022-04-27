const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const messageSchema = mongoose.Schema(
    {
        id: {
            type: Number
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        senderName: {
            type: String,
        },
        recipientId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        recipientName: {
            type: String,
        },
        body: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;