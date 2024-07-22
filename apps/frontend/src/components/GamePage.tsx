import React from 'react';

import Game from './Game';
import Header from './Header';
import SideBar from './SideBar';

const GamePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <Game />
      </div>
    </div>
  );
};

export default GamePage;
