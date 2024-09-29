import React from "react";
import { CustomInputProps } from "./CustomInput.type";

const CustomInput = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  label,
  id,
}: CustomInputProps) => {
  return (
    <div className="w-full">
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="input input-bordered w-full mb-3 "
        />
      </label>
    </div>
  );
};

export default CustomInput;
