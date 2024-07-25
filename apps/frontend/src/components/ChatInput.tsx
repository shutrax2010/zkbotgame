import React, { useState } from 'react';

interface ChatInputProps {
  isFirstRender: boolean;
  onStartGame: () => void;
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ isFirstRender, onStartGame, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 入力補完中の場合
    if (isComposing) {
      return;
    }

    // Enter押下の場合
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    // 入力内容が空の場合
    if (!input.trim()) {
      return;
    }

    onSendMessage(input);

    // 入力内容初期化
    setInput('');
  };

  return (
    <div className="flex p-4 bg-gray-700 flex-shrink-0 items-center">
      {isFirstRender ? (
        <button onClick={onStartGame} className="flex-1 p-2 mr-2 rounded-full bg-gray-600 text-white">
          ゲームを開始
        </button>
      ) : (
        <>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="flex-1 p-2 mr-2 rounded-full bg-gray-600 text-white"
            placeholder="メッセージを入力してください"
          />
          <button onClick={handleSendMessage} className="p-2 w-10 h-10 bg-blue-600 rounded-full text-white">
            送
          </button>
        </>
      )}
    </div>
  );
};

export default ChatInput;
