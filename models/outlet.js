const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const outletSchema = new mongoose.Schema({
    outlet_name: {
        type: String,
        required: true
    },
    outlet_code: {
        type: Number,
        required: true
    },
    town_name: {
        type: String,
        required: true
    },
    town_code: {
        type: Number,
        required: true
    },
    route_code: {
        type: Number,
        required: true
    },
    outlet_id: {
        type: Number,
        required: true
    },
    programs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Program'
        }
    ]
})

module.exports = mongoose.model('Outlet',outletSchema);