import { useEffect, useState } from "react";
import { fetchMyProfile } from "../api/authApi";
import useTestHistory from "../components/hooks/useTestHistory";
import ProfileAvatar from "../components/profile/ProfileAvatar";
import ChangePasswordModal from "../components/profile/ChangePasswordModal";
import {
  FiEdit2,
  FiCheck,
  FiPlay,
  FiBarChart2,
  FiClock,
  FiLock,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeleteProfileModal from "../components/profile/DeleteProfileModal";
import { FiTrash2 } from "react-icons/fi";

const ROLE_OPTIONS = [
  "student",
  "beginner",
  "intermediate",
  "advanced",
  "teacher",
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { history } = useTestHistory();

  const [user, setUser] = useState(null);
  const [editingRole, setEditingRole] = useState(false);
  const [role, setRole] = useState("");
  const [tempRole, setTempRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchMyProfile();
      const profile = data.user || data;
      setUser(profile);
      setRole(profile.role || "student");
      setTempRole(profile.role || "student");
      setLoading(false);
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile…
      </div>
    );
  }

  const totalTests = history.length;
  const avgAccuracy =
    totalTests === 0
      ? 0
      : Math.round(
          history.reduce((a, b) => a + b.score_percentage, 0) / totalTests
        );

  const bestScore =
    totalTests === 0 ? 0 : Math.max(...history.map((h) => h.score_percentage));

  const handleSaveRole = () => {
    setRole(tempRole);
    setEditingRole(false);
    
  };

  const handleCancelRole = () => {
    setTempRole(role);
    setEditingRole(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">
            <div className="flex items-center gap-6 mb-8">
              <ProfileAvatar
                firstName={user.name?.split(" ")[0]}
                lastName={user.name?.split(" ")[1] || ""}
                size="lg"
              />

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* JOINED */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Joined
                </p>
                <p className="mt-1 font-semibold text-gray-800">
                  {new Date(user.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* ROLE */}
              {/* ROLE */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Role
                  </p>

                  {!editingRole ? (
                    <button onClick={() => setEditingRole(true)}>
                      <FiEdit2 className="text-gray-500 hover:text-indigo-600" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handleSaveRole}>
                        <FiCheck className="text-green-600" />
                      </button>
                      <button onClick={handleCancelRole}>
                        <FiX className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>

                {!editingRole ? (
                  <div className="flex items-center gap-2 mt-1 font-semibold text-gray-800 capitalize">
                    <FiUser className="text-indigo-500" />
                    {role}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="border border-gray-300 rounded-xl bg-white shadow-sm">
                      {ROLE_OPTIONS.map((r) => (
                        <button
                          key={r}
                          onClick={() => setTempRole(r)}
                          className={`w-full text-left px-4 py-2 capitalize transition
              ${
                tempRole === r
                  ? "bg-indigo-50 text-indigo-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACCOUNT STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard
              icon={<FiClock />}
              label="Tests Taken"
              value={totalTests}
            />
            <StatCard
              icon={<FiBarChart2 />}
              label="Average Accuracy"
              value={`${avgAccuracy}%`}
            />
            <StatCard
              icon={<FiBarChart2 />}
              label="Best Score"
              value={`${bestScore}%`}
            />
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Actions
            </h3>

            <div className="flex flex-wrap gap-4">
              <ActionButton
                icon={<FiPlay />}
                label="Take New Test"
                onClick={() => navigate("/test")}
              />
              <ActionButton
                icon={<FiClock />}
                label="View History"
                onClick={() => navigate("/history")}
              />
              <ActionButton
                icon={<FiBarChart2 />}
                label="View Analytics"
                onClick={() => navigate("/analytics")}
              />
              <ActionButton
                icon={<FiLock />}
                label="Change Password"
                variant="danger"
                onClick={() => setShowChangePassword(true)}
              />
              <ActionButton
                icon={<FiTrash2 />}
                label="Delete Account"
                variant="danger"
                onClick={() => setShowDeleteProfile(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
      {showDeleteProfile && (
        <DeleteProfileModal onClose={() => setShowDeleteProfile(false)} />
      )}
    </>
  );
};

/* ---------- Small Components ---------- */

const StatCard = ({ icon, label, value }) => (
  <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
    <div className="flex items-center gap-3 text-gray-500 mb-2">
      {icon}
      <p className="text-sm">{label}</p>
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ActionButton = ({ icon, label, onClick, variant = "default" }) => {
  const base =
    "flex items-center gap-3 px-6 py-3 rounded-xl border transition font-medium";

  const variants = {
    default:
      "border-gray-200 bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 text-gray-800",
    danger:
      "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ProfilePage;
