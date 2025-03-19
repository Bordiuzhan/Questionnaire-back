const express = require('express');
const Questionnaire = require('../models/questionnaire');

const router = express.Router();

// Create a new questionnaire
router.post('/', async (req, res) => {
  try {
    const newQuestionnaire = new Questionnaire(req.body);
    await newQuestionnaire.save();
    res.status(201).json(newQuestionnaire);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all questionnaires
router.get('/', async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find();

    // Додаємо кількість завершень для кожної анкети
    const questionnairesWithCompletions = await Promise.all(
      questionnaires.map(async (questionnaire) => {
        const completions = await Response.countDocuments({
          questionnaireId: questionnaire._id,
        });
        return {
          ...questionnaire.toObject(),
          completions, // Додаємо поле completions
        };
      })
    );

    res.json(questionnairesWithCompletions);
  } catch (err) {
    res.status(500).json({ error: 'Помилка при отриманні анкет' });
  }
});

// Get a single questionnaire by ID
router.get('/:id', async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findById(req.params.id);
    if (!questionnaire) return res.status(404).json({ error: 'Not found' });
    res.json(questionnaire);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a questionnaire
router.put('/:id', async (req, res) => {
  try {
    const updated = await Questionnaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a questionnaire
router.delete('/:id', async (req, res) => {
  try {
    await Questionnaire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
