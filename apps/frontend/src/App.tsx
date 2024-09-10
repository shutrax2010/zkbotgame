import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { WalletProvider } from '@contexts/WalletContext';

import TwoTruthALie from '@components/pages/TwoTruthALie/TwoTruthALie';
import Top from '@components/pages/Top/Top';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/game/twoTruthALie" element={<TwoTruthALie />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};

export default App;
