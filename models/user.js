const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const userSchema = new mongoose.Schema({
//     outlet_name: {
//         type: String,
//         required: true
//     },
//     outlet_code: {
//         type: Number,
//         required: true
//     },
//     town_name: {
//         type: String,
//         required: true
//     },
//     town_code: {
//         type: Number,
//         required: true
//     },
//     route_code: {
//         type: Number,
//         required: true
//     },
//     outlet_id: {
//         type: Number,
//         required: true
//     },
//     programs: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Program'
//         }
//     ]
// })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema);
