import { NavLink, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileAvatar from "../../components/profile/ProfileAvatar";
import AslLogo from "../../components/logos/AslLogo";

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gradient-to-b from-slate-50 to-gray-100"
    >
      <div className="border-b border-gray-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* LEFT — BRAND */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <AslLogo size={32} />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-gray-900">
                ASL Teacher
              </p>
              <p className="text-[11px] text-gray-500 tracking-wide">
                Sign Language Learning
              </p>
            </div>
          </div>

          {/* RIGHT — AUTH / PROFILE */}
          <div className="flex items-center gap-4 relative">
            {!token && (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-medium text-gray-600 border border-indigo-400 px-4 py-2 rounded-lg hover:bg-indigo-50"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Sign up
                </button>
              </>
            )}

            {token && user && (
              <>
                {/* PROFILE TRIGGER */}
                <div
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <ProfileAvatar
                    firstName={user.name?.split(" ")[0]}
                    lastName={user.name?.split(" ")[1] || ""}
                  />
                  <div className="hidden sm:block leading-tight">
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* DROPDOWN */}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-14 w-56 rounded-xl bg-white shadow-xl border border-gray-200 overflow-hidden"
                    >
                      {/* PROFILE */}
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/profile");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>

                      {/* TAKE TEST */}
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/test");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Take Test
                      </button>

                      <div className="border-t border-gray-200" />
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/learn");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Learn Signs
                      </button>
                      {/* HISTORY */}
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/history");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        History
                      </button>
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/dashboard");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </button>

                      {/* ANALYTICS */}
                      <button
                        onClick={() => {
                          setOpen(false);
                          navigate("/analytics");
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Analytics
                      </button>

                      <div className="border-t border-gray-200" />

                      {/* LOGOUT */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-medium"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
