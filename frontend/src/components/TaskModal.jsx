import { useState } from 'react';
import { updateTask } from '../api/taskApi';

export default function TaskModal({ task, onClose, token, onSave }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [position, setPosition] = useState(task.position); // <-- NEW

  const handleSave = async () => {
    await updateTask(task.id, { title, description, position }, token);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          className="w-full border rounded px-3 py-2 mb-3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
        />

        <input
          type="number"
          className="w-full border rounded px-3 py-2 mb-3"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          placeholder="Position"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}