import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../Redux/actions";
import PasswordInput from "../Components/PasswordInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FaLock } from "react-icons/fa";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Both username and password are required.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        "https://676187c546efb37323720b38.mockapi.io/stagiaires"
      );
      const users = response.data;
      const matchedUser = users.find(
        (user) => user.pseudo === username && user.MotDePasse === password
      );

      if (matchedUser) {
        dispatch(login(matchedUser));
        localStorage.setItem("connectedUser", JSON.stringify(matchedUser)); // Save user
        navigate(matchedUser.admin ? "/admin-dashboard" : "/user-dashboard");
      } else {
        setError("Invalid username or password");
        setCounter((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">Welcome Back!</h2>
          <p className="text-center mt-2 text-blue-100">
            Lets get you signed in
          </p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faUser}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                id="username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <PasswordInput
                icon={<FaLock size={18} />}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {counter <= 2 ? (
            <button
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              )}
              {isLoading ? "Authenticating..." : "Authenticate"}
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
            >
              Try again later
            </button>
          )}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <p className=" text-center text-[14px]">
            Not registered?
            <span>
              {" "}
              <a
                onClick={() => navigate("register")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline underline-offset-[3px]"
              >
                Create an Account
              </a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
