import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signupUser } from "../services/auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Name too short").required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await signupUser(values);

      login(res.token, res.user);

      toast.success("Account created successfully");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-slate-50">
      <Toaster position="top-right" />

      <div className="w-full max-w-md rounded-3xl bg-white border border-gray-200 shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-center text-indigo-600">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Start learning sign language
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-4">
              {/* NAME */}
              <div>
                <Field
                  name="name"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* EMAIL */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-xl font-semibold text-white transition
                  ${
                    isSubmitting
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }
                `}
              >
                {isSubmitting ? "Creating account..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
