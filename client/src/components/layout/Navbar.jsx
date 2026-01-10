import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileAvatar from "../../components/profile/ProfileAvatar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LEFT */}
        <div className="flex gap-6 items-center">
          <span className="font-bold text-lg">ASL Teacher</span>

          <NavLink to="/test" className="text-gray-600 hover:text-black">
            Test
          </NavLink>
          <NavLink to="/history" className="text-gray-600 hover:text-black">
            History
          </NavLink>
          <NavLink to="/analytics" className="text-gray-600 hover:text-black">
            Analytics
          </NavLink>
        </div>

        {/* RIGHT */}
        {user && (
          <div className="flex items-center gap-3">
            <ProfileAvatar
              firstName={user.firstName}
              lastName={user.lastName}
            />

            <div className="text-sm text-right">
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-500">{user.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="ml-4 text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
