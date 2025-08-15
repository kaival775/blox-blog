const jwt = require("jsonwebtoken");
const { jwtsecret } = require("../configs/keys");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    jwtsecret,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

module.exports = generateToken;
