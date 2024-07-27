import React, { useState } from 'react';

import { MessageChat } from '../utils/types/WSMessage';

/**
 * モード管理オブジェクト
 */
const modes = {
  question: {
    modeLabel: 'Question-mode',
    buttonLabel: 'Q',
    messageType: 'chat' as 'chat',
    bgColor: 'bg-blue-500'
  },

  answer: {
    modeLabel: 'Answer-mode',
    buttonLabel: 'A',
    messageType: 'answer' as 'answer',
    bgColor: 'bg-red-500'
  }
};

interface ChatInputProps {
  isFirstRender: boolean;
  onStartGame: () => void;
  onSendMessage: (messageObject: MessageChat) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ isFirstRender, onStartGame, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [mode, setMode] = useState<'answer' | 'question'>('question');

  /**
   * キーダウン時のイベントハンドラ
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} e - キーボードイベント
   */
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

  /**
   * メッセージ送信
   */
  const handleSendMessage = () => {
    // 入力内容が空の場合
    if (!input.trim()) {
      return;
    }

    onSendMessage({
      message_type: modes[mode].messageType,
      message: input,
      sender: 'user1'
    });

    // 入力内容初期化
    setInput('');
  };

  /**
   * モード切替
   */
  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'question' ? 'answer' : 'question'));
  };

  return (
    <div className="relative flex flex-col">
      <div className="absolute bottom-16 mb-2 flex">
        <div className="relative">
          <p className={`text-white px-2 py-1 ${modes[mode].bgColor}`}>
            {/* モード表示 */}
            {modes[mode].modeLabel}
          </p>
        </div>
      </div>

      <div className="flex items-center bg-gray-700 p-4">
        {isFirstRender ? (
          <button onClick={onStartGame} className="flex-1 p-2 rounded-full bg-gray-600 text-white">
            Click to Start
          </button>
        ) : (
          <>
            <button onClick={toggleMode} className="p-2 w-30 h-10 bg-purple-500 rounded-full text-white">
              Q ↔︎ A
            </button>

            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              className="flex-1 p-2 px-4 mx-2 rounded-full bg-gray-600 text-white"
              placeholder="Type your Message"
            />

            <button
              onClick={handleSendMessage}
              className={`p-2 w-10 h-10 rounded-full text-white ${modes[mode].bgColor}`}
            >
              {modes[mode].buttonLabel}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
