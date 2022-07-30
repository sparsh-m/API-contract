const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    outletref: {
        type: Schema.Types.ObjectId,
        ref: 'Outlet',
        required: true
    }
})

module.exports = mongoose.model('Program',programSchema);