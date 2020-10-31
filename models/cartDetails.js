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
           
        // shopId: {
        //     type: String,
        //     required: [true, 'Please add a shopId']
        // },
        
    }
);
module.exports = mongoose.model('cartDetails', cartDetailsSchema);