const mongoose = require('mongoose'); 
const Schema = mongoose.Schema

const categoryDetailsSchema = new Schema({
    category_name: {
        type: String,
        required: [true, 'Please add category_name']
    },

    category_id : {
            type: String,
            required: [true, 'Please add a category_id']
        },
    }
);
module.exports = mongoose.model('categoryDetails', categoryDetailsSchema);