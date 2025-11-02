import { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, isTaskOverdue, resetData } from './utils/storage';

/**
 * Main App Component
 * Manages authentication state and renders appropriate views based on user role
 */
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [overdueWarning, setOverdueWarning] = useState(false);

  // Load tasks when currentUser changes
  useEffect(() => {
    if (currentUser) {
      loadTasks();
      // Check for overdue tasks every minute
      const interval = setInterval(checkOverdueTasks, 60000);
      checkOverdueTasks(); // Check immediately
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  /**
   * Load tasks from localStorage
   */
  const loadTasks = () => {
    setTasks(getTasks());
  };

  /**
   * Check for overdue tasks and show warning (for PM only)
   */
  const checkOverdueTasks = () => {
    if (currentUser?.type === 'pm') {
      const allTasks = getTasks();
      const hasOverdue = allTasks.some((task) => isTaskOverdue(task));
      setOverdueWarning(hasOverdue);
    }
  };

  /**
   * Handle user login
   * @param {Object} user - User object with type and username
   */
  const handleLogin = (user) => {
    setCurrentUser(user);
    setEditingTask(null);
  };

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    setCurrentUser(null);
    setEditingTask(null);
    setOverdueWarning(false);
  };

  /**
   * Handle task form save/update
   */
  const handleTaskSaved = () => {
    loadTasks();
    setEditingTask(null);
  };

  /**
   * Handle task edit click
   * @param {Object} task - Task object to edit
   */
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  /**
   * Cancel editing task
   */
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  /**
   * Handle data reset
   */
  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      resetData();
      loadTasks();
      alert('All data has been reset successfully!');
    }
  };

  // Show login screen if user is not logged in
  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  // Main app layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Vaave Task Manager</h1>
            <p className="text-sm text-indigo-100 mt-1">
              Logged in as: <span className="font-semibold">{currentUser.username}</span>
              {' '}
              <span className="text-xs">({currentUser.type === 'pm' ? 'Project Manager' : 'User'})</span>
            </p>
          </div>
          <div className="flex gap-2">
            {currentUser.type === 'pm' && (
              <button
                onClick={handleResetData}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm font-medium transition-colors"
              >
                Reset Data
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Overdue Warning Banner (for PM only) */}
      {currentUser.type === 'pm' && overdueWarning && (
        <div className="bg-red-500 text-white px-4 py-3 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span className="font-semibold">Warning: There are tasks that have missed their deadlines!</span>
            </div>
            <button
              onClick={() => setOverdueWarning(false)}
              className="text-white hover:text-gray-200 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar (for PM only) */}
          {currentUser.type === 'pm' && (
            <div className="lg:col-span-1">
              <TaskForm
                editingTask={editingTask}
                onTaskSaved={handleTaskSaved}
                onCancel={handleCancelEdit}
              />
            </div>
          )}

          {/* Task List */}
          <div className={currentUser.type === 'pm' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <TaskList
              currentUser={currentUser}
              onEditTask={handleEditTask}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-gray-600 text-center py-4 mt-8">
        <p className="text-sm">
          Demo app – Data stored in localStorage | Vaave Task Manager © 2024
        </p>
      </footer>
    </div>
  );
}

export default App;

