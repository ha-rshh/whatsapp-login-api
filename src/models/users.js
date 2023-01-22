const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        reuired: true
    },
    mobile: {
        type:String,
        required: true,
        unique: true
    },
    id: {
        type:String,
        required: true,
        unique: true
    },
    pass:{
        type:String,
        required: true
    },
    date: {
        type: String
    },
    avatar: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;
