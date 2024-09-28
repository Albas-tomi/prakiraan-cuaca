import React from "react";

const CustomInput = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  label,
  id,
}: {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: any) => void;
  name: string;
  label?: string;
  id: string;
}) => {
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
