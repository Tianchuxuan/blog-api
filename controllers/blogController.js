const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

exports.getAllBlogPosts = async (req, res, next) => {
  try {
    // 分页参数
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 获取总数
    const total = await BlogPost.countDocuments();
    
    // 获取分页数据
    const posts = await BlogPost.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBlogPostById = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username email');
    
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    const comments = await Comment.find({ post: post._id })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    
    res.json({
      ...post.toObject(),
      comments,
    });
  } catch (err) {
    next(err);
  }
};

exports.createBlogPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      res.status(400);
      throw new Error('Title and content are required');
    }
    
    const post = await BlogPost.create({
      title,
      content,
      author: req.user._id,
    });
    
    const populatedPost = await BlogPost.findById(post._id)
      .populate('author', 'username email');
    
    res.status(201).json(populatedPost);
  } catch (err) {
    next(err);
  }
};

exports.updateBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this post');
    }
    
    const { title, content } = req.body;
    
    post.title = title || post.title;
    post.content = content || post.content;
    
    const updatedPost = await post.save();
    
    const populatedPost = await BlogPost.findById(updatedPost._id)
      .populate('author', 'username email');
    
    res.json(populatedPost);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      res.status(404);
      throw new Error('Blog post not found');
    }
    
    if (post.author.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this post');
    }
    
    await Comment.deleteMany({ post: post._id });
    
    await post.deleteOne();
    
    res.json({ message: 'Blog post and associated comments deleted successfully' });
  } catch (err) {
    next(err);
  }
};
