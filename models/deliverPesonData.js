const mongoose = require("mongoose")
const Schema = mongoose.Schema

const deliverPersonSchema = new Schema({
    full_name: {
        type: String,
        required: [true, 'Please add a full_name']
    },
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
    conatct: {
        type: String,
        required: [true, 'Please add a conatct']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    drivingLicenceId: {
        type: String,
        required: [true, 'Please add an drivingLicenceId']
    },
    vehicaleType: {
        type: String,
        required: [false, 'Please add an vehicale_type']
    },

    vehicaleLicenceNumber: {
        type: String,
        required: [true, 'Please add an vehicaleLicenceNumber']
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

module.exports = mongoose.model('deliversPersonData_ggs', deliverPersonSchema)