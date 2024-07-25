import React, { useEffect, useState } from 'react';

import useWebSocket from '../hooks/useWebSocket';

import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

const Game: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const { sendWsMessage, wsMessage } = useWebSocket();
  const [isFirstRender, setIsFirstRender] = useState(true);

  const addMessage = (sender: string, message: string) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const handleSendMessage = (message: string) => {
    // WebSocketにメッセージを送信
    sendWsMessage({
      message_type: 'chat',
      message,
      sender: 'user1'
    });

    // ローカルにメッセージを追加
    addMessage('あなた', message);
  };

  const handleStartGame = () => {
    sendWsMessage({
      message_type: 'initialization',
      game_type: 'two_truth_a_lie',
      sender: 'system'
    });

    setIsFirstRender(false);
  };

  useEffect(() => {
    if (wsMessage) {
      addMessage(wsMessage.sender, wsMessage.message);
    }
  }, [wsMessage]);

  return (
    <div className="flex flex-1 flex-col justify-end bg-gray-800">
      <ChatMessages messages={messages} />
      <ChatInput isFirstRender={isFirstRender} onStartGame={handleStartGame} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Game;
