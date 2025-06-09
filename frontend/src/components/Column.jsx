import { useEffect, useState } from 'react';
import { updateColumn, deleteColumn } from '../api/columnApi';
import { getTasksByColumn, createTask } from '../api/taskApi';
import TaskCard from './TaskCard';

export default function Column({ column, token, onRefresh }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(column.name);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [column.id]);

  const fetchTasks = async () => {
    try {
      const res = await getTasksByColumn(column.id, token);
      setTasks(res);
    } catch (err) {
      console.error('Error loading tasks:', err);
    }
  };

  const handleUpdate = async () => {
    await updateColumn(column.id, { name }, token);
    setIsEditing(false);
    onRefresh();
  };

  const handleDelete = async () => {
    if (confirm('Delete this column?')) {
      await deleteColumn(column.id, token);
      onRefresh();
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    await createTask({ column_id: column.id, title: newTaskTitle, position: tasks.length }, token);
    setNewTaskTitle('');
    fetchTasks();
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-md w-64">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            className="px-2 py-1 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleUpdate} className="bg-blue-500 text-white rounded px-2 py-1">Save</button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg">{column.name}</h2>
            <div className="flex gap-2">
              <button onClick={() => setIsEditing(true)} className="text-sm text-blue-600">Edit</button>
              <button onClick={handleDelete} className="text-sm text-red-500">Delete</button>
            </div>
          </div>
          <div className="space-y-2 mb-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} token={token} onRefresh={fetchTasks} />
            ))}
          </div>
          <div className="mt-2">
            <input
              className="w-full px-2 py-1 border rounded mb-1"
              placeholder="New task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <button
              onClick={handleAddTask}
              className="w-full bg-green-500 text-white py-1 rounded hover:bg-green-600"
            >
              Add Task
            </button>
          </div>
        </>
      )}
    </div>
  );
}