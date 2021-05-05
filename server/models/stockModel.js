const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    stock_name: {
        type: String,
        required: true,
    },
    Buying: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: new Date(),
    },
},  { timestamps: true });

const Stock =  mongoose.model("stock", stockSchema);

module.exports = Stock;