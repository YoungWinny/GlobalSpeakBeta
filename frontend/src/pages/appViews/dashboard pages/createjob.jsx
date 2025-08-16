import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import JobImage from "../../../assets/images/job.jpg";
import { axiosInstance } from '../../../utils/axiosInstance';
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaInfoCircle } from 'react-icons/fa';

const CreateJob = ({ darkMode }) => {
  const [step, setStep] = useState(1);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    category: '',
    jobType: '',
    experience: '',
    location: '',
    salary: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) setLoggedUser(JSON.parse(storedUser));
  }, []);

  const nextStep = () => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length === 0) {
      setStep(prev => Math.min(prev + 1, 2));
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateStep = () => {
    const newErrors = {};
    if (!jobDetails.title) newErrors.title = "Job title is required";
    if (!jobDetails.category) newErrors.category = "Category is required";
    if (!jobDetails.jobType) newErrors.jobType = "Job type is required";
    if (!jobDetails.experience) newErrors.experience = "Experience is required";
    if (!jobDetails.location) newErrors.location = "Location is required";
    if (!jobDetails.salary) newErrors.salary = "Salary is required";
    if (!jobDetails.description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateStep();
    
    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      for (const key in jobDetails) {
        formData.append(key, jobDetails[key]);
      }
      formData.append('userId', loggedUser?._id);

      axiosInstance.post('/api/jobs', formData)
        .then(response => {
          Swal.fire({
            title: 'Success!',
            text: 'Job created successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          // Reset form after successful submission
          setJobDetails({
            title: '',
            category: '',
            jobType: '',
            experience: '',
            location: '',
            salary: '',
            description: ''
          });
          setStep(1);
        })
        .catch(error => {
          console.error('Error creating job:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to create job',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  // Job categories and options
  const categories = ['Tech', 'Design', 'Marketing', 'Business', 'Real Estate', 'Industry', 'Finance'];
  const jobTypes = ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'];
  const experienceLevels = ['Beginner', 'Mid level', 'Above average', 'Senior level', 'Expert'];
  const locations = ['Yaounde', 'Douala', 'Ebolowa', 'Ngaoundere', 'Bafoussam', 'Maroua', 'Bamenda', 'Bertoua', 'Buea', 'Garoua'];

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= stepNumber ? 'bg-[#EF9273] text-white' : 'bg-gray-200 text-gray-600'}`}>
                {stepNumber}
              </div>
              {stepNumber < 2 && (
                <div className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-[#EF9273]' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step === 1 ? 'text-[#C35029] font-medium' : 'text-gray-500'}>Job Details</span>
          <span className={step === 2 ? 'text-[#C35029] font-medium' : 'text-gray-500'}>Review</span>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Job Image */}
          <div className="flex flex-col">
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <img src={JobImage} alt="Job" className="w-full h-auto object-cover" />
            </div>
            <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${darkMode ? 'border-gray-600' : 'border-blue-100'}`}>
              <div className="flex items-start">
                <FaInfoCircle className={`mt-1 mr-2 ${darkMode ? 'text-gray-300' : 'text-blue-600'}`} />
                <div>
                  <h3 className="font-medium mb-1">Tips for a great job posting</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Be specific about requirements and include key responsibilities to attract qualified candidates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-[#C35029]">Create New Job</h2>
            
            <div className="space-y-5">
              {/* Job Title */}
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Job Title *
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={jobDetails.title}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                    placeholder="e.g. Spanish Translator"
                  />
                </div>
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Category and Job Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category *
                  </label>
                  <select
                    value={jobDetails.category}
                    onChange={handleChange}
                    name="category"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Job Type *
                  </label>
                  <select
                    value={jobDetails.jobType}
                    onChange={handleChange}
                    name="jobType"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                  >
                    <option value="">Select job type</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.jobType && <p className="mt-1 text-sm text-red-500">{errors.jobType}</p>}
                </div>
              </div>

              {/* Experience and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Experience Level *
                  </label>
                  <select
                    value={jobDetails.experience}
                    onChange={handleChange}
                    name="experience"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                  {errors.experience && <p className="mt-1 text-sm text-red-500">{errors.experience}</p>}
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <select
                      value={jobDetails.location}
                      onChange={handleChange}
                      name="location"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                    >
                      <option value="">Select location</option>
                      {locations.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Salary (XAF) *
                </label>
                <div className="relative">
                  <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="salary"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                    placeholder="e.g. 350,000"
                  />
                </div>
                {errors.salary && <p className="mt-1 text-sm text-red-500">{errors.salary}</p>}
              </div>

              {/* Description */}
              <div>
                <label className={`block mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={jobDetails.description}
                  onChange={handleChange}
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={nextStep}
                className="bg-[#C35029] hover:bg-[#EF9273] text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Continue to Review
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#C35029]">Review Job Details</h2>
          
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} mb-6`}>
            <h3 className="text-xl font-semibold mb-4">{jobDetails.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Category</span>
                <p className="font-medium">{jobDetails.category}</p>
              </div>
              <div>
                <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Job Type</span>
                <p className="font-medium">{jobDetails.jobType}</p>
              </div>
              <div>
                <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Experience</span>
                <p className="font-medium">{jobDetails.experience}</p>
              </div>
              <div>
                <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Location</span>
                <p className="font-medium">{jobDetails.location}</p>
              </div>
              <div>
                <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Salary</span>
                <p className="font-medium">{jobDetails.salary ? `${jobDetails.salary} XAF` : 'Not specified'}</p>
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`block text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Description</span>
              <p className="whitespace-pre-line">{jobDetails.description}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              className={`px-6 py-2 rounded-lg border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} transition-colors duration-300`}
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#C35029] hover:bg-[#EF9273] text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Post Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJob;
