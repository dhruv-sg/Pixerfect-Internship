const express = require("express");
const { createPost, getAllPosts, getPostsByUser, getPostById, updatePost, deletePost } = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/user/:userId", getPostsByUser);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
