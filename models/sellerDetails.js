const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const SellerDetailsSchema = new Schema({
        businessModel : {
            type:String,
            required: [true, 'Please select a model'],
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            // unique: true,
            // trim: true,
             maxlength: [50, 'Name can not be more than 50 Characters']
        },
        shopName: {
            type: String,
            required: [true, 'Please add a name'],
            maxlength: [50, 'Name can not be more than 50 Characters']
        },
        businessID: {
            type: String,
            maxlength: [25, 'ID can not be longer than 25 characters']
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        personalPhone: {
            type: String,
            maxlength: [10, 'Phone number can not be longer than 20 characters']
        },
        officePhone: {
            type: String,
            maxlength: [10, 'Phone number can not be longer than 20 characters']
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },

        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        // repassword: {
        //     type: String,
        //     required: [true, 'Please add a same password']
        // },
      
        // statues:{
        //     type: String,
        //     required: [true, 'Please add a password']
        // },


    }
);
module.exports = mongoose.model('sellerDetails', SellerDetailsSchema);