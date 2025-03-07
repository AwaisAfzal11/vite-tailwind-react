// App.jsx - Main application component
import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a context for tasks
const TaskContext = createContext();

// Custom hook to use the task context
const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

// Task Provider component
const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy application', completed: false },
    { id: 4, text: 'Share with friends', completed: false},
    { id: 5, text: 'Celebrate success', completed: false}
  ]);

  // useCallback for addTask function to prevent unnecessary re-renders
  const addTask = useCallback((text) => {
    setTasks(prevTasks => [
      ...prevTasks,
      { id: Date.now(), text, completed: false }
    ]);
  }, []);

  // useCallback for toggleTask function
  const toggleTask = useCallback((id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  // useCallback for deleteTask function
  const deleteTask = useCallback((id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  // useMemo for computing statistics about tasks
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const incomplete = total - completed;
    const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    return { total, completed, incomplete, percentComplete };
  }, [tasks]);

  // Create value object with all context data
  const value = {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    taskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Task Form Component
const TaskForm = () => {
  const [text, setText] = useState('');
  const { addTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2 mb-6">
      <input
        type="text"
        value
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
      />
      <button 
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Add Task
      </button>
    </form>
  );
};

// Task Item Component
const TaskItem = React.memo(({ task }) => {
  console.log(`Rendering TaskItem: ${task.text}`);
  const { toggleTask, deleteTask } = useTaskContext();

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-3 flex items-center justify-between group hover:shadow-lg transition">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded transition"
        />
        <span 
          className={`text-lg transition-all duration-200 ${
            task.completed 
              ? 'text-gray-400 line-through' 
              : 'text-gray-800'
          }`}
        >
          {task.text}
        </span>
      </div>
      <button 
        onClick={() => deleteTask(task.id)}
        className="text-gray-400 hover:text-red-500 focus:outline-none transition opacity-0 group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
});

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

TaskItem.displayName = 'TaskItem';

// Task List Component
const TaskList = () => {
  const { tasks } = useTaskContext();
  
  return (
    <ul className="w-full">
      {tasks.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          No tasks yet. Add one above!
        </div>
      ) : (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

// Task Statistics Component
const TaskStats = () => {
  const { taskStats } = useTaskContext();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Task Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-3 rounded-lg">
          <div className="text-indigo-800 text-2xl font-bold">{taskStats.total}</div>
          <div className="text-indigo-600 text-sm">Total Tasks</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-green-800 text-2xl font-bold">{taskStats.completed}</div>
          <div className="text-green-600 text-sm">Completed</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-yellow-800 text-2xl font-bold">{taskStats.incomplete}</div>
          <div className="text-yellow-600 text-sm">Pending</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-blue-800 text-2xl font-bold">{taskStats.percentComplete}%</div>
          <div className="text-blue-600 text-sm">Complete</div>
        </div>
      </div>
      <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${taskStats.percentComplete}%` }}
        ></div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Manager</h1>
            <p className="text-gray-600">Organize your tasks efficiently</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <TaskForm />
            <TaskStats />
            <TaskList />
          </div>
          <div>
            <h1 className=''>
              Implemented createContext, useContext, useCallback, useMemo.
            </h1>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default App;