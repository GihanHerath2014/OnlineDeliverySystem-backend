const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const productDetailsSchema = new Schema({
    productName : {
            type: String,
            required: [true, 'Please add a name']
        },
        // awe: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },

        uniPrice: {
            type: String,
            required: [true, 'Please add a name']
        },
           
        availableQuantity: {
            type: String,
            required: [true, 'Please add a name']
        },
        category: {
            type: String,
            required: [true, 'Please add a name']
        },

        shopName: {
            type: String,
            required: [true, 'Please add a shop name']
        },

        shopID : {
            type: String,
            required: [true, 'Please add a shop id']
        },

        // _Id: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
        imgName: {
            type: String,
            required: [false, 'Please upload a valid image']
        },
       
    }
);
module.exports = mongoose.model('productDetails', productDetailsSchema);