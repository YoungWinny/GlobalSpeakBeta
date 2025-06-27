import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import JobImage from "../../../assets/images/job.jpg"; // Import your image here
import axios from 'axios';
import { axiosInstance } from '../../../utils/axiosInstance';



// // Drag-and-Drop Component
const DragAndDrop = ({ dragging, onDragOver, onDragLeave, onDrop, onBrowse }) => {
  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`border-2 border-dashed h-[300px]  ${
        dragging ? 'border-green-500' : 'border-gray-300'
      } p-6 text-center cursor-pointer rounded-lg hover:bg-gray-50 transition h-1/2`}
    >
      <input
        type="file"
        className="hidden"
        onChange={onBrowse}
        multiple // Allow multiple files
      />
      <p className="text-gray-500">
        Drag 'n' drop The Exam for here, or{' '}
        <span className="text-orange-500 font-semibold cursor-pointer" onClick={() => document.querySelector('input[type="file"]').click()}>
          browse
        </span>{' '}
        to upload
      </p>
    </div>
  );
};

const CreateJob = () => {
  
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(1)
  const [jobDetails, setJobDetails] = useState({
    title: '',
    category: '',
    jobType: '',
    experience: '',
    location: '',
    salary: '',
    description: '',
    summary: '',
    files: [],
  });
  const [errors, setErrors] = useState({});
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(()=>{
    const storedUser = sessionStorage.getItem('user');
    if(storedUser)
      setLoggedUser(JSON.parse(storedUser))
  },[])

  // Handle next and previous steps
  const nextStep = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length === 0) {
      setStep((prev) => Math.min(prev + 1, 3));
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Handle change for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null }); // Clear error on change
    }
  };

  // Validation function
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!jobDetails.title) newErrors.title = "Job title is required.";
      if (!jobDetails.category) newErrors.category = "Category is required.";
      if (!jobDetails.jobType) newErrors.jobType = "Job type is required.";
      if (!jobDetails.experience) newErrors.experience = "Experience is required.";
      if (!jobDetails.location) newErrors.location = "Location is required.";
      if (!jobDetails.salary) newErrors.salary = "Salary is required.";
      if (!jobDetails.description) newErrors.description = "Description is required.";
      if (!jobDetails.summary) newErrors.summary = "Summary is required.";
    }
    return newErrors;
  };

  // Drag-and-drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setJobDetails((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleBrowseClick = (e) => {
    const files = Array.from(e.target.files);
    setJobDetails((prev) => ({ ...prev, files: [...prev.files, ...files] }));
  };

  // Submit the form || create job.
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      for (const key in jobDetails) {
        formData.append(key, jobDetails[key]);
      }
      jobDetails.files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('userId', loggedUser?._id);
  
      axiosInstance.post('/api/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Job created:', response.data);
        Swal.fire({
          title: 'Job created successfully!',
          text: 'Your job has been posted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch(error => {
        console.error('Error creating job:', error);
      });
    } else {
      setErrors(validationErrors);
    }
  };
  return(
    <div className="w-full h-full mx-auto bg-white p-10 rounded-lg shadow-lg overflow-y-scroll">
      {/* Step Indicators */}
      <div className="flex justify-between items-center mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-2 ${
              step >= s ? 'bg-orange-500' : 'bg-gray-300'
            } transition-all duration-300 mx-1 rounded-full`}
          ></div>
        ))}
      </div>

      {step === 1 && (
        <div className="flex flex-col md:flex-row items-start">
          {/* Image Section */}
          <div className="md:w-2/3 mb-6 md:mb-0">
            <img src={JobImage} alt="Job" className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
          {/* Form Section */}
          <div className="md:w-2/3 pl-0 md:pl-6">
            <h2 className="text-3xl font-bold mb-6 text-[rgba(239.146,115,1)]">Step 1: Job Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Job Title</label>
              <input
                type="text"
                name="title"
                value={jobDetails.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Translator"
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Category</label>
              <select 
              value={jobDetails.category}
              onChange={(e)=>{
                setJobDetails({ ...jobDetails, category: e.target.value });
              }}
               className="w-full p-3  my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                  <option>Tech</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Business</option>
                  <option>Real Estate</option>
                  <option>Industry</option>
                  <option>Finance</option>
              </select>
              {errors.category && <p className="text-red-500">{errors.category}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Job Type</label>
              <select 
              value={jobDetails.jobType}
              onChange={(e)=>{
                setJobDetails({ ...jobDetails, jobType: e.target.value });
              }}
               className="w-full p-3  my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                  <option>Contract</option>
                  <option>Internship</option>
              </select>
              {errors.jobType && <p className="text-red-500">{errors.jobType}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Description</label>
              <input
                type="text"
                name="description"
                value={jobDetails.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Brief description here"
              />
              {errors.description && <p className="text-red-500">{errors.description}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Experience</label>
              <select 
              value={jobDetails.experience}
              onChange={(e)=>{
                setJobDetails({ ...jobDetails, experience: e.target.value });
              }}
               className="w-full p-3  my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                  <option>Beginner</option>
                  <option>Mid level</option>
                  <option>Above average</option>
                  <option>Senior level</option>
                  <option>Expert</option>
              </select>
              {errors.experience && <p className="text-red-500">{errors.experience}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Location</label>
              <select 
              value={jobDetails.location}
              onChange={(e)=>{
                setJobDetails({ ...jobDetails, location: e.target.value });
              }}
               className="w-full p-3  my-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              >
                  <option>Yaounde</option>
                  <option>Douala</option>
                  <option>Ebolowa</option>
                  <option>Ngaoundere</option>
                  <option>Bafoussam</option>
                  <option>Maroua</option>
                  <option>Bamenda</option>
                  <option>Bertoua</option>
                  <option>Buea</option>
                  <option>Garoua</option>
              </select>
              {errors.location && <p className="text-red-500">{errors.location}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Salary</label>
              <input
                type="text"
                name="salary"
                value={jobDetails.salary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="350,000"
              />
              {errors.salary && <p className="text-red-500">{errors.salary}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold">Summary</label>
              <input
                type="text"
                name="summary"
                value={jobDetails.summary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                placeholder="Global summary here"
              />
              {errors.summary && <p className="text-red-500">{errors.summary}</p>}
            </div>
            <div className="flex justify-between mt-6">
              <button
                disabled={step === 1}
                onClick={prevStep}
                className={`px-6 py-2 rounded-md transition ${
                  step === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="bg-[rgba(239.146,115,1)] hover:bg-[rgba(239.146,115,1)] text-white px-6 py-2 rounded-md transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[rgba(239.146,115,1)]">Step 2: Upload The Exam for this Job</h2>
          <div className="flex items-center mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full mr-2">
              Step 2
            </span>
            <h3 className="text-lg font-bold">Upload The Exam for this Job</h3>
          </div>
          <DragAndDrop
            dragging={dragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onBrowse={handleBrowseClick}
          />
          <div className="mt-4">
            <h4 className="font-semibold text-gray-600">Uploaded Files:</h4>
            <ul className="mt-2">
              {jobDetails.files.map((file, index) => (
                <li key={index} className="text-gray-700">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              className="bg-[#ef7301] hover: [rgba(239.146,115,1) opacity-60] text-white px-6 py-2 rounded-md transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[rgba(239.146,115,1)]">Step 3: Review and Submit</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Review Your Details:</h3>
            <p className="text-gray-700">
              <strong>Job Title:</strong> {jobDetails.title}
            </p>
            <p className="text-gray-700">
              <strong>Category:</strong> {jobDetails.category}
            </p>
            <p className="text-gray-700">
              <strong>Job Type:</strong> {jobDetails.jobType}
            </p>
            <p className="text-gray-700">
              <strong>Experience:</strong> {jobDetails.experience}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {jobDetails.description}
            </p>
            <p className="text-gray-700">
              <strong>Summary:</strong> {jobDetails.summary}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {jobDetails.location}
            </p>
            <p className="text-gray-700">
              <strong>Salary:</strong> {jobDetails.salary}
            </p>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-600">Uploaded Exam:</h4>
              <ul className="mt-2">
                {jobDetails.files.map((file, index) => (
                  <li key={index} className="text-gray-700">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Previous
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
              Create Job
            </button>
            
          </div>
        </div>
      )}

    </div>
  )
};

export default CreateJob;







