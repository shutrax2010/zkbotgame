import React, { useEffect, useState } from 'react';

import { MessageChat } from '../utils/types/WSMessage';
import useWebSocket from '../utils/hooks/useWebSocket';

import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Modal from './Modal';

const Game: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const { sendWsMessage, wsMessage } = useWebSocket();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * メッセージ追加処理
   *
   * @param {string} sender - メッセージの送信者
   * @param {string} message - 送信されたメッセージ
   */
  const addMessage = (sender: string, message: string) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  /**
   * メッセージ送信ハンドラ
   *
   * @param {Message} messageObject - 送信するメッセージオブジェクト
   */
  const handleSendMessage = (messageObject: MessageChat) => {
    // WebSocketにメッセージを送信
    sendWsMessage(messageObject);

    // ローカルにメッセージを追加
    addMessage('あなた', messageObject.message);
  };

  /**
   * ゲーム開始ハンドラ
   */
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
      if (wsMessage.message_type === 'result') {
        const resultMessage = wsMessage;
        if (resultMessage.result === 'success') {
          setModalMessage('おめでとうございます！');
        } else if (resultMessage.result === 'faild') {
          setModalMessage('残念でした！');
        }

        setIsModalVisible(true);
      } else {
        addMessage(wsMessage.sender, wsMessage.message);
      }
    }
  }, [wsMessage]);

  const closeModal = () => {
    // モーダル初期化
    setModalMessage(null);
    setIsModalVisible(false);

    // 画面初期化
    setMessages([]);
    setIsFirstRender(true);
  };

  return (
    <div className="flex flex-1 flex-col justify-end bg-gray-800">
      {/* モーダル */}
      {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}

      <ChatMessages messages={messages} />
      <ChatInput isFirstRender={isFirstRender} onStartGame={handleStartGame} onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Game;
