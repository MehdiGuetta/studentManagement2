import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ icon, name, placeholder, value, onChange, error, required }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative">
        {/* Left-side icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {/* Right-side eye toggle icon */}
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default PasswordInput;
