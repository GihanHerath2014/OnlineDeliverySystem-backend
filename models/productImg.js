const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const productImageSchema = new Schema({
    productName : {
            type: String,
            required: [true, 'Please add a name']
        },

        // uniPrice: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
           
        // availableQuantity: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
        // category: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
        // _Id: {
        //     type: String,
        //     required: [true, 'Please add a name']
        // },
        imagePath:{
            type: String,
            required:[true, 'Please add a Path']
        }
    }
);
module.exports = mongoose.model('productImg', productImageSchema);