import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from './components/Box';
import StudentLogin from './components/StudentLogin';
import GuardLogin from './components/GuardLogin';
import StudentRegister from './components/StudentRegister';
import GatePassForm from './components/GatePassForm';
import StudentDashboard from './components/StudentDashboard';
import GuardRegister from './components/GuardRegister';

import GuardDashboard from './components/GuardDashboard';
import './App.css'; // Ensure you have Tailwind CSS set up in your project
import './index.css'; // Ensure you have Tailwind CSS set up in your project


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Box />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/Guard-login" element={<GuardLogin />} />
        <Route path="/register-as-Student" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> 
        <Route path="/register-as-guard" element={<GuardRegister />} />
        <Route path="/gatepass-form" element={<GatePassForm />} />
        <Route path="/guard-dashboard" element={<GuardDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
