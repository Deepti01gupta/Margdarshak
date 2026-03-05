// Constants
export const ROLES = { STUDENT: 'STUDENT', ALUMNI: 'ALUMNI', ADMIN: 'ADMIN' };
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
export const WS_URL   = import.meta.env.VITE_WS_URL  || 'ws://localhost:8080/ws/chat';

export const NAV_ITEMS = [
  { label: 'Company',     path: '/company',     icon: '🏢' },
  { label: 'Preparation', path: '/preparation', icon: '📚' },
  { label: 'Alumni',      path: '/alumni',      icon: '🤝' },
  { label: 'Chatbot',     path: '/chatbot',     icon: '🤖' },
];
