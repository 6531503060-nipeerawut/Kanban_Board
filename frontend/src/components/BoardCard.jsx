import { Link } from "react-router-dom";

export default function BoardCard({ board, onDelete }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center">
      <Link to={`/boards/${board.id}`} className="text-lg font-medium hover:underline">
        {board.name}
      </Link>
      <button
        onClick={() => onDelete(board.id)}
        className="text-red-600 hover:text-red-800 text-sm"
      >
        Delete
      </button>
    </div>
  );
}