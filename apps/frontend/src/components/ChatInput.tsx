import React, { useState } from 'react';

import { MessageChat } from '@interfaces/WSMessage';
import { modes, ModeType } from '@interfaces/modes';

import Button from '@components/Button';

/**
 * 選択肢管理オブジェクト
 */
const initialOptions = {
  one: {
    value: '1',
    isSelected: false
  },
  two: {
    value: '2',
    isSelected: false
  },
  three: {
    value: '3',
    isSelected: false
  }
};

interface ChatInputProps {
  isFirstRender: boolean;
  onStartGame: () => void;
  onSendMessage: (messageObject: MessageChat, isShowMessage: boolean) => void;
  mode: ModeType;
  setMode: React.Dispatch<React.SetStateAction<ModeType>>;
}

const ChatInput: React.FC<ChatInputProps> = ({ isFirstRender, onStartGame, onSendMessage, mode, setMode }) => {
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [options, setOptions] = useState(initialOptions);

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
   * 選択肢選択時のイベントハンドラ
   */
  const handleSelectNumber = (key: 'one' | 'two' | 'three') => {
    // 選択状態をリセットして、押下されたオプションを選択する
    setOptions(prevOptions => ({
      ...prevOptions,
      one: { ...prevOptions.one, isSelected: key === 'one' },
      two: { ...prevOptions.two, isSelected: key === 'two' },
      three: { ...prevOptions.three, isSelected: key === 'three' }
    }));
  };

  /**
   * メッセージ送信
   */
  const handleSendMessage = () => {
    // Question-mode、かつ入力内容が空の場合
    if (mode === 'question' && !input.trim()) {
      return;
    }

    let messageToSend = '';

    // Answer-modeの場合、選択されたオプションの値を取得
    if (mode === 'answer') {
      const selectedOption = Object.values(options).find(option => option.isSelected);
      if (!selectedOption) {
        return; // 何も選択されていない場合、送信しない
      }

      messageToSend = selectedOption.value;
    } else {
      messageToSend = input;
    }

    onSendMessage(
      {
        message_type: modes[mode].messageType,
        message: messageToSend,
        sender: 'user1'
      },
      mode === 'question'
    );

    // 入力内容初期化
    setInput('');
    setOptions(initialOptions);
  };

  /**
   * モード切替
   */
  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'question' ? 'answer' : 'question'));
  };

  return (
    <div className="flex items-center bg-gray-700 p-4">
      {isFirstRender ? (
        <Button value="CLICK to START" onClick={onStartGame} className="flex-1 bg-gray-600" />
      ) : (
        <>
          {/* 切り替えボタン */}
          <Button value="Q ↔︎ A" onClick={toggleMode} className=" w-30 bg-purple-500" />

          {/* 入力部分 */}
          {mode === 'question' ? (
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              className="flex-1 p-2 px-4 mx-2 rounded-full bg-gray-600 text-white"
              placeholder="Type your message"
            />
          ) : (
            <div className="flex flex-1 mx-2 justify-center">
              {Object.keys(options).map(key => {
                const optionKey = key as keyof typeof options;
                return (
                  <Button
                    key={optionKey}
                    value={options[optionKey].value}
                    onClick={() => handleSelectNumber(optionKey)}
                    className={`mx-1 w-1/3 ${options[optionKey].isSelected ? 'bg-red-500' : 'bg-gray-600'}`}
                  />
                );
              })}
            </div>
          )}

          {/* 送信ボタン */}
          <Button
            value={modes[mode].buttonLabel}
            onClick={handleSendMessage}
            className={`w-10 ${modes[mode].bgColor}`}
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;
