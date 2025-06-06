import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../index.css';
import '../App.css';

const GuardDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Fetch all pending requests
  useEffect(() => {
    fetch('http://localhost:3000/guards/requests',{method: 'GET'})
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        console.log("Fetched requests:", data);
      })
      .catch(err => {
        console.error("Error fetching requests:", err);
      });
  }, []);

  
  const handleApprove = async (requestId) => {
    try {
      const res = await fetch(`http://localhost:3000/requests/${requestId}`, {
        method: 'PATCH'
      });

      if (res.ok) {
        // remove the approved request from the local state
        setRequests(prev => prev.filter(req => req._id !== requestId));
      } else {
        console.error("Failed to approve");
      }
    } catch (err) {
      console.error("Error approving request:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-blue-700 mb-8"
      >
        Guard Dashboard – Pending Gatepass Requests
      </motion.h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {requests.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No pending requests found.</p>
        ) : (
          requests.map((req) => (
            <motion.div
              key={req._id}
              className="bg-white shadow-lg rounded-xl p-5 flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="font-semibold">Student ID: {req.studentId}</p>
                <p className="text-sm text-gray-600">Purpose: {req.purpose}</p>
                <p className="text-sm text-gray-600">Destination: {req.destination}</p>
                <p className="text-sm text-gray-600">Time: {req.time}</p>
                <p className="text-sm text-gray-600">Luggages: {req.luggages}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleApprove(req._id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition"
              >
                Approve
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuardDashboard;
