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
    <div className="flex-1 overflow-y-auto bg-gray-800 text-white p-8">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-4 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
          {/* sender */}
          <div>
            <strong>{msg.sender}</strong>
          </div>

          {/* message */}
          <div
            className={`p-2 rounded-xl whitespace-pre-wrap inline-block ${msg.sender === 'You' ? 'bg-brandColor' : 'bg-gray-700'}`}
          >
            {msg.message}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
