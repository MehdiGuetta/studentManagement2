import { useState } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faGlobe,
  faBirthdayCake,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import PasswordInput from "../../Components/PasswordInput";
import CountrySelect from "../../Components/CountrySelector";

function AddUser() {
  const [error, setError] = useState({});
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
      const ageValue = Number.parseInt(value);
      if ((ageValue > 0 && ageValue <= 100) || value === "") {
        setFormData({ ...formData, [name]: value });
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
    const errors = {};
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
    if (formData.age && Number.parseInt(formData.age) < 15)
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
      .then(() => {
        alert("Account created successfully");
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">Add New User</h2>
          <p className="text-center mt-2 text-blue-100">
            Create a new account for admin or regular user
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="firstName"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              {error.firstName && (
                <p className="text-red-500 text-xs mt-1">{error.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faUser}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="lastName"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              {error.lastName && (
                <p className="text-red-500 text-xs mt-1">{error.lastName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="age"
                className="text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="age"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              {error.age && (
                <p className="text-red-500 text-xs mt-1">{error.age}</p>
              )}
            </div>

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
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {error.username && (
                <p className="text-red-500 text-xs mt-1">{error.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {error.email && (
                <p className="text-red-500 text-xs mt-1">{error.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <CountrySelect onChange={handleChange} name="country" />
              </div>
              {error.country && (
                <p className="text-red-500 text-xs mt-1">{error.country}</p>
              )}
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
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-xs mt-1">{error.password}</p>
              )}
              {formData.password.length > 0 && (
                <PasswordStrengthBar password={formData.password} />
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {error.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {error.passwordMatch && (
            <p className="text-red-500 text-sm text-center">
              {error.passwordMatch}
            </p>
          )}

          <div className="flex justify-center items-center space-x-6">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="admin-user"
                value="true"
                checked={formData.admin === true}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Admin</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="admin-user"
                value="false"
                checked={formData.admin === false}
                onChange={handleChange}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">User</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faUserShield} className="mr-2" />
            Add user
          </button>

          {error.submit && (
            <p className="text-red-500 text-sm text-center">{error.submit}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddUser;
