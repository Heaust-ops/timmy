const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema({
    party: {
        type: String,
        required: true
    },
    member: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    timeArray: {
        type: Array,
        default: new Array(24*60/5).fill(0)
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', MemberSchema);