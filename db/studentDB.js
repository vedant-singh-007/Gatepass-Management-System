import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const studentConnection = mongoose.createConnection(process.env.MONGO_URI_STUDENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

studentConnection.on('connected', () => {
  console.log('✅ Student DB connected');
});
studentConnection.on('error', (err) => {
  console.error('❌ Student DB connection error:', err);
});

export default studentConnection;
