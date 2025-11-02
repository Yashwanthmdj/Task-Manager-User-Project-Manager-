/**
 * Storage Utility Functions
 * Handles all localStorage operations for tasks and users
 */

// Predefined users for the application
const DEFAULT_USERS = ['alice', 'bob', 'charlie'];

/**
 * Initialize users in localStorage if they don't exist
 */
export const initializeUsers = () => {
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    localStorage.setItem('users', JSON.stringify(DEFAULT_USERS));
  }
};

/**
 * Get all users from localStorage
 * @returns {Array<string>} Array of usernames
 */
export const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : DEFAULT_USERS;
};

/**
 * Save users to localStorage
 * @param {Array<string>} users - Array of usernames
 */
export const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

/**
 * Get all tasks from localStorage
 * @returns {Array<Object>} Array of task objects
 */
export const getTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

/**
 * Save tasks to localStorage
 * @param {Array<Object>} tasks - Array of task objects
 */
export const saveTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

/**
 * Add a new task
 * @param {Object} task - Task object with title, description, deadline, assignedUser
 * @returns {Array<Object>} Updated tasks array
 */
export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(), // Generate unique ID using timestamp
    ...task,
    status: 'Pending', // Default status
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return tasks;
};

/**
 * Update an existing task
 * @param {string} taskId - ID of the task to update
 * @param {Object} updatedTask - Updated task properties
 * @returns {Array<Object>} Updated tasks array
 */
export const updateTask = (taskId, updatedTask) => {
  const tasks = getTasks();
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    saveTasks(tasks);
  }
  return tasks;
};

/**
 * Delete a task
 * @param {string} taskId - ID of the task to delete
 * @returns {Array<Object>} Updated tasks array
 */
export const deleteTask = (taskId) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter((task) => task.id !== taskId);
  saveTasks(filteredTasks);
  return filteredTasks;
};

/**
 * Reset all data (tasks and users) to initial state
 */
export const resetData = () => {
  localStorage.removeItem('tasks');
  localStorage.removeItem('users');
  initializeUsers();
};

/**
 * Check if a task is overdue (deadline passed and status not 'Done')
 * @param {Object} task - Task object
 * @returns {boolean} True if task is overdue
 */
export const isTaskOverdue = (task) => {
  if (!task.deadline || task.status === 'Done') {
    return false;
  }
  const deadline = new Date(task.deadline);
  const now = new Date();
  return deadline < now;
};

