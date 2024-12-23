// Auth.jsx
import { useDispatch } from "react-redux";
import { login } from "../Redux/actions";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Both username and password are required.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
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
        if (matchedUser.admin) {
          // If the user is an admin
          dispatch(login(matchedUser));
          navigate("/admin-dashboard");
        } else {
          // If the user is not an admin
          dispatch(login(matchedUser));
          navigate("/user-dashboard");
        }
      } else {
        setError("Invalid username or password");
        setCounter((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="min-w-[400px] h-auto bg-white rounded-md shadow-xl shadow-black-300 p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex">
      <form
        onSubmit={handleLogin}
        className="flex justify-center items-center flex-col gap-4 w-[400px] h-auto p-5"
      >
        <h2 className="text-center mb-5 text-2xl font-bold">
          Let{"'"}s get you signed in!
        </h2>
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {counter <= 2 ? (
          <button
            className="w-96 py-3 px-4 border-none bg-blue-600 text-white rounded-md hover:opacity-85 transition duration-200"
            type="submit"
          >
            Authenticate
          </button>
        ) : (
          <button
            disabled
            type="submit"
            className="bg-gray-500 w-96 py-3 px-4 border-none text-white rounded-md cursor-not-allowed"
          >
            Authenticate
          </button>
        )}
        {counter <= 2 ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <p className="text-red-500 text-center">Try again later</p>
        )}
        <p className="text-[14px]">
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
  );
};

export default Auth;
