import { useState } from "react";
import { changePassword } from "../../api/authApi";
import toast from "react-hot-toast";
import { FiX, FiLock } from "react-icons/fi";

const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(res.message || "Password changed successfully");

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      toast.error(err.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-xl p-6 border border-red-100">
        {/* CLOSE ICON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
        >
          <FiX size={20} />
        </button>

        {/* TITLE */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-full bg-red-100 text-red-600">
            <FiLock />
          </div>
          <h2 className="text-xl font-bold text-red-600">Change Password</h2>
        </div>

        {/* CURRENT PASSWORD */}
        <input
          type="password"
          placeholder="Current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-xl border border-gray-300
            focus:ring-2 focus:ring-red-200 focus:border-red-400"
        />

        {/* NEW PASSWORD */}
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-5 px-4 py-2 rounded-xl border border-gray-300
            focus:ring-2 focus:ring-red-200 focus:border-red-400"
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600
              hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-red-600 text-white
              hover:bg-red-700 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
