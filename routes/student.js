import express from 'express';
import bcrypt from 'bcrypt';
import getStudentModel from '../models/StudentloginSystem.js'; // Import the function that returns the model
import studentConnection from '../db/studentDB.js'; // Import the Mongoose connection for the student DB
import getDatabaseModel from '../models/Gatepass.js';
import databaseConnection from '../db/gatepassDB.js'; // Import the Mongoose connection for the gate pass DB

const Student = getStudentModel(studentConnection); // Get the Student model using the connection
const router = express.Router();

const GatePass = getDatabaseModel(databaseConnection); // Get the GatePass model using

router.post('/register', async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ studentId, password: hashedPassword });
    await newStudent.save();

    res.status(201).json({ message: 'Student registered' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/form', async (req, res) => {
  const {
    studentId,
    name,
    hostelBlock,
    date,
    time,
    purpose,
    luggages,
    destination, // Assuming destination is also part of the form
    status = 'Pending'
  } = req.body;

  try {
    // Optional: check if student exists before accepting the gate pass
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not registered' });
    }
    const existingRequest = await GatePass.findOne({ studentId: req.body.studentId, status: 'Pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'You already have a pending request.' });
    }


    // Create a new gate pass request
    const newGatePass = new GatePass({
      studentId: studentId,
      name,
      hostelBlock,
      date,
      time,
      purpose,
      luggages,
      destination,
      status,
    });

    await newGatePass.save();

    res.status(201).json({ message: 'Gate pass request submitted successfully' });
    //go back to student dashboard and add this at the top of lists of gate passes
  } catch (err) {
    console.error("Error during gate pass submission:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', studentId: student.studentId });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/requests/:studentId', async (req, res) => {
  const { studentId } = req.params;

  if (!studentId) {
    return res.status(400).json({ error: 'Missing studentId parameter' });
  }

  const GatePass = getDatabaseModel(databaseConnection);

  try {
    const requests = await GatePass.find({ studentId });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
