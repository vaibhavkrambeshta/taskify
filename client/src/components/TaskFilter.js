import React from 'react';

const TaskFilter = ({ onFilterChange }) => {
  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    onFilterChange(newStatus); 
  };

  return (
    <div>
      <label>Filter by Status:</label>
      <select value={status} onChange={handleChange}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilter;