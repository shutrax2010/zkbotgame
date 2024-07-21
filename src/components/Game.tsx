import React from 'react';

import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Game: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col justify-end bg-gray-800">
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default Game;
