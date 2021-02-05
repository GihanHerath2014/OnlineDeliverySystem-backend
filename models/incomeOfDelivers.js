const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const deliverEran = new Schema({
    u_id : {
        type: String,
        required: [true, 'Please add a UserId']
    },
    orderId:{
        type: String,
        required: [true, 'Please add orderId']
    },
        payment : {
            type: String,
            required: [true, 'Please add a payment']
        },

        address: {
            type: String,
            required: [true, 'Please add address']
        },
//   
        totalCollected: {
            type: String,
            required: [true, 'Please add totalCollected']
        },
        
        income: {
            type: String,
            required: [true, 'Please add a income']
        },

        date: {
            type: Date,
            default: Date.now
        }
    }
);
module.exports = mongoose.model('deliverEranDetails', deliverEran);