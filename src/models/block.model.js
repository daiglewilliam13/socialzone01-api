const mongoose = require('mongoose');


const blockSchema = mongoose.Schema({
    blockingUser: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    blockedUser:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
})

const Block = mongoose.model('Block', blockSchema);
module.exports = Block;