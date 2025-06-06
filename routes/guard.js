import express from 'express';
import bcrypt from 'bcrypt';
import getGuardModel from '../models/GuardloginSystem.js';
import guardConnection from '../db/guardDB.js';
import getDatabaseModel from '../models/Gatepass.js';
import databaseConnection from '../db/gatepassDB.js';


const Guard = getGuardModel(guardConnection);
const router = express.Router();

const GatePass = getDatabaseModel(databaseConnection);

router.post('/register', async (req, res) => {
  const { guardId, password } = req.body;
  try {
    const existingGuard = await Guard.findOne({ guardId });
    if (existingGuard) {
      return res.status(400).json({ error: 'Guard already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newGuard = new Guard({ guardId, password: hashedPassword });
    await newGuard.save();

    res.status(201).json({ message: 'Guard registered' });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { guardId, password } = req.body;
  try {
    const guard = await Guard.findOne({ guardId });
    if (!guard) {
      return res.status(404).json({ error: 'Guard not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, guard.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', guardId: guard.guardId });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/requests', async (req, res) => {
  try {
    const requests = await GatePass.find({ status: 'Pending' }).sort({ date: -1 });
    if (!requests || requests.length === 0) {
      return res.status(404).json({ error:'No pending requests found'});
    }
    res.status(200).json(requests);
    console.log("Fetched requests:", requests);
  } 
  catch (err) 
  {
    console.error("Error fetching requests:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);

export default router;
