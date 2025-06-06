import mongoose from 'mongoose';

const guardConnection = mongoose.createConnection('mongodb://localhost:27017/GuardloginSystem', {

});

guardConnection.on('connected', () => {
  console.log('Guard DB connected');
});

guardConnection.on('error', (err) => {
  console.error('Guard DB connection error:', err);
});

export default guardConnection;
