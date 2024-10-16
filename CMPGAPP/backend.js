// Server-side (Express + MongoDB)
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const AssignmentSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  description: String,
  studentNumber: String,  // or any other identifier
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

// Endpoint to get assignments for a user
app.get('/api/assignments/:studentNumber', async (req, res) => {
  try {
    const { studentNumber } = req.params;
    const assignments = await Assignment.find({ studentNumber });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching assignments' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
