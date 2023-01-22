const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    email : {
        type:String,
        required: true,
        unique: true,
    },
    to: {
        type:String,
        required: true,
    },
    from: {
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true
    }
})

const Message = new mongoose.model('Messages', messageSchema);

module.exports = Message;