/**
 * ゲーム開始メッセージ(リクエスト)の型定義
 */
export interface MessageGameStartRequest {
  message_type: 'initialization';
  game_type: string;
  sender: 'system';
}

/**
 * ゲーム開始メッセージ(レスポンス)の型定義
 */
export interface MessageGameStartResponse {
  message_type: 'initialization';
  message: string;
  sender: 'bot';
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
 */
export interface MessageResult {
  message_type: 'result';
  result: 'success' | 'failed';
  sender: 'bot';
}

export type WebSocketMessageToSend = MessageGameStartRequest | MessageChat;
export type WebSocketMessageToReceive = MessageGameStartResponse | MessageChat | MessageResult;
