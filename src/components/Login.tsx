import React, { useState } from "react";
import axios from "../api/axios";
import { ViewType } from "../App";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
  setCurrentView: React.Dispatch<React.SetStateAction<ViewType>>;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, setCurrentView }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post("/auth/login", { username, password });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setMessage("Login successful!");
        onLoginSuccess(response.data.token);
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.code === "NETWORK_ERROR") {
        setMessage("Network error. Please check your connection.");
      } else {
        setMessage("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-blue-500 animate-gradient-x">
      <form
        onSubmit={handleLogin}
        className="bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-6 border border-purple-300 transform hover:scale-105 transition duration-500"
      >
        <h2 className="text-4xl font-extrabold text-center text-purple-800 drop-shadow">🔒 Mindflow Login</h2>
        <p className="text-center text-gray-700 italic">Welcome back, unlock your flow</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-purple-400 rounded-2xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-purple-400 rounded-2xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-inner"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-2xl w-full shadow-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && (
          <p className={`text-center font-medium animate-pulse ${
            message.includes("successful") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </p>
        )}

        <p className="text-center text-sm">
          Don't have an account? {" "}
          <button
            type="button"
            onClick={() => setCurrentView("signup")}
            className="text-purple-800 font-semibold hover:underline hover:text-pink-600 transition"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;