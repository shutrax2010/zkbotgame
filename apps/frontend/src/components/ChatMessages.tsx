import React, { useEffect, useRef } from 'react';

interface ChatMessagesProps {
  messages: { sender: string; message: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 text-white p-4">
      {messages.map((msg, index) => (
        <p key={index} className="mb-4">
          <strong>{msg.sender}:</strong> {msg.message}
        </p>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
