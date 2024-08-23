import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { WalletProvider } from './contexts/WalletContext';

import GamePage from './components/GamePage';
import Top from './components/Top';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};

export default App;
