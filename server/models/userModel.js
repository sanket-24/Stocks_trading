const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    
},  { timestamps: true });

const User =  mongoose.model("user", userSchema);

module.exports = User;