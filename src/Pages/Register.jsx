import { useState } from "react";
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { useNavigate } from "react-router-dom";
import CountrySelect from "../Components/CountrySelector";
import PasswordInput from "../Components/PasswordInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faLock,
  faGlobe,
  faImage,
  faCake,
} from "@fortawesome/free-solid-svg-icons";
import { FaLock } from "react-icons/fa";

function RegistrationForm() {
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
    admin: false,
    age: "",
    photo: "https://loremflickr.com/640/480",
  });

  console.log(formData.admin);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "age") {
      if ((value > 0 && value <= 100) || value === "") {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (type === "radio") {
      setFormData({
        ...formData,
        admin: checked ? value === "true" : formData.admin,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
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
      photo: formData.photo,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center">
            Let{"'"}s Get You Signed Up!
          </h2>
          <p className="text-center mt-2 text-blue-100">
            Create your account and join our community
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="space-y-4">
            <InputField
              icon={faUser}
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={error.firstName}
            />
            <InputField
              icon={faUser}
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={error.lastName}
            />
            <InputField
              icon={faCake}
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              error={error.age}
            />
            <InputField
              icon={faUser}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              error={error.username}
            />
            <InputField
              icon={faImage}
              type="url"
              name="photo"
              placeholder="Image URL"
              value={formData.photo}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <InputField
              icon={faEnvelope}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              error={error.email}
            />
            <div className="space-y-2">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <PasswordInput
                  icon={<FaLock size={18} />}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {error.password && (
                <p className="text-red-500 text-sm">{error.password}</p>
              )}
              {formData.password.length > 0 && (
                <PasswordStrengthBar password={formData.password} />
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <PasswordInput
                  icon={<FaLock size={18} />}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {error.confirmPassword && (
                <p className="text-red-500 text-sm">{error.confirmPassword}</p>
              )}
              {error.passwordMatch && (
                <p className="text-red-500 text-sm">{error.passwordMatch}</p>
              )}
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faGlobe}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <CountrySelect
                onChange={handleChange}
                name="country"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-around items-center py-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={true}
                  checked={formData.admin === true}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all"></div>
                <span className="text-gray-700">Admin</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={false}
                  checked={formData.admin === false}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all"></div>
                <span className="text-gray-700">User</span>
              </label>
            </div>
          </div>
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        {error.submit && (
          <p className="text-red-500 text-center pb-4">{error.submit}</p>
        )}
        <p className=" text-center text-[14px] pb-5">
          Already have an account?
          <span>
            {" "}
            <a
              onClick={() => navigate("/")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline underline-offset-[3px]"
            >
              Log in
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}

function InputField({ icon, type, name, placeholder, value, onChange, error }) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <FontAwesomeIcon
          icon={icon}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default RegistrationForm;
