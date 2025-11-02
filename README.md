# Vaave Task Manager

A complete **Task Management Web Application** built with React and Vite for efficient task management by Project Managers and Users.

## 🚀 Features

### Project Manager (PM) Capabilities
- ✅ **Login** - Simple login without authentication (demo mode)
- ✅ **Add Tasks** - Create tasks with title, description, deadline, and assigned user
- ✅ **Edit Tasks** - Modify existing tasks
- ✅ **Delete Tasks** - Remove tasks from the system
- ✅ **View All Tasks** - See all tasks across all users
- ✅ **Overdue Warning** - Automatic notification banner for missed deadlines
- ✅ **Reset Data** - Clear all data for testing purposes

### User Capabilities
- ✅ **Login** - Select username (alice, bob, or charlie)
- ✅ **View Assigned Tasks** - See only tasks assigned to them
- ✅ **Update Task Status** - Change status between:
  - Pending
  - In Progress
  - Done
- ✅ **Filter Tasks** - Filter by status (All, Pending, In Progress, Done)

## 🛠️ Technologies Used

- **React 18** - UI library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **LocalStorage** - Browser-based data persistence (no backend required)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps to Run

1. **Clone or navigate to the project directory**
   ```bash
   cd "Task Manager"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will be available at `http://localhost:5173`
   - Vite will display the exact URL in the terminal

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

6. **Preview production build** (optional)
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
Task Manager/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login component for PM and Users
│   │   ├── TaskForm.jsx       # Form for adding/editing tasks (PM only)
│   │   └── TaskList.jsx       # List of tasks with status updates
│   ├── utils/
│   │   └── storage.js         # LocalStorage utility functions
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Tailwind CSS styles
├── index.html                 # HTML template
├── package.json               # Project dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                  # This file
```

## 🎯 How to Use

### As a Project Manager:
1. Click "Login" and select "Project Manager"
2. You'll see the dashboard with:
   - **Sidebar**: Add/Edit Task form
   - **Main Area**: All tasks list
   - **Header**: App name, user info, logout, and reset data button
3. **Add Task**: Fill the form in the sidebar and click "Add Task"
4. **Edit Task**: Click "Edit" button on any task card
5. **Delete Task**: Click "Delete" button on any task card
6. **Overdue Warning**: If any task misses its deadline, a red warning banner appears at the top

### As a User:
1. Click "Login" and select "User"
2. Select your username (alice, bob, or charlie) from the dropdown
3. You'll see only tasks assigned to you
4. **Update Status**: Use the status buttons (Set Pending, Set In Progress, Set Done)
5. **Filter Tasks**: Use the status filter dropdown to view specific statuses

## 📊 Data Storage

- All data is stored in **localStorage** (browser storage)
- Tasks persist even after browser refresh
- Users can reset all data using the "Reset Data" button (PM only)
- Predefined users: `alice`, `bob`, `charlie`

## 📸 Screenshots

_(Screenshots will be added here showing:_
- _Login page_
- _PM Dashboard with task form_
- _User Dashboard with assigned tasks_
- _Overdue warning banner_
- _Task status updates_
_)_

## 🔍 Key Features Explained

### LocalStorage-Based Storage
- No backend server required
- Data persists in browser's localStorage
- Perfect for demo/testing purposes

### Role-Based Access
- **PM Role**: Full CRUD operations on all tasks
- **User Role**: View and update only assigned tasks

### Deadline Tracking
- Automatic detection of overdue tasks
- Visual indicators (red border, warning badge)
- Real-time warning banner for PM

### Responsive Design
- Works on desktop and mobile devices
- Tailwind CSS for modern, clean UI

## 📚 Detailed Documentation

For complete technical documentation explaining:
- Step-by-step development process
- File-by-file code explanation
- React concepts used
- Interview questions & answers

See: **PROJECT_DOCUMENTATION.md**

## 🐛 Troubleshooting

### Issues Running the App?
- Make sure Node.js is installed (`node --version`)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check if port 5173 is available

### Data Not Persisting?
- Check browser console for errors
- Ensure localStorage is enabled in your browser
- Try clearing browser cache and reloading

## 🚧 Future Enhancements

- Backend API integration
- Real authentication (JWT tokens)
- User registration
- Task comments and attachments
- Email notifications for deadlines
- Task filtering and search
- Drag-and-drop task management
- Team collaboration features

## 📄 License

This project is created for educational and internship purposes.

## 👨‍💻 Author

Built for Vaave internship assignment.

---

**Note**: This is a demo application. All data is stored locally in your browser's localStorage.
"# Task-Manager-User-Project-Manager-" 
