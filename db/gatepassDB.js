import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const gatepassConnection = mongoose.createConnection(process.env.MONGO_URI_GATEPASS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

gatepassConnection.on('connected', () => {
  console.log('✅ Gate Pass DB connected');
});

gatepassConnection.on('error', (err) => {
  console.error('❌ Gate Pass DB connection error:', err);
});

export default gatepassConnection;
