import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api/tasks`;

export const getTasksByColumn = async (columnId, token) => {
  const res = await axios.get(`${API}/${columnId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createTask = async (task, token) => {
  await axios.post(`${API}`, task, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateTask = async (taskId, task, token) => {
  await axios.put(`${API}/${taskId}`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId, token) => {
  await axios.delete(`${API}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};