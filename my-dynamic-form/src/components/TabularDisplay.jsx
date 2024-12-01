import React from 'react';

const TabularDisplay = ({ data, setSubmittedData }) => {
  const handleDelete = (index) => {
    setSubmittedData((prev) => prev.filter((_, i) => i !== index));
  };

  if (data.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
            <td>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabularDisplay;
