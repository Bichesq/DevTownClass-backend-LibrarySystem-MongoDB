const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    issuedBooks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    issuedDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
    subscriptionType: {
        type: String,
        required: true
    },
    subscriptionDate: {
        type: Date,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);