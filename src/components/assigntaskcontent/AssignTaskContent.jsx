import React, { useState, useEffect } from 'react';
import './AssignTaskContent.css';

const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
    // ... more users
  ];
  

const AssignTaskContent = ({ task, users, onAssign }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (!selectedUser) {
      const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([selectedUser]);
    }
  }, [searchTerm, selectedUser]);

  const handleAssignSubmit = () => {
    if (selectedUser) {
      onAssign(selectedUser);
    } else if (isValidEmail(searchTerm)) {
      onAssign({ email: searchTerm });
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="assign-task-content">
      <h4>Assign Task</h4>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedUser(null);
        }}
        placeholder="Search user or enter email"
      />
      {searchTerm && (
        <div className="search-results">
          {filteredUsers.length > 0 ? (
            <ul className="user-list">
              {filteredUsers.map(user => (
                <li key={user.id} onClick={() => {
                  setSelectedUser(user);
                  setSearchTerm(`${user.name} (${user.email})`);
                }}>
                  {user.name} ({user.email})
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results-message">
              No user found. You can still assign by email if it's valid.
            </p>
          )}
        </div>
      )}
      <button 
        onClick={handleAssignSubmit}
        disabled={!selectedUser && !isValidEmail(searchTerm)}
      >
        Assign
      </button>
    </div>
  );
};

export default AssignTaskContent;
