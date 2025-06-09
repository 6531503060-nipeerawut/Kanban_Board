// TaskAssigneeModal.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from './Toast';

export default function TaskAssigneeModal({ taskId, token, onClose }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(new Set());

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  const fetchAssignees = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/assignments/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const currentAssignees = new Set(data.map(u => u.id));
      setSelected(currentAssignees);
    } catch (err) {
      toast.error('Failed to fetch assignees');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAssignees();
  }, [taskId]);

  const toggleUser = (userId) => {
    const updated = new Set(selected);
    if (updated.has(userId)) {
      updated.delete(userId);
    } else {
      updated.add(userId);
    }
    setSelected(updated);
  };

  const handleAssign = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/assignments/assign`,
        { taskId, userIds: Array.from(selected) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Assignees updated');
      onClose();
    } catch (err) {
      toast.error('Failed to assign users');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4">Assign Users to Task</h2>
        <ul className="space-y-2 mb-4">
          {users.map((user) => (
            <li key={user.id} className="flex items-center justify-between border px-3 py-2 rounded">
              <span>{user.name} ({user.email})</span>
              <input
                type="checkbox"
                checked={selected.has(user.id)}
                onChange={() => toggleUser(user.id)}
              />
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600 hover:underline">Cancel</button>
          <button
            onClick={handleAssign}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}