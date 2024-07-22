import React, { useState } from 'react';

import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Game: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  const addMessage = (sender: string, message: string) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  return (
    <div className="flex flex-1 flex-col justify-end bg-gray-800">
      <ChatMessages messages={messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
};

export default Game;
