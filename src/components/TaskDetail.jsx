import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: '',
        priority: '',
        dueDate: '',
        assignedUser: ''
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tasks/${id}`);
                if (!response.ok) {
                    const errorMessage = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
                }
                const data = await response.json();
                if (!data || typeof data !== 'object') {
                    throw new Error('Received invalid JSON data');
                }
                setTask(data);
                setFormData(data);
            } catch (error) {
                console.error("Error fetching task:", error);
                setError(`Failed to fetch task: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    dueDate: new Date(formData.dueDate).toISOString(),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            Swal.fire({
                icon: 'success',
                title: 'Task updated successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDeleteTask = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Failed to delete task');
                    }

                    Swal.fire(
                        'Deleted!',
                        'Task has been deleted.',
                        'success'
                    );

                    navigate('/');
                } catch (error) {
                    setError(error.message);
                }
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-600 text-lg">{error}</div>;
    }

    return (
        <div className="font-serif max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Task Details</h2>
            <form onSubmit={handleUpdateTask} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority:</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date:</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate.split('T')[0]}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned User:</label>
                    <input
                        type="text"
                        name="assignedUser"
                        value={formData.assignedUser}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex space-x-4 mt-6">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update Task
                    </button>
                    <button
                        type="button"
                        onClick={handleDeleteTask}
                        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete Task
                    </button>
                    <Link to="/" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Go Back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default TaskDetail;
