import React, { useState } from "react";
import axios from "../api/axios";
import { ViewType } from "../App";
import { User, Mail, Lock } from "lucide-react";
import Lottie from "react-lottie";
import successAnimation from "../lotties/success.json";

interface SignupProps {
  setCurrentView: React.Dispatch<React.SetStateAction<ViewType>>;
}

const Signup: React.FC<SignupProps> = ({ setCurrentView }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("/auth/signup", { username, email, password });
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => setCurrentView("login"), 3000);
      } else {
        setMessage(response.data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-400 to-purple-500 animate-gradient-x">
      {success ? (
        <div className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center">
          <Lottie options={defaultOptions} height={200} width={200} />
          <h2 className="text-3xl font-bold text-purple-800 mt-4">Account Created!</h2>
          <p className="text-center text-gray-700">Redirecting to login...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-6 border border-purple-300 transform hover:scale-105 transition duration-500"
        >
          <h2 className="text-4xl font-extrabold text-center text-purple-800 drop-shadow flex items-center justify-center gap-2">
            ✨ <span>Join Mindflow</span> ✨
          </h2>
          <p className="text-center text-gray-700 italic">Create your account to unlock insights</p>

          <div className="relative">
            <User className="absolute top-3 left-3 text-purple-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 border border-purple-400 rounded-2xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
            />
          </div>
          <div className="relative">
            <Mail className="absolute top-3 left-3 text-purple-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 border border-purple-400 rounded-2xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-purple-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border border-purple-400 rounded-2xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl w-full shadow-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition duration-300"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && <p className="text-red-600 text-center font-medium animate-pulse">{message}</p>}

          <p className="text-center text-sm">
            Already have an account? {" "}
            <button
              type="button"
              onClick={() => setCurrentView("login")}
              className="text-purple-800 font-semibold hover:underline hover:text-pink-600 transition"
            >
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Signup;