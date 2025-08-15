const express = require("express");
const router = express.Router();
const {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
  getCurrentUser
} = require("../validators/auth");
const validate = require("../validators/validate");
const { authController } = require("../controllers");
const isAuth = require("../middlewares/isAuth");

router.post("/signup", signupValidator, validate, authController.signup);

router.post("/signin", signinValidator, validate, authController.signin);

router.post("/verifycode", emailValidator, validate, authController.verifyCode);

router.post(
  "/verify-user",
  verifyUserValidator,
  validate,
  authController.verifyUser
);

router.post(
  "/forgot-password-code",
  emailValidator,
  validate,
  authController.forgetPasswordCode
);

router.post(
  "/recover-password",
  recoverPasswordValidator,
  validate,
  authController.recoverPassword
);

router.put(
  "/change-password",
  isAuth,
  changePasswordValidator,
  validate,
  authController.changePassword
);

router.put(
  "/update-user",
  isAuth,
  updateProfileValidator,
  validate,
  authController.updateProfile
);

router.get('/current-user', isAuth, authController.getCurrentUser);
module.exports = router;
