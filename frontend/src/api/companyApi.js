import api from './axiosConfig';
export const getAllCompanies   = ()   => api.get('/api/companies').then(r => r.data);
export const getCompanyById   = (id) => api.get(`/api/companies/${id}`).then(r => r.data);
export const getHiringPattern = (id) => api.get(`/api/companies/${id}/hiring-pattern`).then(r => r.data);
export const getUpcomingDrives= ()   => api.get('/api/companies/upcoming-drives').then(r => r.data);
export const searchCompanies  = (q)  => api.get(`/api/companies/search?q=${q}`).then(r => r.data);
