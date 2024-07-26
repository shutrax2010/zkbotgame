/**
 * ゲーム開始メッセージの型定義
 */
export interface MessageGameStart {
  message_type: 'initialization';
  game_type: string;
  sender: string;
}

/**
 * チャットメッセージの型定義
 */
export interface MessageChat {
  message_type: 'chat' | 'answer';
  message: string;
  sender: string;
}

/**
 * 結果メッセージの型定義
 *
 * TODO: failedが正(要API側修正)
 */
export interface MessageResult {
  message_type: 'result';
  result: 'success' | 'faild';
  sender: string;
}

export type WebSocketMessageToSend = MessageGameStart | MessageChat;
export type WebSocketMessageToReceive = MessageChat | MessageResult;
