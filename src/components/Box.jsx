import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have Tailwind CSS set up in your project
import '../App.css';

function Box() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col-reverse items-center justify-center bg-gray-100 mx-4">
      <div className="outerbox ">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-lg text-center">
      
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Welcome to Gatepass Management System
        </h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/student-login')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login as Student
          </button>
          <button
            onClick={() => navigate('/guard-login')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Login as Guard
          </button>
        </div>
      </div>
      </div>
    </div>

  );
}

export default Box;
