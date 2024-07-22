import React, { useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface ChatInputProps {
  addMessage: (sender: string, message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ addMessage }) => {
  const [input, setInput] = useState('');
  const { sendMessage } = useWebSocket();

  const handleSendMessage = () => {
    if (input.trim()) {
      // メッセージをWebSocketに送信
      sendMessage({ message_type: 'chat', message: 'どれが嘘ですか？', sender: 'user1' });

      // メッセージ表示
      addMessage('あなた', input);

      // input初期化
      setInput('');
    }
  };

  return (
    <div className="flex p-4 bg-gray-700 flex-shrink-0 items-center">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="flex-1 p-2 mr-2 rounded-full bg-gray-600 text-white"
        placeholder="メッセージを入力してください"
      />
      <button onClick={handleSendMessage} className="p-2 w-10 h-10 bg-blue-600 rounded-full text-white">
        送
      </button>
    </div>
  );
};

export default ChatInput;
