import { useState } from 'react';
import { createColumn } from '../api/columnApi';

export default function AddColumnForm({ boardId, token, onRefresh, currentLength }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await createColumn({ board_id: boardId, name, position: currentLength }, token);
    setName("");
    onRefresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-4 w-64">
      <h3 className="font-semibold mb-2">Add Column</h3>
      <input
        type="text"
        placeholder="Column name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-2 py-1 rounded mb-2"
      />
      <button type="submit" className="w-full bg-green-500 text-white py-1 rounded">Add</button>
    </form>
  );
}