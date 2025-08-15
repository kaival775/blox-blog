const { PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");
const {
  awsRegion,
  awsAccessKey,
  awsSecretKey,
  awsBucketName,
} = require("../configs/keys");
const generateCode = require("./generateCode");

const client = new S3Client({
  region: awsRegion,
  credentials: {
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretKey,
  },
});

const uploadFile = async ({file, ext}) => {
  const key = `${generateCode(12)}_${Date.now()}${ext}`;
  const params = {
    Bucket: awsBucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await client.send(command);
    return key;
  } catch (error) {
    console.log(error);
  }
};

const signedUrl = async (key) => {
 const params = {
    Bucket: awsBucketName,
    Key: key,
  };
 const command = new GetObjectCommand(params);
 try {
    const url = await getSignedUrl(client, command, {expiresIn: 60});
    return url
 } catch (error) {
    console.log(error);
 }
};

const deleteFileS3 = async (key) => {
  const params = {
    Bucket: awsBucketName,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  try {
    await client.send(command);
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadFile, signedUrl, deleteFileS3 };
