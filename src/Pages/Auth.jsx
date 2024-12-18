// Auth.jsx
import "../assets/styles/auth.css";
import { useDispatch } from "react-redux";
import { login } from "../Redux/actions";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [counter, setCounter] = useState(0);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
        navigate("/dashboard");
      } else {
        setError("Invalid username or password");
        setCounter((prev) => prev + 1);
        console.log(counter);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Let{"'"}s get you signed in!</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {counter <= 2 ? (
          <button type="submit">Authenticate</button>
        ) : (
          <button disabled className="deactivated-btn" type="submit">
            Authenticate
          </button>
        )}
        {<p className="error-message">{error}</p>}
        <p>
          Not registered?
          <span>
            {" "}
            <a onClick={() => navigate("register")}>Create an Account</a>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
