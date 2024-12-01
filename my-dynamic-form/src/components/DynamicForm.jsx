import React, { useState } from 'react';
import FormField from './FormField';
import ProgressBar from './ProgressBar';
import TabularDisplay from './TabularDisplay';

const DynamicForm = () => {
  const [formType, setFormType] = useState('');
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const mockApiResponse = {
    'User Information': {
      fields: [
        { name: 'firstName', type: 'text', label: 'First Name', required: true },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true },
        { name: 'age', type: 'number', label: 'Age', required: false },
      ],
    },
    'Address Information': {
      fields: [
        { name: 'street', type: 'text', label: 'Street', required: true },
        { name: 'city', type: 'text', label: 'City', required: true },
        { name: 'state', type: 'dropdown', label: 'State', options: ['California', 'Texas', 'New York'], required: true },
        { name: 'zipCode', type: 'text', label: 'Zip Code', required: false },
      ],
    },
    'Payment Information': {
      fields: [
        { name: 'cardNumber', type: 'text', label: 'Card Number', required: true },
        { name: 'expiryDate', type: 'date', label: 'Expiry Date', required: true },
        { name: 'cvv', type: 'password', label: 'CVV', required: true },
        { name: 'cardholderName', type: 'text', label: 'Cardholder Name', required: true },
      ],
    },
  };

  const fetchFormFields = (type) => {
    try {
      if (mockApiResponse[type]) {
        setFields(mockApiResponse[type].fields);
        setFormData({});
        setProgress(0);
        setError('');
      } else {
        throw new Error('Form type not found');
      }
    } catch (err) {
      setError('Failed to load form structure. Please try again.');
    }
  };

  const handleDropdownChange = (e) => {
    setFormType(e.target.value);
    fetchFormFields(e.target.value);
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      const filledFields = Object.keys(newData).filter((key) => newData[key] && fields.find((field) => field.name === key)?.required);
      setProgress((filledFields.length / fields.filter((field) => field.required).length) * 100);
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = fields.filter((field) => field.required);
    for (let field of requiredFields) {
      if (!formData[field.name]) {
        setError(`Please fill the required field: ${field.label}`);
        return;
      }
    }
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({});
    setProgress(0);
    setError('');
  };

  return (
    <div className="dynamic-form">
      <h1>Dynamic Form</h1>
      <label>Select Form Type: </label>
      <select value={formType} onChange={handleDropdownChange}>
        <option value="">-- Select --</option>
        <option value="User Information">User Information</option>
        <option value="Address Information">Address Information</option>
        <option value="Payment Information">Payment Information</option>
      </select>

      {error && <p className="error">{error}</p>}

      {fields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <FormField key={field.name} field={field} value={formData[field.name] || ''} onChange={handleChange} />
          ))}
          <ProgressBar progress={progress} />
          <button type="submit">Submit</button>
        </form>
      )}

      <TabularDisplay data={submittedData} setSubmittedData={setSubmittedData} />
    </div>
  );
};

export default DynamicForm;
