import { useEffect, useRef, useState, useCallback } from 'react';
import { WebSocketMessageToSend, WebSocketMessageToReceive } from '@interfaces/WSMessage';

type WebSocketStatus = 'connecting' | 'open' | 'closing' | 'closed' | 'error';

const WEBSOCKET_URL = 'ws://localhost:8080/api/ws';

function useWebSocket() {
  const [status, setStatus] = useState<WebSocketStatus>('connecting');
  const [message, setMessage] = useState<WebSocketMessageToReceive | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => setStatus('open');
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessageToReceive;
        setMessage(data);
      } catch (error) {
        console.error('Failed to parse message', error);
      }
    };
    socket.onclose = () => setStatus('closed');
    socket.onerror = () => setStatus('error');

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = useCallback((data: WebSocketMessageToSend) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not open. ReadyState:', socketRef.current?.readyState);
    }
  }, []);

  return {
    wsStatus: status,
    wsMessage: message,
    sendWsMessage: sendMessage
  };
}

export default useWebSocket;
