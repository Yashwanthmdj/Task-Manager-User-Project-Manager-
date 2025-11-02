import { useState, useEffect } from 'react';
import { getUsers, getTasks, addTask, updateTask } from '../utils/storage';

/**
 * TaskForm Component
 * Allows PM to add new tasks or edit existing tasks
 */
const TaskForm = ({ editingTask, onTaskSaved, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]);

  // Initialize users when component mounts
  useEffect(() => {
    setUsers(getUsers());
  }, []);

  // Populate form when editing a task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setDeadline(editingTask.deadline || '');
      setAssignedUser(editingTask.assignedUser || '');
    } else {
      // Reset form when not editing
      setTitle('');
      setDescription('');
      setDeadline('');
      setAssignedUser('');
    }
  }, [editingTask]);

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }
    if (!deadline) {
      alert('Please select a deadline');
      return;
    }
    if (!assignedUser) {
      alert('Please assign a user');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      deadline,
      assignedUser,
    };

    if (editingTask) {
      // Update existing task
      updateTask(editingTask.id, taskData);
    } else {
      // Add new task
      addTask(taskData);
    }

    // Reset form
    setTitle('');
    setDescription('');
    setDeadline('');
    setAssignedUser('');

    // Notify parent component
    onTaskSaved();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task description"
          />
        </div>

        {/* Deadline Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Assigned User Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assign to User <span className="text-red-500">*</span>
          </label>
          <select
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
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

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium transition-colors"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;

