import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import getStudentModel from '../models/StudentloginSystem.js';
import studentConnection from '../db/studentDB.js';
import getDatabaseModel from '../models/Gatepass.js';
import databaseConnection from '../db/gatepassDB.js';
import { authenticateJWT } from '../middleware/auth.js';

const Student = getStudentModel(studentConnection);
const GatePass = getDatabaseModel(databaseConnection);

const router = express.Router();

// ✅ PUBLIC: Register
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

// ✅ PUBLIC: Login and Issue JWT
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

    const token = jwt.sign(
      { studentId: student.studentId, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔒 Apply Authentication Middleware Globally Below This Line
router.use(authenticateJWT);

// ✅ PROTECTED: Submit Gatepass
router.post('/form', async (req, res) => {
  const {
    name,
    hostelBlock,
    date,
    time,
    purpose,
    luggages,
    destination,
    status = 'Pending'
  } = req.body;

  const studentId = req.user.studentId; // Extracted from JWT

  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not registered' });
    }

    const existingRequest = await GatePass.findOne({ studentId, status: 'Pending' });
    if (existingRequest) {
      return res.status(400).json({ error: 'You already have a pending request.' });
    }

    const newGatePass = new GatePass({
      studentId,
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
  } catch (err) {
    console.error("Error during gate pass submission:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ PROTECTED: View Gatepass Requests
router.get('/requests', async (req, res) => {
  const studentId = req.user.studentId;

  try {
    const requests = await GatePass.find({ studentId });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
