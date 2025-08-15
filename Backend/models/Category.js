const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title:{
        type:String,
        requiried : true
    },
    desc:{
        type:String
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Category = mongoose.model('category', categorySchema);

module.exports = Category;