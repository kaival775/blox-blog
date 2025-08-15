const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname;
    const extension = path.extname(originalname);
    const filename = originalname
      .replace(extension, "")
      .split(" ")
      .join("_")
      .toLowerCase();
    const code = generateCode(12);
    const finalFile = `${filename}_${code}${extension}`;
    cb(null, finalFile);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg or .jpeg or.png or .pdf is allowed"));
    }
  },
});

module.exports = upload;
