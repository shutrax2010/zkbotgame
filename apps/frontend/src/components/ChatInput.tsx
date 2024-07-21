import React, { useState } from 'react';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      console.log('Send message:', input);
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-gray-700 flex flex-shrink-0">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 p-2 mr-2 rounded-full bg-gray-600 text-white"
        placeholder="メッセージを入力してください"
      />
      <button onClick={sendMessage} className="p-2 w-10 h-10 bg-blue-600 rounded-full text-white">
        送
      </button>
    </div>
  );
};

export default ChatInput;
