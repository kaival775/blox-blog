const {check, param} = require('express-validator');
const mongoose = require('mongoose');
const addPostValidator = [
    check('title').notEmpty().withMessage('Title is required'),
    check('file').custom(async (file) => {
        if(file && !mongoose.Types.ObjectId.isValid(file)){
            throw 'Invalid file id'
    }}),

    check('category').notEmpty().withMessage('category is required').custom(async(category)=>{
        if(category && !mongoose.Types.ObjectId.isValid(category)){
            throw 'Invalid category id'
        }
    })
]

const updatePostValidator = [
    check('title').notEmpty().withMessage('Title is required'),

    check('category').custom(async(category)=>{
        if(category && !mongoose.Types.ObjectId.isValid(category)){
            throw 'Invalid category id'
        }
    })
]

const idValidator = [
    param('id').custom(async(id)=>{
        if(id && !mongoose.Types.ObjectId.isValid(id)){
            throw 'Invalid id'
        }
    })
]

module.exports = { addPostValidator, updatePostValidator, idValidator };
