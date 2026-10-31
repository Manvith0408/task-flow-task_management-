import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(onTaskEvent) {
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    socketRef.current = io('http://localhost:5000', {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('taskCreated', (task) => {
      if (onTaskEvent) onTaskEvent('created', task);
    });

    socket.on('taskUpdated', (task) => {
      if (onTaskEvent) onTaskEvent('updated', task);
    });

    socket.on('taskDeleted', (taskId) => {
      if (onTaskEvent) onTaskEvent('deleted', taskId);
    });

    socket.on('connect_error', (err) => {
      console.log('Socket connection error:', err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [onTaskEvent]);

  return socketRef;
}
