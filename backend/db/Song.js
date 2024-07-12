const strict = require('assert/strict');
const mongoose = require( 'mongoose'); 
const { type } = require('os');
const User = require('./User');

const songSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
});

module.exports = mongoose.model("Songs", songSchema);