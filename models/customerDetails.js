const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserDetailsSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Please add a first_name']
    },
    conatct: {
        type: String,
        required: [true, 'Please add a last_name']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    postalcode: {
        type: String,
        required: [true, 'Please add an postalcode']
        // maxlength: [10, 'Phone number can not be longer than 20 characters']
    },
    // officePhone: {
    //     type: String,
    //     maxlength: [10, 'Phone number can not be longer than 20 characters']
    // },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true, //some time this may be error to version
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('customerdetails_ggs', UserDetailsSchema)