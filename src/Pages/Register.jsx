import { useState } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../Components/CountrySelector";

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
    admin: true,
    age: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "admin-user") {
      setFormData({ ...formData, admin: value === "true" });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? e.target.checked : value,
      });
    }
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
        "The password must contain at least 8 charecter and countains uppercase, lowercase, number and special character"
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
    <div className="min-w-[400px] h-auto bg-white rounded-md shadow-xl shadow-black-300 p-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
      <h2 className="text-center"> Let{"'"}s get you signed up</h2>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-2.5 w-[400px] h-auto p-5"
      >
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <CountrySelect onChange={handleChange} name="country" />

        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {formData.password.length > 0 && (
          <PasswordStrengthBar
            className="w-96 -mt-1.5"
            password={formData.password}
          />
        )}
        <input
          className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="flex flex-row w-64 justify-between">
          <label className="flex flex-row justify-center items-center h-auto">
            <input
              className="w-5 my-4"
              type="radio"
              name="admin-user"
              value="true"
              checked={formData.admin === true}
              onChange={handleChange}
            />
            Admin
          </label>
          <label className="flex flex-row justify-center items-center h-auto">
            <input
              className="w-5 my-4"
              type="radio"
              name="admin-user"
              value="false"
              checked={formData.admin === false}
              onChange={handleChange}
            />
            User
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          className="w-96 py-3 px-4 border-none bg-blue-600 text-white rounded-md hover:opacity-85 transition duration-200"
        >
          Sign UP
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
