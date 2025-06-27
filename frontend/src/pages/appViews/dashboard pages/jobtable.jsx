import React, { useState, useEffect } from 'react';

const JobTable = () => {
  const [jobs, setJobs] = useState([]);

  // Mock fetch function to simulate getting job data
  const fetchJobs = async () => {
    // Replace with your actual data fetching logic
    const mockJobs = [
      { id: 1, title: 'Software Engineer', description: 'Develop software', status: 'open' },
      { id: 2, title: 'Project Manager', description: 'Manage projects', status: 'closed' },
    ];
    setJobs(mockJobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (jobId) => {
    // Logic for editing the job
    console.log('Edit job with ID:', jobId);
  };

  const handleDelete = (jobId) => {
    // Logic for deleting the job
    console.log('Delete job with ID:', jobId);
    setJobs(jobs.filter(job => job.id !== jobId)); // Update state after deletion
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Job Management</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Job Title</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{job.title}</td>
              <td className="py-2 px-4">{job.description}</td>
              <td className="py-2 px-4">{job.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(job.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;