import { useState, useEffect } from 'react';
import { getTasks, updateTask, deleteTask, isTaskOverdue } from '../utils/storage';

/**
 * TaskList Component
 * Displays tasks based on user role:
 * - PM: Shows all tasks with edit/delete options
 * - User: Shows only assigned tasks with status update option
 */
const TaskList = ({ currentUser, onEditTask }) => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'Pending', 'In Progress', 'Done'

  // Load tasks when component mounts or when filter changes
  useEffect(() => {
    loadTasks();
  }, [filterStatus, currentUser]);

  /**
   * Load tasks from localStorage and filter based on user role
   */
  const loadTasks = () => {
    let allTasks = getTasks();

    // Filter by user role
    if (currentUser.type === 'user') {
      allTasks = allTasks.filter((task) => task.assignedUser === currentUser.username);
    }

    // Filter by status if needed
    if (filterStatus !== 'all') {
      allTasks = allTasks.filter((task) => task.status === filterStatus);
    }

    setTasks(allTasks);
  };

  /**
   * Handle status update (for Users)
   */
  const handleStatusUpdate = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
    loadTasks(); // Reload tasks
  };

  /**
   * Handle task deletion (for PM only)
   */
  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
      loadTasks(); // Reload tasks
    }
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentUser.type === 'pm' ? 'All Tasks' : 'My Tasks'}
        </h2>
        
        {/* Status Filter (for Users) */}
        {currentUser.type === 'user' && (
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        )}
      </div>

      {/* Tasks List */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks found.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => {
            const overdue = isTaskOverdue(task);
            return (
              <div
                key={task.id}
                className={`border rounded-lg p-4 ${
                  overdue ? 'border-red-500 bg-red-50' : 'border-gray-200'
                }`}
              >
                {/* Overdue Warning */}
                {overdue && (
                  <div className="mb-2 text-red-600 font-semibold text-sm flex items-center">
                    <span className="mr-2">⚠️</span>
                    MISSED DEADLINE
                  </div>
                )}

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>

                {task.description && (
                  <p className="text-gray-600 mb-2">{task.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span>
                    <strong>Deadline:</strong> {formatDate(task.deadline)}
                  </span>
                  {currentUser.type === 'pm' && (
                    <span>
                      <strong>Assigned to:</strong> {task.assignedUser}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  {currentUser.type === 'pm' ? (
                    <>
                      <button
                        onClick={() => onEditTask(task)}
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(task.id, 'Pending')}
                        disabled={task.status === 'Pending'}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          task.status === 'Pending'
                            ? 'bg-yellow-300 cursor-not-allowed'
                            : 'bg-yellow-200 hover:bg-yellow-300'
                        }`}
                      >
                        Set Pending
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(task.id, 'In Progress')}
                        disabled={task.status === 'In Progress'}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          task.status === 'In Progress'
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-200 hover:bg-blue-300'
                        }`}
                      >
                        Set In Progress
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(task.id, 'Done')}
                        disabled={task.status === 'Done'}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          task.status === 'Done'
                            ? 'bg-green-300 cursor-not-allowed'
                            : 'bg-green-200 hover:bg-green-300'
                        }`}
                      >
                        Set Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;

