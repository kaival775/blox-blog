const path = require("path");
const { uploadFile, signedUrl, deleteFileS3 } = require("../utils/awsS3");
const { extensionValidator } = require("../validators/file");
const { File} = require('../models');

const fileUpload = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      res.code = 400;
      throw new Error("File is not seleted");
    }
    const ext = path.extname(file.originalname);
    const isValidExt = extensionValidator(ext);
    if (!isValidExt) {
      res.code = 400;
      throw new Error("Only .jpg or .jpeg or .png format is allowed");
    }

    const key = await uploadFile({ file, ext });

    if(key){
        const newFile = new File({
            key: key,
            mimetype: ext,
            size: file.size,
            createdBy: req.user._id
        })
        const savedFile = await newFile.save();
        
        res.status(200).json({
          code: 201,
          status: true,
          message: "File uploaded successfully",
          data: {
            _id: savedFile._id,
            key: savedFile.key,
          },
        });
    }
  } catch (error) {
    next(error);
  }
};

const getSignedUrl = async (req, res, next) => {
    try {
        const url = await signedUrl(req.query.key);

        res.status(200).json({
            code: 200,
            status: true,
            message: "Signed URL generated successfully",
            data: {
                url
            }
        })
    } catch (error) {
        next(error);
    }
}

const deleteFile = async (req, res, next ) => {
    try {
        const { key } = req.query;
        await deleteFileS3(key);
        await File.findOneAndDelete({key: key});
        res.status(200).json({
            code: 200,
            status: true,
            message: "File deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}
module.exports = { fileUpload, getSignedUrl, deleteFile };
