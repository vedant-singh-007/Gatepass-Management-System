import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const guardConnection = mongoose.createConnection(process.env.MONGO_URI_GUARD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

guardConnection.on('connected', () => {
  console.log('✅ Guard DB connected');
});
guardConnection.on('error', (err) => {
  console.error('❌ Guard DB connection error:', err);
});

export default guardConnection;
