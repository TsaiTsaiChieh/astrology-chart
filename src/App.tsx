import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BirthChartPage from './pages/BirthChartPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/birth-chart" element={<BirthChartPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;