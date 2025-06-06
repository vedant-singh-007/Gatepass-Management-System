import mongoose from 'mongoose';

const studentConnection = mongoose.createConnection('mongodb://localhost:27017/StudentloginSystem', {

});

studentConnection.on('connected', () => {
  console.log('Student DB connected');
});

studentConnection.on('error', (err) => {
  console.error('Student DB connection error:', err);
});

export default studentConnection;
