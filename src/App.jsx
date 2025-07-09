import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './components/pages/homepage';
import Dashboard from './components/pages/Dashboard';
import About from './components/pages/about';
import Recent from './components/pages/Recent'
const RouteTitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const routeToTitle = {
      '/': 'SafePayAI - Home',
      '/dashboard': 'SafePayAI - Dashboard',
      '/send-money': 'SafePayAI - Send Money',
      '/transactions': 'SafePayAI - Transactions',
      '/about': 'SafePayAI - About',
    };

    const title = routeToTitle[location.pathname] || 'SafePayAI';
    document.title = title;
  }, [location]);

  return null; 
};

const App = () => {
  return (
    <Router>
      <RouteTitleUpdater />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send-money" element={<Homepage />} />
        <Route path="/transactions" element={<Recent />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    
  );
};

export default App;
