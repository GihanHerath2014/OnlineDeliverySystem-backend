const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please add a first_name']
    },
    last_name: {
        type: String,
        required: [true, 'Please add a last_name']
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
    password: {
        type: String,
        require: true
    },
    user_type: {
        type: String,
        require: true
    },
    bussiness_id: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('sellers', UserSchema)