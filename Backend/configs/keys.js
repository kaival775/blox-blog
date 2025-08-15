const {
  PORT,
  MONGODB_URI,
  CONNECTION_URL,
  JWT_SECRET,
  SENDER_EMAIL,
  EMAIL_PASSWORD,
  AWS_ACCESS_KEY_ID,
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_BUCKET_NAME,
  AWS_REGION,
} = process.env;

module.exports = {
  jwtsecret: JWT_SECRET,
  port: PORT || 3000,
  connectionUrl: MONGODB_URI || CONNECTION_URL,
  senderemail: SENDER_EMAIL,
  emailpassword: EMAIL_PASSWORD,
  awsAccessKey: AWS_ACCESS_KEY_ID || AWS_ACCESS_KEY,
  awsSecretKey: AWS_SECRET_ACCESS_KEY,
  awsBucketName: AWS_BUCKET_NAME,
  awsRegion: AWS_REGION,
};
