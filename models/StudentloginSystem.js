import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Function to create the Student model with a given connection
export default function getStudentModel(connection) {
  return connection.model('Student', studentSchema);
}
