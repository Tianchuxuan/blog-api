const express = require('express');
const { createMessage, getAllMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', createMessage);
router.get('/', protect, getAllMessages);

module.exports = router;
