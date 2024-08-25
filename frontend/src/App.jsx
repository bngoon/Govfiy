// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CandidateList from './pages/CandidateList.jsx';
import CandidateListAssignment from './pages/CandidateAssignment.jsx';
import JobPostingPage from './pages/JobPostingPage.jsx';
import SignIn from './pages/SignIn.jsx';

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(prev => !prev);
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isRegistering ? 
          <Register onSignInToggle={handleToggle} /> : 
          <SignIn onRegisterToggle={handleToggle} />
        } 
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/candidate-list" element={<CandidateList />} />
      <Route path="/candidate-list-assignment" element={<CandidateListAssignment />} />
      <Route path="/job-posting" element={<JobPostingPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
