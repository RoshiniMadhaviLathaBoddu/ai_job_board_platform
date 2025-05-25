import API from './api';

export const getAllJobs = async () => {
  const res = await API.get('/jobs');
  return res.data;
};

export const getJobById = async (id) => {
  const res = await API.get(`/jobs/${id}`);
  return res.data;
};

export const createJob = async (jobData) => {
  const res = await API.post('/jobs', jobData);
  return res.data;
};

export const updateJob = async (id, jobData) => {
  const res = await API.put(`/jobs/${id}`, jobData);
  return res.data;
};

export const deleteJob = async (id) => {
  const res = await API.delete(`/jobs/${id}`);
  return res.data;
};

