import { useState } from 'react';
import { deleteTask } from '../api/taskApi';
import TaskModal from './TaskModal';
import TaskAssigneeModal from './TaskAssigneeModal';

export default function TaskCard({ task, token, onRefresh }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showAssigneeModal, setShowAssigneeModal] = useState(false);

  const handleDelete = async () => {
    if (confirm('Delete this task?')) {
      await deleteTask(task.id, token);
      onRefresh();
    }
  };

  return (
    <>
      <div
        onClick={() => setShowTaskModal(true)}
        className="bg-white p-2 rounded shadow hover:shadow-md cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">{task.title}</span>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowAssigneeModal(true)}
            title="Manage Assignees"
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            👥
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm"
            title="Delete Task"
          >
            ✕
          </button>
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          task={task}
          token={token}
          onClose={() => setShowTaskModal(false)}
          onSave={onRefresh}
        />
      )}

      {showAssigneeModal && (
        <TaskAssigneeModal
          taskId={task.id}
          token={token}
          onClose={() => setShowAssigneeModal(false)}
        />
      )}
    </>
  );
}