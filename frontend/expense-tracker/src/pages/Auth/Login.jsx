import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <motion.div
        className="lg:w-[70%] md:w-full h-full flex flex-col justify-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-3">
            Sign in to continue managing your finances.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input
            value={email}
            onChange={({ target }) =>
              setEmail(target.value)
            }
            label="Email Address"
            placeholder="Enter your email"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) =>
              setPassword(target.value)
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {error && (
            <motion.p
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            className="btn-primary w-full"
          >
            LOGIN
          </motion.button>

          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;