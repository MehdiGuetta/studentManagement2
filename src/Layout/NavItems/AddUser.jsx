import { useState } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/PasswordInput";
import CountrySelect from "../../Components/CountrySelector";

function AddUser() {
  const [error, setError] = useState({});
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

    if (name === "age") {
      if ((value > 0 && value <= 100) || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "admin-user") {
      setFormData({ ...formData, admin: value === "true" });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? e.target.checked : value,
      });
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.age) errors.age = "Age is required";
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword)
      errors.passwordMatch = "Passwords do not match";
    if (formData.age && formData.age < 15)
      errors.age = "The age must be more than 15 years old";
    if (formData.password && !validatePassword(formData.password))
      errors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character";
    if (!formData.country) errors.country = "Country selection is required";

    setError(errors);
    return Object.keys(errors).length === 0;
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

    if (!validateForm()) return;

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

    axios
      .post("https://676187c546efb37323720b38.mockapi.io/stagiaires", payload)
      .then((response) => {
        console.log("Success:", response);
        alert("Account created successfully, Go to login page?");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error:", err);
        setError((prevState) => ({
          ...prevState,
          submit: "Failed to submit the form",
        }));
      });
  };

  return (
    <div className="h-screen w-full bg-white rounded-md shadow-xl shadow-black-300 p-3 mt-10 flex flex-col">
      <h2 className="text-center text-2xl font-bold">Add User</h2>
      <form
        onSubmit={handleSubmit}
        className=" min-w-[400px] h-auto p-5 relative flex flex-col items-center"
      >
        <div className="flex justify-center flex-wrap gap-3">
          <div className="flex flex-col gap-3">
            <input
              className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {error.firstName && (
              <p className="text-red-400">{error.firstName}</p>
            )}

            <input
              className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {error.lastName && <p className="text-red-400">{error.lastName}</p>}

            <input
              className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            {error.age && <p className="text-red-400">{error.age}</p>}

            <input
              className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {error.username && <p className="text-red-400">{error.username}</p>}
            <div className="w-96 flex flex-row justify-around items-center py-3">
              <label className="flex flex-row justify-center items-center h-auto">
                <input
                  className="w-5"
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
                  className="w-5"
                  type="radio"
                  name="admin-user"
                  value="false"
                  checked={formData.admin === false}
                  onChange={handleChange}
                />
                User
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <input
              className="w-96 py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className="text-red-400">{error.email}</p>}

            <PasswordInput
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && (
              <p className="text-red-400 w-96">{error.password}</p>
            )}
            {formData.password.length > 0 && (
              <PasswordStrengthBar
                className="w-96 -mt-1.5"
                password={formData.password}
              />
            )}
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error.confirmPassword && (
              <p className="text-red-400">{error.confirmPassword}</p>
            )}
            {error.passwordMatch && (
              <p className="text-red-400">{error.passwordMatch}</p>
            )}

            <CountrySelect onChange={handleChange} name="country" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-96 py-3 px-4 border-none bg-blue-600 text-white rounded-md hover:opacity-85 transition duration-200"
          >
            Sign UP
          </button>
        </div>
      </form>
      {error.submit && (
        <p className="text-red-400 text-center">{error.submit}</p>
      )}
    </div>
  );
}

export default AddUser;
