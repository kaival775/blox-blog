const { User, File } = require("../models");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const generateCode = require("../utils/generateCode");
const sendMail = require("../utils/sendMail");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid credentials");
    }
    let token = generateToken(user);
    res.status(200).json({
      code: 200,
      status: true,
      message: "User logged in successfully",
      data: { token: token },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }
    const code = generateCode(6);
    user.verificationCode = code;
    await user.save();

    await sendMail({
      emailTo: user.email,
      subject: "Email Verification Code",
      code,
      content: "This is you code for verification",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Verification code sent successfully",
      data: { code: code },
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if(user.isVerified) {
      res.code = 400;
      throw new Error("User already verified");
    }
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Invalid verification code");
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res
      .status(200)
      .json({ code: 200, status: true, message: "User verified successfully" });
  } catch (error) {
    next(error);
  }
};

const forgetPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const code = generateCode(6);
    user.forgetPasswordCode = code;
    await user.save();

    await sendMail({
      emailTo: user.email,
      subject: "Foget Password Code",
      code,
      content: "Change you password",
    });
    res.status(200).json({
      code: 200,
      status: true,
      message: "Forget password code sent successfully",
      data: { code: code },
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    if (user.forgetPasswordCode !== code) {
      res.code = 400;
      throw new Error("Invalid verification code");
    }
    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgetPasswordCode = null;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    console.log(req.body)
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
      res.code = 400;
      throw new Error("Invalid credentials");
    }

    if (newPassword === oldPassword) {
      res.code = 400;
      throw new Error("New password cannot be same as old password");
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, name, profilePic } = req.body;
    const user = await User.findById(_id).select(
      "-password -forgetPasswordCode -verificationCode"
    );
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    if (email) {
      const isEmailExist = await User.findOne({ email });
      if (
        isEmailExist &&
        isEmailExist.email !== user.email &&
        String(_id) !== String(isEmailExist._id)
      ) {
        res.code = 400;
        throw new Error("Email already exists");
      }
    }
    if (email) {
      user.isVerified = false;
    }

    if (profilePic) {
      const file = await File.findById(profilePic);
      if (!file) {
        res.code = 404;
        throw new Error("File not found");
      }
    }

    user.email = email ? email : user.email;
    user.name = name ? name : user.name;
    user.profilePic = profilePic;

    await user.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Profile updated successfully",
      data: { user: user },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id)
      .select("-password -forgetPasswordCode -verificationCode")
      .populate('profilePic');

    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Current user fetched successfully",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgetPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile,
  getCurrentUser,
};
