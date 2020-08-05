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
        // shopname: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },

        // _Id: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
       
        

    }
);
module.exports = mongoose.model('productDetails', productDetailsSchema);