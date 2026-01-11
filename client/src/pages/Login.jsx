/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";

import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleLogin = async (values, { setSubmitting }) => {
    setServerError("");
    try {
      const res = await loginUser(values);

      login(res.token, res.user);

      toast.success("Login successfull!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid email or password");
      setServerError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-200 shadow-xl p-8">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back to <span className="text-indigo-600">ASL Teacher</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Log in to continue practicing sign language
          </p>
        </div>

        {/* SERVER ERROR */}
        {serverError && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {/* FORM */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2
                             text-sm focus:outline-none focus:ring-2
                             focus:ring-indigo-500 focus:border-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10
                               text-sm focus:outline-none focus:ring-2
                               focus:ring-indigo-500 focus:border-indigo-500"
                  />

                  {/* EYE ICON */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

            
              

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 py-2.5
                           text-white font-semibold shadow-md
                           hover:bg-indigo-700 transition
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
