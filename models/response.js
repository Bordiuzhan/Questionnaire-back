const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  questionnaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire',
    required: true,
  },
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      answer: mongoose.Schema.Types.Mixed, // Може бути рядок або масив (для multiple-choice)
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Response', responseSchema);
