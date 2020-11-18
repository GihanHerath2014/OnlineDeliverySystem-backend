const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const checkOutList = new Schema({u_id : {type: String,required: [true, 'Please add a UserId']},
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
        },

        address:{
            type: String,
            required: [true, 'Please add a address']
        },

        mobileNumber:{
            type: String,
            required: [true, 'Please add a address']
        },

        customerName:{
            type: String,
            required: [true, 'Please add a name']
        },

        email: {
            type: String,
            required: [true, 'Please add a email'],
        },
        total:{
            type:String,
            required:[true,'Please add a total'],
        },
        payment:{
            type:String,
            required:[true, "Please add payment"],
        },
        state:{
            type:String,
            required:[true, "Please add state"],
        },
        shopID:{
            type:String,
            required:[true, 'Please add sid']
        }
        

    }
);
module.exports = mongoose.model('checkOutList', checkOutList);