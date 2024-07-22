import React, { useEffect, useRef, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface ChatMessagesProps {
  messages: { sender: string; message: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const { wsMessages, sendMessage, isConnected } = useWebSocket();
  const [allMessages, setAllMessages] = useState<{ sender: string; message: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    if (isConnected) {
      console.log('通信を行います');
      sendMessage({
        message_type: 'initialization',
        game_type: 'tow_truth_a_lie',
        sender: 'system'
      });
    }
  }, [isConnected, sendMessage]);

  useEffect(() => {
    // messagesが更新されたときにallMessagesに追加
    setAllMessages(prevMessages => [...prevMessages, ...messages]);
    console.log(allMessages)
  }, [messages]);

  useEffect(() => {
    // wsMessagesが更新されたときにallMessagesに追加
    setAllMessages(prevMessages => [...prevMessages, ...wsMessages]);
  }, [wsMessages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 text-white p-4">
      <p>ゲームを開始します</p>
      {allMessages.map((message, index) => (
        <p key={index} className="mb-4">
          <strong>{message.sender}:</strong> {message.message}
        </p>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
