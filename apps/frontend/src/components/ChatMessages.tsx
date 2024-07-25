import React, { useEffect, useRef, useState } from 'react';

interface ChatMessagesProps {
  messages: { sender: string; message: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const [allMessages, setAllMessages] = useState<{ sender: string; message: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);


  useEffect(() => {
    setAllMessages(prevMessages => [...prevMessages, ...messages]);
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-800 text-white p-4">
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
