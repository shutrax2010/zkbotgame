import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { WalletProvider } from '@contexts/WalletContext';

import TwoTruthAlie from '@components/pages/TwoTruthALie/TwoTruthALie';
import Top from '@components/pages/Top/Top';

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/game/towTruthALie" element={<TwoTruthAlie />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};

export default App;
