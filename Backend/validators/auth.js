const { check } = require("express-validator");
const emailValidatorr = require('./emailValidator');
const mongoose = require("mongoose");

const signupValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const signinValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const emailValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
];

const verifyUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("code").notEmpty().withMessage("Code is required"),
];

const recoverPasswordValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),

  check("code").notEmpty().withMessage("Code is required"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const changePasswordValidator = [
  check("oldPassword").notEmpty().withMessage("Old Password is required"),
  check("newPassword")
    .notEmpty()
    .withMessage("New Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const updateProfileValidator = [
    check('email').custom(async (email) =>{
        if(email){
            const validateEmail = emailValidatorr(email);
            if(!validateEmail){
                throw new Error('Must be a valid email address');
            }
        }
    }),

    check("profilePic").custom(async (profilePic) =>{
        if(profilePic && !mongoose.Types.ObjectId.isValid(profilePic)){
            throw 'Invalid profile picture';   
        }
    })
]

module.exports = {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator
};
