const express = require("express");
const router = express.Router();
const { fileController } = require("../controllers");
const upload = require("../middlewares/upload");
const isAuth = require("../middlewares/isAuth");
const { extensionValidator } = require("../validators/file");

router.post("/upload", isAuth, upload.single("image"), fileController.fileUpload);
router.get("/signed-url", isAuth, fileController.getSignedUrl);
router.delete('/delete-file',isAuth, fileController.deleteFile)
module.exports = router;
