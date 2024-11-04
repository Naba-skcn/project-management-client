import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const TaskView = ({ projectId }) => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskAssignedUser, setTaskAssignedUser] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:5000/projects/${id}`, {
          params: { status, priority },
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [projectId, status, priority]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      status: taskStatus,
      priority: taskPriority,
      description: taskDescription,
      assignedUser: taskAssignedUser,
      dueDate,
      projectId: id,
    };

    try {
      const response = await axios.post('http://localhost:5000/addTask', newTask);
      setTasks([...tasks, { ...newTask, _id: response.data.taskId }]);
      setTaskName('');
      setTaskStatus('');
      setTaskPriority('');
      setTaskDescription('');
      setTaskAssignedUser('');
      setDueDate('');

      // Show SweetAlert notification
    Swal.fire({
        icon: 'success',
        title: 'Task Added',
        text: 'Your task has been added successfully!',
        confirmButtonColor: '#4f46e5', // Custom color matching your theme
      });
      
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Failed to add task');
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="font-serif p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tasks for Project
      </h2>

      {/* Search bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search tasks..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-6"
      />

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="p-6 bg-white shadow-lg rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Add New Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="text"
            value={taskAssignedUser}
            onChange={(e) => setTaskAssignedUser(e.target.value)}
            placeholder="Assigned User"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <select
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="not-started">Not Started</option>
          </select>
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 w-full mt-4"
        >
          Add Task
        </button>
      </form>

      {/* Task Filters */}
      <div className="flex space-x-4 mb-6">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="not-started">Not Started</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">{task.name}</h3>
              <p className="text-gray-700 mb-1">Status: <span className="font-medium">{task.status}</span></p>
              <p className="text-gray-700 mb-1">Priority: <span className="font-medium">{task.priority}</span></p>
              <p className="text-gray-700 mb-3">Due Date: <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span></p>
              <Link
                to={`/tasks/${task._id}`}
                className="inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found for this project.</p>
        )}
      </div>
    </div>
  );
};

export default TaskView;
