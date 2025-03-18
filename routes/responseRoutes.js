const express = require('express');
const Response = require('../models/response');

const router = express.Router();
// Submit a response
router.post('/', async (req, res) => {
  try {
    const newResponse = new Response(req.body);
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all responses for a questionnaire
router.get('/:questionnaireId', async (req, res) => {
  try {
    const responses = await Response.find({
      questionnaireId: req.params.questionnaireId,
    });
    res.json(responses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
