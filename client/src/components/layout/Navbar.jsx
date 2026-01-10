import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="p-4 border-b flex justify-between">
      <Link to="/" className="font-bold">
        ASL Teacher
      </Link>

      {isAuthenticated && (
        <button
          onClick={logout}
          className="text-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
