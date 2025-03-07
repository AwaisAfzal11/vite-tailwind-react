import React, { useState, useCallback, useMemo, createContext } from 'react';
import { Search, Plus, Check, Trash2, AlertCircle } from 'lucide-react';

// Create Context for Task Management
const TaskContext = createContext();

// Custom hook for managing tasks
const useTaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React Hooks', priority: 'high', completed: false },
    { id: 2, title: 'Master Context API', priority: 'medium', completed: true },
    { id: 3, title: 'Study Performance Optimization', priority: 'high', completed: false },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = useCallback((title, priority) => {
    setTasks(prev => [...prev, { id: Date.now(), title, priority, completed: false }]);
  }, []);

  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
      })
      .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [tasks, filter, searchQuery]);

  return { tasks: filteredTasks, addTask, toggleTask, deleteTask, filter, setFilter, searchQuery, setSearchQuery };
};

// Task Item Component with memo
const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg mb-2 hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <button onClick={() => onToggle(task.id)} className={`p-2 rounded-full ${task.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
          <Check size={16} className={task.completed ? 'text-green-600' : 'text-gray-400'} />
        </button>
        <span className={`${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</span>
        <span className={`px-2 py-1 rounded text-xs ${task.priority === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{task.priority}</span>
      </div>
      <button onClick={() => onDelete(task.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
        <Trash2 size={16} />
      </button>
    </div>
  );
});

TaskItem.displayName = "TaskItem";


// Add Task Form Component
const AddTaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    onAdd(title, priority);
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2 mb-2">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New task..." className="flex-1 p-2 border rounded" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 border rounded">
          <option value="high">High</option>
          <option value="medium">Medium</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus size={20} />
        </button>
      </div>
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </form>
  );
};

// Main Task Manager Component
const TaskManager = () => {
  const taskManager = useTaskManager();
  
  return (
    <TaskContext.Provider value={taskManager}>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input type="text" placeholder="Search tasks..." value={taskManager.searchQuery} onChange={(e) => taskManager.setSearchQuery(e.target.value)} className="pl-10 p-2 w-full border rounded" />
          </div>
          <select value={taskManager.filter} onChange={(e) => taskManager.setFilter(e.target.value)} className="p-2 border rounded">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <AddTaskForm onAdd={taskManager.addTask} />
        <div className="space-y-2">
          {taskManager.tasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={taskManager.toggleTask} onDelete={taskManager.deleteTask} />
          ))}
        </div>
        {taskManager.tasks.length === 0 && (
          <div className="bg-gray-100 text-gray-600 p-3 rounded">
            No tasks found. Add some tasks or try changing your filters.
          </div>
        )}
      </div>
    </TaskContext.Provider>
  );
};

export default TaskManager;