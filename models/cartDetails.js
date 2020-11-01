const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const cartDetailsSchema = new Schema({
        u_id : {
            type: String,
            required: [true, 'Please add a UserId']
        },

        productId: {
            type: String,
            required: [true, 'Please add productId']
        },
//   
        productName: {
            type: String,
            required: [true, 'Please add productId']
        },
        
        uniPrice: {
            type: String,
            required: [true, 'Please add a uniPrice']
        },

        quantity: {
            type: String,
            required: [true, 'Please add a quantity']
        }
    }
);
module.exports = mongoose.model('cartDetails', cartDetailsSchema);