import React from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  type = "input", 
  label, 
  value, 
  onChange, 
  error,
  options = [],
  placeholder,
  ...props 
}) => {
  if (type === "select") {
    return (
      <Select
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    );
  }

  return (
    <Input
      label={label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default FormField;