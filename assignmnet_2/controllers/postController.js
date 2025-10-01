const Post = require("../models/Post");


exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name email");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post updated", post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
