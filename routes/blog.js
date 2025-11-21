const express = require('express');
const {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');
const {
  getCommentsByPostId,
  createComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllBlogPosts);
router.post('/', protect, createBlogPost);

router.get('/:postId/comments', getCommentsByPostId);
router.post('/:postId/comments', protect, createComment);

router.get('/:id', getBlogPostById);
router.put('/:id', protect, updateBlogPost);
router.delete('/:id', protect, deleteBlogPost);

module.exports = router;
