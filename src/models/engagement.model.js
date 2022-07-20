const mongoose = require('mongoose');


const engagementSchema = mongoose.Schema({
    _id: {
        type: mongoose.types.ObjectId;
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    replyTo: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
    },
    replyType: {
        type: string,
    },
    createdAt: {
        type:Date
    }
})

const Engagement = mongoose.model('Engagement', engagementSchema);

module.exports = Engagement;