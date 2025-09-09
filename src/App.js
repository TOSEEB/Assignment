import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobList from './components/JobList';
import JobDetails from './components/JobDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/job/:id" element={<JobDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
