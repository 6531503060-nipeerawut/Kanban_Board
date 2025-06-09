import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Column from '../components/Column';
import AddColumnForm from '../components/AddColumnForm';
import { useParams } from 'react-router-dom';

const BoardPage = () => {
  const { boardId } = useParams();
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchColumns = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/columns/${boardId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setColumns(res.data);
    } catch (err) {
      console.error('Failed to fetch columns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddColumn = async (name) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/columns`,
        { board_id: boardId, name, position: columns.length },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setColumns((prev) => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add column:', err);
    }
  };

  const handleUpdateColumn = async (columnId, updatedName) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/columns/${columnId}`,
        { name: updatedName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId ? { ...col, name: updatedName } : col
        )
      );
    } catch (err) {
      console.error('Failed to update column:', err);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/columns/${columnId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setColumns((prev) => prev.filter((col) => col.id !== columnId));
    } catch (err) {
      console.error('Failed to delete column:', err);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [boardId]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📋 Board #{boardId}</h1>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {loading ? (
          <p>Loading columns...</p>
        ) : (
          <>
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                token={localStorage.getItem('token')}
                onUpdate={handleUpdateColumn}
                onDelete={handleDeleteColumn}
              />
            ))}
            <AddColumnForm onAdd={handleAddColumn} />
          </>
        )}
      </div>
    </div>
  );
};

export default BoardPage;