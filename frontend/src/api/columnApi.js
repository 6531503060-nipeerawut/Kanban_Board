import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api/columns`;

export const fetchColumns = async (boardId, token) =>
  axios.get(`${API}/${boardId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createColumn = async (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const updateColumn = async (columnId, data, token) =>
  axios.put(`${API}/${columnId}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteColumn = async (columnId, token) =>
  axios.delete(`${API}/${columnId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });