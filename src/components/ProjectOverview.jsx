import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectOverview = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-serif p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Project Overview
      </h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search projects..."
          className="w-full md:w-2/3 lg:w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link 
              to={`/projects/${project._id}`}
              key={project._id} 
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-2">
                {project.name}
              </h2>
              <p className="text-gray-700">Status: <span className="font-medium">{project.status}</span></p>
              <p className="text-gray-600">Due Date: <span className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</span></p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectOverview;
