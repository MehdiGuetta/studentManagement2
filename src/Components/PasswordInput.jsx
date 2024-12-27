import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ name, placeholder, value, onChange, required }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <input
        className="w-full py-3 px-4 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
      <span
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </span>
    </div>
  );
}

export default PasswordInput;
