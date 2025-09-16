
import React, { useState } from "react";
import { 
  FaUser, FaUpload, FaLanguage, FaGlobe, 
  FaBriefcase, FaCheck, FaFilePdf, FaFileWord 
} from "react-icons/fa";
import { MdWork, MdEmail, MdPhone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const ManageProfile = ({ darkMode }) => {
  // Sample countries data
  const countries = [
    { name: "Cameroon", code: "+237" },
    { name: "United States", code: "+1" },
    { name: "Nigeria", code: "+234" },
    { name: "United Kingdom", code: "+44" },
  ];

  // Available languages
  const allLanguages = [
    "English", "French", "Spanish", "German", "Chinese",
    "Arabic", "Portuguese", "Russian", "Japanese", "Italian",
    "Igbo", "Bassa", "Duala", "Fulfulde", "Ewondo"
  ];

  // Experience levels
  const experienceLevels = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (6+ years)"
  ];

  // Employment types
  const employmentTypes = [
    "Full-time", "Part-time", "Contract", "Freelance", "Internship"
  ];

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneCode: "+237",
    phoneNumber: "",
    country: "Cameroon",
    jobTitle: "",
    experience: "",
    employmentType: "Full-time"
  });

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleFileUpload = (file, type) => {
    const newFile = {
      file,
      type,
      preview: type === "photo" ? URL.createObjectURL(file) : null
    };
    setFiles(prev => [...prev.filter(f => f.type !== type), newFile]);
  };

  // Remove file
  const removeFile = (type) => {
    setFiles(prev => prev.filter(f => f.type !== type));
  };

  // Handle language selection
  const addLanguage = (lang) => {
    if (!selectedLanguages.includes(lang)) {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const removeLanguage = (lang) => {
    setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // File upload component
  const FileUploadArea = ({ type }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(e.dataTransfer.files[0], type);
      }
    };

    const handleFileChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        handleFileUpload(e.target.files[0], type);
      }
    };

    const file = files.find(f => f.type === type);

    return (
      <div
        className={`border-2 border-dashed rounded-xl p-6 transition-all ${
          dragging ? "border-blue-500 bg-blue-50" : 
          darkMode ? "border-gray-600 hover:border-gray-500" : "border-gray-200 hover:border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {type === "photo" ? (
          file ? (
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={file.preview}
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <button
                  type="button"
                  onClick={() => removeFile(type)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <RiDeleteBinLine size={16} />
                </button>
              </div>
              <button
                type="button"
                className={`mt-4 text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                onClick={() => document.getElementById(`photo-upload`).click()}
              >
                Change Photo
              </button>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className={`w-24 h-24 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center mb-4`}>
                <FaUser className={`text-3xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Drag & drop profile photo here</p>
              <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</p>
              <label className={`px-4 py-2 bg-gradient-to-r from-[#EF9273] to-[#C35029] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}>
                Browse Photos
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full flex items-center justify-center mb-4`}>
              {type === "cv" ? (
                <FaFileWord className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
              ) : (
                <FaFilePdf className={`text-2xl ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
              )}
            </div>
            <p className={`mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Drag & drop your {type === "cv" ? "CV/Resume" : "certifications"} here
            </p>
            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>or</p>
            <label className={`px-4 py-2 bg-gradient-to-r from-[#EF9273] to-[#C35029] text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}>
              Browse Files
              <input
                type="file"
                accept={type === "cv" ? ".pdf,.doc,.docx" : "*"}
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {file && (
              <div className={`mt-4 w-full rounded-lg p-3 flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <span className={`truncate text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>{file.file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(type)}
                  className={darkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}
                >
                  <RiDeleteBinLine size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Step navigation
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className={`min-h-full ${darkMode ? 'bg-gray-900' : 'bg-[#FEF9F8]'} py-8 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          <h1 className="text-3xl font-bold mb-3">
            Complete Your Professional Profile
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Showcase your language expertise and get matched with the best translation opportunities
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-10 relative">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-[#EF9273] to-[#C35029] text-white"
                    : darkMode 
                      ? "bg-gray-700 border-2 border-gray-500 text-gray-300"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                } font-medium shadow-sm`}
              >
                {step}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step 
                    ? darkMode ? 'text-white' : 'text-gray-900'
                    : darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {step === 1 ? "Personal Info" : step === 2 ? "Professional" : "Documents"}
              </span>
            </div>
          ))}
          <div className={`absolute top-6 left-0 right-0 h-1 -z-1 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className="h-full bg-gradient-to-r from-[#EF9273] to-[#C35029] transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={`rounded-2xl shadow-xl overflow-hidden ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <FaUser className="text-[#C35029] mr-3" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300 text-gray-900'
                      }`}
                      placeholder="John Doe"
                    />
                    <FaUser className={`absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300 text-gray-900'
                      }`}
                      placeholder="john@example.com"
                    />
                    <MdEmail className={`absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="flex">
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleChange}
                      className={`w-1/4 p-3 border rounded-l-lg focus:ring-[#EF9273] focus:border-[#EF9273] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {countries.map(country => (
                        <option key={country.code} value={country.code}>
                          {country.code}
                        </option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className={`w-full p-3 pl-10 border-t border-r border-b rounded-r-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'border-gray-300 text-gray-900'
                        }`}
                        placeholder="123456789"
                      />
                      <MdPhone className={`absolute left-3 top-3.5 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="country" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] appearance-none ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {countries.map(country => (
                        <option key={country.name} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <FaGlobe className={`absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <div className={`absolute right-3 top-3.5 pointer-events-none ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Profile Photo
                  </label>
                  <FileUploadArea type="photo" />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#EF9273] to-[#C35029] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Next: Professional Information
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <FaBriefcase className="text-[#C35029] mr-3" />
                Professional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                  <label htmlFor="jobTitle" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Job Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                      className={`w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300 text-gray-900'
                      }`}
                      placeholder="e.g. Spanish Translator"
                    />
                    <MdWork className={`absolute left-3 top-3.5 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experience" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select experience level</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Languages */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Languages You Speak
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search and add languages..."
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'border-gray-300 text-gray-900'
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (allLanguages.includes(value)) {
                          addLanguage(value);
                          e.target.value = "";
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (e.target.value.trim() && !selectedLanguages.includes(e.target.value)) {
                            addLanguage(e.target.value);
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedLanguages.map(lang => (
                      <span
                        key={lang}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-[#EF9273] text-white text-sm"
                      >
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang)}
                          className="ml-2 text-white hover:text-gray-200"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                  <p className={`mt-2 text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Tip: Start typing a language and press Enter to add it
                  </p>
                </div>

                {/* Employment Type */}
                <div>
                  <label htmlFor="employmentType" className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Preferred Employment Type
                  </label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    required
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EF9273] focus:border-[#EF9273] ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {employmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-[#EF9273] to-[#C35029] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Next: Documents
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="p-8">
              <h2 className={`text-2xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <FaUpload className="text-[#C35029] mr-3" />
                Documents
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CV/Resume */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    CV/Resume (Required)
                  </label>
                  <FileUploadArea type="cv" />
                  <p className={`mt-2 text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* Certifications */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Certifications (Optional)
                  </label>
                  <FileUploadArea type="certifications" />
                  <p className={`mt-2 text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Upload any language certifications you have
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition-colors`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 text-white rounded-lg font-medium ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#EF9273] to-[#C35029] hover:opacity-90'
                  } transition-all flex items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : success ? (
                    <>
                      <FaCheck className="mr-2" />
                      Profile Complete!
                    </>
                  ) : (
                    'Complete Profile'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ManageProfile;