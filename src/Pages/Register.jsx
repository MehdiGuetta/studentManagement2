import { useState } from "react";
import axios from "axios";
import "../assets/styles/auth.css";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../Components/CountrySelector";

function RegistrationForm() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    country: "",
    password: "",
    confirmPassword: "",
    admin: false,
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    return Object.values(criteria).every((criterion) => criterion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      prenom: formData.firstName,
      nom: formData.lastName,
      pseudo: formData.username,
      email: formData.email,
      Pays: formData.country,
      MotDePasse: formData.password,
      admin: formData.admin,
      age: formData.age,
    };

    if (!validatePassword(formData.password)) {
      setError(
        "The password must contain at least 8 charecter, an uppercase, a lowercase, a number and a special character"
      );
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Password does not match!");
      return;
    } else if (formData.age < 15) {
      setError("The age must be more than 15 years old");
    } else {
      setError("");

      axios
        .post("https://676187c546efb37323720b38.mockapi.io/stagiaires", payload)
        .then((response) => {
          console.log("Success:", response);
          alert("Account created successfully, Go to login page?");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error:", err);
          setError("Failed to submit the form");
        });
    }
  };

  return (
    <div className="container">
      <h2 className="form-header"> Let{"'"}s get you signed up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <CountrySelector
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formData.password.length > 0 && (
          <PasswordStrengthBar
            className="pass-length"
            password={formData.password}
          />
        )}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="radio-container">
          <label className="radio-label">
            <input
              className="radio"
              type="radio"
              name="admin"
              value="admin"
              checked={formData.admin === true}
              onChange={handleChange}
            />
            Admin
          </label>
          <label className="radio-label">
            <input
              className="radio"
              type="radio"
              name="admin"
              value="user"
              checked={formData.admin === false}
              onChange={handleChange}
            />
            User
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign UP</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
