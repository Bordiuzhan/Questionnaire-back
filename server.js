const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const questionnaireRoutes = require('./routes/questionnaireRoutes');
const responseRoutes = require('./routes/responseRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://bordyujan:e6F810wbwGeEl08H@cluster0.sidkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/responses', responseRoutes);

app.listen(5100, () => console.log('Server running on port 5100'));
