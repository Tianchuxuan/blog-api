const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.postId);
    
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { body } = req.body;
    
    if (!body) {
      res.status(400);
      throw new Error('Comment body is required');
    }
    
    const post = await BlogPost.findById(req.params.postId);
    
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    const comment = await Comment.create({
      body,
      author: req.user._id,
      post: req.params.postId,
    });
    
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');
    
    res.status(201).json(populatedComment);
  } catch (err) {
    next(err);
  }
};
