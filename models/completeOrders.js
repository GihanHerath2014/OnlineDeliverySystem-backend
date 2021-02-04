const mongoose = require('mongoose');
const Schema = mongoose.Schema

const deliverCart = new Schema({
    u_id: { 
        type: String,
         required: [true, 'Please add a UserId']
         },
    
    customerNumber: {
        type: String,
        required: [true, 'Please add a address']
    },

    address: {
        type: String,
        required: [true, 'Please add address']
    },

    total: {
        type: String,
        required: [true, 'Please add a total'],
    },
    deliverPayment: {
        type: String,
         required: [true, "Please add payment"],
    },
    state: {
        type: String, required: [true, "Please add state"],
    },
    shopID: {
        type: String,
        required: [true, 'Please add sid']
    },
    deliverPersonId: {
        type: String,
        required: [true, 'Please add dId']
    },
    orderId: {
        type: String,
        required: [true, 'Please add oId']
    },
    state: {
        type: String,
        required: [true, 'Please add state']
    }

}
);
module.exports = mongoose.model('deliveryCart', deliverCart);