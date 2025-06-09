import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MemberList from "../components/MemberList";
import InviteModal from "../components/InviteModal";

export default function BoardDetailPage() {
  const { boardId } = useParams();
  const [members, setMembers] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [editName, setEditName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoardInfo();
    fetchMembers();
  }, [boardId]);

  const fetchBoardInfo = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/boards`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const board = res.data.find(b => b.id === parseInt(boardId));
      if (board) {
        setBoardName(board.name);
        setEditName(board.name);
      }
    } catch (err) {
      setMessage("Failed to load board info");
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/boards/${boardId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMembers(res.data);
    } catch (err) {
      setMessage("Failed to load members");
    }
  };

  const handleRename = async () => {
    setSaving(true);
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/boards/${boardId}`, { name: editName }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setBoardName(editName);
      setMessage("Board name updated successfully!");
    } catch (err) {
      setMessage("Failed to update board name");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4">Board Detail</h2>

      {message && <p className="mb-4 text-blue-600 font-medium">{message}</p>}

      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="px-4 py-2 border rounded-md w-full"
        />
        <button
          onClick={handleRename}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button
    onClick={() => navigate(`/api/columns/${boardId}`)}
    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
  >
    View Columns
  </button>

        <button
          onClick={() => setShowInvite(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Invite User
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Members</h3>
      <MemberList members={members} />

      <InviteModal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        boardId={boardId}
        onInviteSuccess={() => {
          setShowInvite(false);
          fetchMembers();
        }}
      />
    </div>
  );
}