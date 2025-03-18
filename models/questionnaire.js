const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  type: String, // text, multiple-choice, checkbox, etc.
  options: [String], // for multiple-choice or checkbox
});

const questionnaireSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
