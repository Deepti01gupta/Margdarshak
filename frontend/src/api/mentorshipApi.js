import api from './axiosConfig';
export const requestMentorship = (data)   => api.post('/api/mentorship/request', data).then(r => r.data);
export const getMyRequests     = ()       => api.get('/api/mentorship/requests').then(r => r.data);
export const acceptRequest     = (id)     => api.put(`/api/mentorship/requests/${id}/accept`).then(r => r.data);
export const rejectRequest     = (id)     => api.put(`/api/mentorship/requests/${id}/reject`).then(r => r.data);
export const getChatHistory    = (roomId) => api.get(`/api/mentorship/chat/${roomId}`).then(r => r.data);
export const bookSession       = (data)   => api.post('/api/mentorship/sessions/book', data).then(r => r.data);
