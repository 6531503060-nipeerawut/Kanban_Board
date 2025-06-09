import { useEffect, useState } from "react";
import axios from "axios";
import BoardCard from "../components/BoardCard";

export default function BoardListPage() {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchBoards = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/boards`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBoards(res.data);
    } catch (err) {
      setMessage("Failed to fetch boards");
    }
  };

  const createBoard = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/boards`, { name }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBoards(prev => [...prev, res.data]);
      setName("");
    } catch (err) {
      setMessage("Failed to create board");
    }
  };

  const deleteBoard = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/boards/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBoards(boards.filter(b => b.id !== id));
    } catch (err) {
      setMessage("Failed to delete board");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold mb-4 text-center">Your Boards</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          placeholder="New board name"
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md"
        />
        <button
          onClick={createBoard}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {boards.map(board => (
          <BoardCard key={board.id} board={board} onDelete={deleteBoard} />
        ))}
      </div>
    </div>
  );
}