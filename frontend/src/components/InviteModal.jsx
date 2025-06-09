import { useState } from "react";
import axios from "axios";

export default function InviteModal({ boardId, isOpen, onClose, onInviteSuccess }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/invite`,
        { boardId, email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setMessage(res.data.message);
      setEmail("");
      if (onInviteSuccess) onInviteSuccess(); // ✅ trigger refresh & close modal
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to invite user");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Invite User to Board</h2>

        {message && (
          <p className="mb-4 text-sm text-blue-600">{message}</p>
        )}

        <input
          type="email"
          placeholder="Enter user email"
          className="w-full px-4 py-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Inviting..." : "Invite"}
          </button>
        </div>
      </div>
    </div>
  );
}