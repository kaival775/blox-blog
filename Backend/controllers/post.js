const { File, Post, Category } = require("../models");

const addPost = async (req, res, next) => {
  try {
    const { title, desc,file, category } = req.body;
    const { _id } = req.user;
   
   if (file) {
     const isFileExist = await File.findById(file);
     if (!isFileExist) {
       res.code = 404;
       throw new Error("File not found");
     }
   }

    const isCategoryExist = await Category.findById(category);
    if (!isCategoryExist) {
      res.code = 404;
      throw new Error("Category not found");
    }

    const newPost = new Post({
      title,
      desc,
      file,
      category,
      updatedBy: _id,
    });
    await newPost.save();
    res.status(201).json({
      code: 201,
      status: true,
      message: "Post created successfully",
      data: { newPost },
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, desc, category } = req.body;
    const { _id } = req.user;
    const { id } = req.params;
    let fileId = null;

    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }

    // Check if the current user is the owner of the post
    if (post.updatedBy.toString() !== _id.toString()) {
      res.code = 403;
      throw new Error("You are not authorized to update this post");
    }
    
    // Handle file upload if present
    console.log(req.file)
    if (req.file) {
      const newFile = new File({
        filename: req.file.originalname,
        path: req.file.buffer, 
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploadedBy: _id,
      });
      const savedFile = await newFile.save();
      fileId = savedFile._id;
    }
    
    if (category) {
      const isCategoryExist = await Category.findById(category);
      if (!isCategoryExist) {
        res.code = 404;
        throw new Error("Category not found");
      }
    }
  
    post.title = title ? title : post.title;
    post.desc = desc;
    if (fileId) post.file = fileId;
    post.category = category ? category : post.category;

    await post.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post updated successfully",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { page, size, q, category } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(size) || 10;
    let query = {};
    if (q) {
      const search = new RegExp(q, "i");

      query = {
        $or: [{ title: { $regex: search } }],
      };
    }
    if(category){
        query = { ...query, category };
    }
    
    const totalPosts = await Post.countDocuments(query);
    const pages = Math.ceil(totalPosts / pageSize);
    const posts = await Post.find(query)
     .populate("file")
      .populate("category")
      .populate("updatedBy", "-password -verificationCode -forgetPasswordCode")
      .sort({ updatedBy: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Posts fetched successfully",
      data: { posts, pages, totalPosts },
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate("file")
      .populate("category")
      .populate("updatedBy", "-password -verificationCode -forgetPasswordCode");
      console.log(post);
    if (!post) {
      res.code = 404;
      throw new Error("Post not found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Post fetched successfully",
      data: { post },
    });
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const { page, size, q, category } = req.query;
    const { _id } = req.user;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(size) || 10;
    let query = { updatedBy: _id };
    if (q) {
      const search = new RegExp(q, "i");
      query = {
        ...query,
        $or: [{ title: { $regex: search } }],
      };
    }
    if(category){
        query = { ...query, category };
    }
    
    const totalPosts = await Post.countDocuments(query);
    const pages = Math.ceil(totalPosts / pageSize);
    const posts = await Post.find(query)
     .populate("file")
      .populate("category")
      .populate("updatedBy", "-password -verificationCode -forgetPasswordCode")
      .sort({ updatedAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.status(200).json({
      code: 200,
      status: true,
      message: "My posts fetched successfully",
      data: { posts, pages, totalPosts },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addPost, updatePost, deletePost, getPosts, getPost, getMyPosts };
