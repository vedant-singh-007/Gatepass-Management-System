import mongoose from 'mongoose';

const databaseconnection = mongoose.createConnection('mongodb://localhost:27017/GatePassDatabase', {


});
databaseconnection.on('connected', () => {
  console.log('GatePass DB connected');
});

databaseconnection.on('error', (err) => {
  console.error('GatePass DB connection error:', err);
});

export default databaseconnection;
