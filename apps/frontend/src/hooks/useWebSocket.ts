import { useEffect, useRef, useState, useCallback } from 'react';

const WEBSOCKET_URL = 'ws://localhost:8080/api/ws';

export const useWebSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const [wsMessages, setWsMessages] = useState<{ sender: string, message: string }[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connection established');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data); // デバッグ用
      setWsMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (isConnected && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Ready state is:', socketRef.current ? socketRef.current.readyState : 'null');
    }
  }, [isConnected]);

  return { wsMessages, sendMessage, isConnected };
};
