import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) =>{
    const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return ( 
  <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    {label}
  </label>

  <div className="input-box">
    <input 
        type={
        type == "password"
          ? showPassword
            ? "text"
            : "password"
          : type
      }
      placeholder={placeholder}
      className="w-full bg-transparent text-gray-800 placeholder:text-gray-400 outline-none text-sm"
      value={value}
      onChange={(e) => onChange(e)}
    />
    {type === "password" && (
  <>
    {showPassword ? (
      <FaRegEye
        size={22}
       className="text-primary hover:text-indigo-700 transition-colors duration-300 cursor-pointer"
        onClick={() => toggleShowPassword()}
      />
    ) : (
      <FaRegEyeSlash
        size={22}
        className="text-gray-400 hover:text-primary transition-colors duration-300 cursor-pointer"
        onClick={() => toggleShowPassword()}
      />
    )}
  </>
)}
  </div>
</div>
);
};
        
    

export default Input