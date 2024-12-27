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
    <div className="h-screen ">
      <div className="w-full overflow-y-auto h-screen bg-white border-b-2 rounded-bl-xl rounded-br-xl shadow shadow-gray-200 p-10">
        <h2 className="pb-4 text-center text-xl md:text-2xl font-bold">
          Add User
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-screen-md mx-auto grid gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {error.firstName && (
                <p className="text-red-400 pt-2">{error.firstName}</p>
              )}
            </div>

            <div>
              <input
                className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {error.lastName && (
                <p className="text-red-400 pt-2">{error.lastName}</p>
              )}
            </div>

            <div>
              <input
                className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              {error.age && <p className="text-red-400 pt-2">{error.age}</p>}
            </div>

            <div>
              <input
                className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {error.username && (
                <p className="text-red-400 pt-2">{error.username}</p>
              )}
            </div>

            <div>
              <input
                className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <p className="text-red-400 pt-2">{error.email}</p>
              )}
            </div>

            <div>
              <CountrySelect onChange={handleChange} name="country" />
              {error.country && (
                <p className="text-red-400 pt-2">{error.country}</p>
              )}
            </div>
            <div>
              <PasswordInput
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <p className="text-red-400 pt-2">{error.password}</p>
              )}
              {formData.password.length > 0 && (
                <PasswordStrengthBar
                  className="w-full py-2 border-none outline-blue-500 text-black "
                  password={formData.password}
                />
              )}
            </div>

            <div>
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {error.confirmPassword && (
              <p className="text-red-400 pt-2">{error.confirmPassword}</p>
            )}
            </div>
            
            {error.passwordMatch && (
              <p className="text-red-400 pt-2">{error.passwordMatch}</p>
            )}

            <div className="flex gap-10 items-center">
              <label>
                <input
                  type="radio"
                  name="admin-user"
                  value="true"
                  checked={formData.admin === true}
                  onChange={handleChange}
                />
                Admin
              </label>
              <label>
                <input
                  type="radio"
                  name="admin-user"
                  value="false"
                  checked={formData.admin === false}
                  onChange={handleChange}
                />
                User
              </label>
            </div>

            <button
              type="submit"
              className=" bg-blue-600 text-white hover:opacity-85 transition duration-200 py-3 px-4 border-none outline-blue-500 rounded-md"
            >
              Sign UP
            </button>

            {error.submit && (
              <p className="text-red-400 pt-2 text-center">{error.submit}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
