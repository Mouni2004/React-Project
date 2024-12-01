import React from 'react';

const FormField = ({ field, value, onChange }) => {
  const handleChange = (e) => onChange(field.name, e.target.value);

  return (
    <div className="form-field">
      <label>
        {field.label} {field.required && '*'}
      </label>
      {field.type === 'dropdown' ? (
        <select value={value} onChange={handleChange}>
          <option value="">-- Select --</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          value={value}
          required={field.required}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default FormField;
