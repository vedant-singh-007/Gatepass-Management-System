import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import studentRoutes from '../routes/student.js';
import guardRoutes from '../routes/guard.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect both databases
import studentConnection from '../db/studentDB.js';
import guardConnection from '../db/guardDB.js';
import databaseconnection from '../db/gatepassDB.js';
import getDatabaseModel from '../models/Gatepass.js';

// Wait for both connections before starting the server
const startServer = async () => {
  try {
    // Check if both are connected
    await Promise.all([
      new Promise((resolve, reject) => {
        studentConnection.once('open', resolve);
        studentConnection.on('error', reject);
      }),
      new Promise((resolve, reject) => {
        guardConnection.once('open', resolve);
        guardConnection.on('error', reject);
      }),
      new Promise((resolve, reject) => {
        databaseconnection.once('open', resolve);
        databaseconnection.on('error', reject);
      })
    ]);

    console.log('Both Student and Guard databases connected successfully.');
    console.log('Gate Pass database connected successfully.');

    // Define routes
    app.use('/student', studentRoutes);
    app.use('/guards', guardRoutes);

    const GatePass = getDatabaseModel(databaseconnection)
app.patch('/requests/:id', async (req, res) => {
  try {
    const updated = await GatePass.findByIdAndUpdate(req.params.id, { status: 'Approved' });
    res.status(200).json({ message: 'Request approved' });
  } catch (err) {
    console.error("Error updating request:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

    // Start server
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  } catch (error) {
    console.error('Error connecting to databases:', error);
  }
};

startServer();
