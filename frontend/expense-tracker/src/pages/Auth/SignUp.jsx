import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name.");
      return;
    }

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
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          fullName,
          email,
          password,
          profileImageUrl,
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
        className="lg:w-[100%] md:w-full h-auto flex flex-col justify-center"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            Create Account ✨
          </h2>

          <p className="text-gray-500 mt-3">
            Create your account to start tracking your income and expenses.
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-5">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              value={fullName}
              onChange={({ target }) =>
                setFullName(target.value)
              }
              label="Full Name"
              placeholder="Enter your full name"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) =>
                setEmail(target.value)
              }
              label="Email Address"
              placeholder="Enter your email"
              type="text"
            />

            <div className="md:col-span-2">
              <Input
                value={password}
                onChange={({ target }) =>
                  setPassword(target.value)
                }
                label="Password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </div>
          </div>

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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn-primary w-full"
          >
            CREATE ACCOUNT
          </motion.button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </AuthLayout>
  );
};

export default SignUp;