import mongoose from 'mongoose';

const guardSchema = new mongoose.Schema({
  guardId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default function getGuardModel(connection) {
  return connection.model('Guard', guardSchema);
}
