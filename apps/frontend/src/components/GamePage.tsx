import React from 'react';

import Game from './Game';
import Header from './Header';

const GamePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Game />
      </div>
    </div>
  );
};

export default GamePage;
