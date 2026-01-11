import { deleteProfile } from "../../api/authApi";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DeleteProfileModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProfile();
      toast.success("Profile deleted successfully");

      // clear auth
      localStorage.removeItem("token");

      // redirect to login
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-xl p-6 border border-red-200">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
        >
          <FiX size={20} />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-red-100 text-red-600">
            <FiAlertTriangle />
          </div>
          <h2 className="text-xl font-bold text-red-600">
            Delete Account
          </h2>
        </div>

        {/* WARNING */}
        <p className="text-sm text-gray-600 mb-6">
          This action is <span className="font-semibold text-red-600">permanent</span>.
          Your account and all related data will be deleted.
        </p>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfileModal;
