import { useState } from "react";
import { signupUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signupUser({ name, email, password });

      const [firstName, lastName = ""] = name.split(" ");

      // ✅ AUTO LOGIN WITH USER DATA
      login(res.token, {
        firstName,
        lastName,
        email,
      });

      navigate("/camera");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="p-6 border rounded w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Create Account</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          placeholder="Name"
          className="w-full mb-3 p-2 border"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
