const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  type: String,
  options: [String],
});

const questionnaireSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [questionSchema],
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);
