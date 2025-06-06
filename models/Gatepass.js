import mongoose from 'mongoose';

const gatepassdataSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
    hostelBlock: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    luggages: { type: String, required: true },
    destination: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    purpose:{ type: String, required: true },
    createdAt: { type: Date, default: Date.now }

});

// Function to create the GatePassData model with a given connection
export default function getDatabaseModel(connection) {
  return connection.model('GatePassData', gatepassdataSchema);
}
