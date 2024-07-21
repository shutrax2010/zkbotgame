import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import GamePage from './components/GamePage';
import Top from './components/Top';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
};

export default App;
