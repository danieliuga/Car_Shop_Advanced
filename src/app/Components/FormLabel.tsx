import React, { ChangeEvent } from "react";

type FormLabelProps = {
  label: string;
  type: string;
  name: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: { value: number | string; label: string }[];
};

const FormLabel: React.FC<FormLabelProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
  options = [],
}) => {
  return (
    <label>
      {label}:
      {type === "select" ? (
        <select name={name} value={value as string | number} onChange={onChange} required={required}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea name={name} value={value as string} onChange={onChange} required={required} />
      ) : (
        <input
          type={type}
          name={name}
          value={value as string | number}
          onChange={onChange}
          required={required}
        />
      )}
    </label>
  );
};

export default FormLabel;
