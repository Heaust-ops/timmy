const mongoose = require('mongoose');

const OrganiserSchema = mongoose.Schema({
    organiser: {
        type: String,
        required: true,
        unique: true
    },
    party: {
        type: String,
        required: true,
        unique: true
    },
    hardTimeArray: {
        type: Array,
        default: new Array(24*60/5).fill(0)
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Organiser', OrganiserSchema);