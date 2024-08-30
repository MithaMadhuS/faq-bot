const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.post('/ask', faqController.askQuestion);

module.exports = router;
