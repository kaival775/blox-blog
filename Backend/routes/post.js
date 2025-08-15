const express = require("express");
const { postController } = require("../controllers");
const {
  addPostValidator,
  updatePostValidator,
  idValidator,
} = require("../validators/post");
const isAuth = require("../middlewares/isAuth");
const upload = require("../middlewares/upload");
const validate = require("../validators/validate");

const router = express.Router();

router.post(
  "/add-post",
  isAuth,
  upload.single('file'),
  addPostValidator,
  validate,
  postController.addPost
);

router.put(
  "/:id",
  isAuth,
  upload.single('file'),
  updatePostValidator,
  idValidator,
  validate,
  postController.updatePost
);

router.delete("/:id", isAuth, idValidator, validate, postController.deletePost);

router.get("/", isAuth, postController.getPosts);
router.get("/my-posts", isAuth, postController.getMyPosts);

router.get("/:id", isAuth, idValidator, validate, postController.getPost);
module.exports = router;
