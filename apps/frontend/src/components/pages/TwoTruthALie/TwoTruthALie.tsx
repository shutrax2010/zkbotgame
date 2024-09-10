import React, { useEffect, useState } from 'react';

import { MessageChat, MessageResult } from '@interfaces/WSMessage';
import useWebSocket from '@hooks/useWebSocket';

import ChatInput from '@components/ChatInput';
import ChatMessages from '@components/ChatMessages';
import Modal from '@components/Modal';
import MainLayout from '@components/templates/MainLayout';

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
   * @param {boolean} isShowMessage - メッセージを表示するか
   */
  const handleSendMessage = (messageObject: MessageChat, isShowMessage: boolean) => {
    // WebSocketにメッセージを送信
    sendWsMessage(messageObject);

    // ローカルにメッセージを追加
    if (isShowMessage) {
      addMessage('You', messageObject.message);
    }
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
    if (!wsMessage) {
      return;
    }

    if (wsMessage.message_type === 'result') {
      const resultMessage = wsMessage as MessageResult;
      setModalMessage(resultMessage.result === 'success' ? 'Congratulations!' : 'Better luck next time!');
      setIsModalVisible(true);

      return;
    }

    addMessage(wsMessage.sender, wsMessage.message);
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
    <MainLayout>
      <div className="flex flex-1 flex-col justify-end bg-gray-800">
        {/* モーダル */}
        {isModalVisible && <Modal message={modalMessage} onClose={closeModal} />}

        <ChatMessages messages={messages} />
        <ChatInput isFirstRender={isFirstRender} onStartGame={handleStartGame} onSendMessage={handleSendMessage} />
      </div>
    </MainLayout>
  );
};

export default Game;