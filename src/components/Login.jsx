import { useState, useEffect } from 'react';
import { initializeUsers, getUsers } from '../utils/storage';

/**
 * Login Component
 * Handles authentication for both PM and Users
 * For PM: Simple login without credentials
 * For Users: Select username from dropdown
 */
const Login = ({ onLogin }) => {
  const [userType, setUserType] = useState('user'); // 'pm' or 'user'
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);

  // Initialize users when component mounts
  useEffect(() => {
    initializeUsers();
    setUsers(getUsers());
  }, []);

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userType === 'pm') {
      // PM can log in directly
      onLogin({ type: 'pm', username: 'Project Manager' });
    } else {
      // User must select a username
      if (!selectedUser) {
        alert('Please select a user');
        return;
      }
      onLogin({ type: 'user', username: selectedUser });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-600">
          Vaave Task Manager
        </h1>
        <p className="text-center text-gray-600 mb-6">Welcome! Please login to continue</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="user"
                  checked={userType === 'user'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">User</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="pm"
                  checked={userType === 'pm'}
                  onChange={(e) => setUserType(e.target.value)}
                  className="mr-2"
                />
                <span className="text-gray-700">Project Manager</span>
              </label>
            </div>
          </div>

          {/* User Selection (only for regular users) */}
          {userType === 'user' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Username:
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-xs text-center text-gray-500">
          Note: This is a demo app. No real authentication required.
        </p>
      </div>
    </div>
  );
};

export default Login;

