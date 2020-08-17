const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    message: {
        type: String
    },
    products: {
        type: Object
    },
    date: {
            type: Date,
            default: Date.now
        }
    });

module.exports = Message = mongoose.model('Message', MessageSchema);