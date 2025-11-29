const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

router.get('/', getPosts); // public
router.get('/:id', getPostById); // public
router.post('/', auth, createPost); // protected
router.put('/:id', auth, updatePost); // protected (author only)
router.delete('/:id', auth, deletePost); // protected (author only)

module.exports = router;
