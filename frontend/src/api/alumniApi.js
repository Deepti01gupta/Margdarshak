import api from './axiosConfig';
export const getAllAlumni    = ()      => api.get('/api/alumni').then(r => r.data);
export const getAlumniById  = (id)    => api.get(`/api/alumni/${id}`).then(r => r.data);
export const getJobPostings = ()      => api.get('/api/alumni/jobs').then(r => r.data);
export const postJob        = (data)  => api.post('/api/alumni/jobs', data).then(r => r.data);
export const applyReferral  = (jobId) => api.post(`/api/alumni/jobs/${jobId}/apply`).then(r => r.data);
