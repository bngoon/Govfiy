import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CandidateList from './pages/CandidateList.jsx';
import CandidateListAssignment from './pages/CandidateAssignment.jsx';
import JobPostingPage from './pages/JobPostingPage.jsx';
import SignIn from './pages/SignIn.jsx';
import NavBar from './components/NavBar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggle = () => {
    setIsRegistering(prev => !prev);
  };

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            isRegistering ?
              <Register onSignInToggle={handleToggle} /> :
              <SignIn onRegisterToggle={handleToggle} />
          }
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/candidate-list"
          element={<ProtectedRoute element={<CandidateList />} />}
        />
        <Route
          path="/candidate-list-assignment"
          element={<ProtectedRoute element={<CandidateListAssignment />} />}
        />
        <Route
          path="/job-posting"
          element={<ProtectedRoute element={<JobPostingPage />} />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
};

export default App;
