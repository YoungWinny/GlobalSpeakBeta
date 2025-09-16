// import React, { useState, useEffect } from "react";
// import search from "../../../assets/images/search-svgrepo-com.svg";
// import location from "../../../assets/images/location-pin-svgrepo-com.svg";
// import transcription from "../../../assets/images/transcription.svg";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import { FiX } from "react-icons/fi";
// import Swal from 'sweetalert2';
// import useUser from "../../../hooks/useUser";

// function isImage(filename) {
//   const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
//   const extension = filename?.split(".").pop()?.toLowerCase();
//   return filename && imageExtensions.includes(extension);
// }

// const TaskCreationModal = ({ job, onClose, refreshJobs }) => {
//   const [files, setFiles] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handleUpload = async () => {
//     if (!files || files.length === 0) {
//       Swal.fire("Error", "Please select files", "error");
//       return;
//     }

//     try {
//       setUploading(true);
//       const formData = new FormData();
//       Array.from(files).forEach(file => {
//         formData.append("files", file);
//       });

//       const response = await axiosInstance.post(
//         `/api/tasks/initial/${job._id}`,
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' }
//         }
//       );

//       if (response.data.task) {
//         Swal.fire({
//           title: "Success!",
//           text: "Initial task files uploaded successfully",
//           icon: "success"
//         });
//         refreshJobs();
//         onClose();
//       } else {
//         throw new Error("Failed to upload files");
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       Swal.fire({
//         title: "Error",
//         text: error.response?.data?.error || "Failed to upload initial task files",
//         icon: "error"
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Upload Initial Task Files</h2>
//         <p className="text-sm text-gray-600 mb-4">
//           These files will be visible to the job seeker as task instructions.
//         </p>
//         <input 
//           type="file" 
//           onChange={handleFileChange} 
//           multiple 
//           className="mb-4 w-full"
//           accept=".pdf,.doc,.docx,.txt,.csv,.jpg,.jpeg,.png"
//         />
//         <div className="flex justify-end gap-2">
//           <button 
//             onClick={onClose} 
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//             disabled={uploading}
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={handleUpload}
//             disabled={!files || uploading}
//             className={`px-4 py-2 text-white rounded ${
//               uploading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
//             } transition flex items-center justify-center`}
//           >
//             {uploading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Uploading...
//               </>
//             ) : 'Upload Files'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ExamModal = ({ onClose, onSave, handleSetExam }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: '' }]);
//   const letters = ['A', 'B', 'C', 'D'];

//   const handleQuestionChange = (e) => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion - 1].question = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (e, optionIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion - 1].options[optionIndex] = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: '' }]);
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 1) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const saveQuestions = () => {
//     onSave(questions);
//     handleSetExam(questions);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg relative shadow-2xl max-w-lg w-full">
//         <button
//           className="absolute top-3 right-3 text-black text-2xl bg-red-500 w-10 h-10 flex justify-center items-center"
//           onClick={onClose}
//         >
//           <FiX color="white"/>
//         </button>
//         <h2 className="text-2xl font-bold mb-4">Set MCQ Questions</h2>
//         <div className="mb-4">
//           <label className="block font-semibold">Question {currentQuestion}</label>
//           <input
//             type="text"
//             value={questions[currentQuestion - 1]?.question || ""}
//             onChange={handleQuestionChange}
//             className="w-full p-2 border border-gray-300 rounded-lg mb-3"
//             placeholder="Enter your question"
//           />
//           <div>
//             {questions[currentQuestion - 1]?.options.map((option, i) => (
//               <div key={i} className="mb-2">
//                 <label className="block text-gray-700">{letters[i]}</label>
//                 <input
//                   type="text"
//                   value={option}
//                   onChange={(e) => handleOptionChange(e, i)}
//                   className="w-full p-2 border border-gray-300 rounded-lg"
//                   placeholder={`Option ${i + 1}`}
//                 /> 
//               </div>
//             ))}
//             <div>
//               <label>Correct Answer</label> <br />
//               <select
//                 value={questions[currentQuestion - 1]?.answer}
//                 onChange={(e) => {
//                   const temp = [...questions];
//                   temp[currentQuestion - 1].answer = e.target.value;
//                   setQuestions(temp);
//                 }}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//               >
//                 {letters.map((letter) => (
//                   <option key={letter}>{letter}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={prevQuestion}
//             disabled={currentQuestion === 1}
//             className={`px-4 py-2 bg-gray-400 text-white rounded-lg ${currentQuestion === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
//           >
//             Previous
//           </button>
//           <button
//             onClick={nextQuestion}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             Next
//           </button>
//         </div>
//         <div className="mt-6">
//           <button
//             onClick={saveQuestions}
//             className="w-full py-2 bg-green-500 text-white rounded-lg"
//           >
//             Save Exam
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex justify-center mt-8 space-x-2">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50"
//       >
//         Prev
//       </button>
//       <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="px-3 py-1 border border-gray-300 rounded-md bg-white disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// const JobCard = ({ job, loggedUser, refreshJobs }) => {
//   const [questions, setQuestions] = useState([]);
//   const [showExamModal, setShowExamModal] = useState(false);
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const navigate = useNavigate();

//   const handleApplyClick = () => {
//     navigate(`job/${job._id}`, { state: job });
//   };

//   const saveQuestions = (questions) => {
//     setQuestions(questions);
//   };

//   const handleSetExam = async (questions) => {
//     const formattedQuestions = questions.map((item) => ({
//       question: item.question,
//       answer: item.answer,
//       ...item.options.reduce((acc, option, idx) => {
//         acc[`option${idx + 1}`] = option;
//         return acc;
//       }, {})
//     }));

//     try {
//       const response = await axiosInstance.post("/api/exam", {
//         job,
//         questions: formattedQuestions
//       });
      
//       if (response.data) {
//         Swal.fire("Success!", "Questions added to this job", "success");
//         refreshJobs();
//       } else {
//         Swal.fire("Error!", "Couldn't add questions, please try again.", "error");
//       }
//     } catch (err) {
//       console.error('Exam creation error:', err);
//       Swal.fire("Error!", "Couldn't add questions, please try again.", "error");
//     } finally {
//       setShowExamModal(false);
//     }
//   };

//   const image = job?.files?.find(filename => filename && isImage(filename));

//   return (
//     <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
//       <div className="flex items-center space-x-4">
//         <img 
//           src={transcription} 
//           alt="Company Logo" 
//           className="h-12 w-12 object-cover rounded"
//         />
//         <div>
//           <h3 className="font-bold">{job.title}</h3>
//           <p className="text-gray-600">{job.location}</p>
//           <div className="flex space-x-2 mt-1">
//             {job.category && Array.isArray(job.category) && job.category.length > 0 ? (
//               job.category.map((cat, idx) => (
//                 <span
//                   key={idx}
//                   className={`bg-${cat.color}-100 text-${cat.color}-500 px-2 py-1 rounded-full`}
//                 >
//                   {cat.label}
//                 </span>
//               ))
//             ) : (
//               <span>{job?.category || "No categories"}</span>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="flex space-x-2">
//         <button
//           onClick={handleApplyClick}
//           className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 rounded-md hover:bg-[rgba(239,146,115,0.9)] transition"
//         >
//           {loggedUser?.role === 'jobseeker' ? 'Apply' : 'View Details'}
//         </button>
//         {!job?.examSet && loggedUser?.role === 'recruiter' && (
//           <>
//             <button
//               onClick={() => setShowExamModal(true)}
//               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
//             >
//               Set Exam
//             </button>
//             <button
//               onClick={() => setShowTaskModal(true)}
//               className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition"
//             >
//               Add Files
//             </button>
//           </>
//         )}
//       </div>
//       {showExamModal && (
//         <ExamModal 
//           onClose={() => setShowExamModal(false)} 
//           onSave={saveQuestions} 
//           handleSetExam={handleSetExam} 
//         />
//       )}
//       {showTaskModal && (
//         <TaskCreationModal 
//           job={job} 
//           onClose={() => setShowTaskModal(false)}
//           refreshJobs={refreshJobs}
//         />
//       )}
//     </li>
//   );
// };

// const Apply = () => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState(false);
//   const loggedUser = useUser();
//   const jobsPerPage = 6;
  
//   const [searchOptions, setSearchOptions] = useState({
//     title: "",
//     location: "",
//     type: [],
//     category: [],
//     experience: [],
//   });

//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       setApiError(false);
      
//       const response = await axiosInstance.get("/api/jobs");
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
      
//       const jobsData = storedUser?.role === "recruiter"
//         ? response.data.filter(job => job.userId === storedUser._id)
//         : response.data;

//       setJobs(jobsData);
//       setFilteredJobs(jobsData);
//       sessionStorage.setItem("jobList", JSON.stringify(response.data));
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//       setApiError(true);
//       Swal.fire({
//         icon: 'error',
//         title: 'Connection Error',
//         text: 'Could not connect to the server. Please try again later.',
//         timer: 3000
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();

//     const retryInterval = setInterval(() => {
//       if (apiError) fetchJobs();
//     }, 30000);

//     return () => clearInterval(retryInterval);
//   }, [apiError]);

//   useEffect(() => {
//     const filtered = jobs.filter(job => {
//       const matchesTitle = searchOptions.title 
//         ? job.title.toLowerCase().includes(searchOptions.title.toLowerCase())
//         : true;
      
//       const matchesLocation = searchOptions.location
//         ? job.location.toLowerCase().includes(searchOptions.location.toLowerCase())
//         : true;
      
//       const matchesCategory = searchOptions.category.length > 0
//         ? searchOptions.category.includes(job.category)
//         : true;

//       return matchesTitle && matchesLocation && matchesCategory;
//     });

//     setFilteredJobs(filtered);
//     setCurrentPage(1);
//   }, [searchOptions, jobs]);

//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const { name, value } = e.target;
//     setSearchOptions(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading jobs...</div>
//       </div>
//     );
//   }

//   if (apiError) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-xl">
//           Server connection failed. Trying to reconnect...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 min-h-screen overflow-auto">
//       <main className="max-w-6xl mx-auto px-4 py-4 overflow-auto h-screen w-full">
//         <h1 className="text-4xl font-bold mb-6">
//           Discover more than{" "}
//           <span className="text-[rgba(239,146,115,1)]">
//             4000+ Translation and Transcription Jobs
//           </span>
//         </h1>

//         <div className="bg-white flex flex-col md:flex-row items-center justify-between p-4 rounded-lg shadow mb-8">
//           <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
//             <img
//               className="h-10 w-10 mr-3"
//               src={search}
//               alt="Search Icon"
//             />
//             <input
//               className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2"
//               type="text"
//               placeholder="Job title or keyword"
//               name="title"
//               value={searchOptions.title}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
//             <img
//               className="h-10 w-10 mr-3"
//               src={location}
//               alt="Location Icon"
//             />
//             <input
//               className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 py-2"
//               type="text"
//               placeholder="Location"
//               name="location"
//               value={searchOptions.location}
//               onChange={handleSearchChange}
//             />
//           </div>
//           <div className="flex space-x-2 w-full md:w-auto">
//             <button className="bg-[rgba(239,146,115,1)] hover:bg-[rgba(239,146,115,0.9)] text-white px-4 py-2 rounded transition">
//               Search Jobs
//             </button>
//             {loggedUser?.role !== "jobseeker" && (
//               <Link 
//                 to="/dashboard/createjob"
//                 className="bg-[rgba(239,146,115,1)] hover:bg-[rgba(239,146,115,0.9)] text-white px-4 py-2 rounded transition flex items-center"
//               >
//                 Create Job
//               </Link>
//             )}
//           </div>
//         </div>

//         <section className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">All Jobs</h2>
//             <span className="text-gray-600">
//               Showing {filteredJobs.length} jobs
//             </span>
//           </div>

//           <ul className="space-y-4">
//             {currentJobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}
//                 loggedUser={loggedUser}
//                 refreshJobs={fetchJobs}
//               />
//             ))}
//           </ul>

//           {totalPages > 1 && (
//             <PaginationControls
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Apply;

















































// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import { FiX, FiSearch, FiMapPin, FiFileText } from "react-icons/fi";
// import { FaChalkboardTeacher, FaLanguage } from "react-icons/fa";
// import Swal from 'sweetalert2';
// import useUser from "../../../hooks/useUser";

// const Apply = ({ darkMode }) => {
//   const [jobs, setJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState(false);
//   const loggedUser = useUser();
//   const jobsPerPage = 6;
  
//   const [searchOptions, setSearchOptions] = useState({
//     title: "",
//     location: "",
//   });

//   // Fetch jobs data
//   const fetchJobs = async () => {
//     try {
//       setLoading(true);
//       setApiError(false);
      
//       const response = await axiosInstance.get("/api/jobs");
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
      
//       const jobsData = storedUser?.role === "recruiter"
//         ? response.data.filter(job => job.userId === storedUser._id)
//         : response.data;

//       setJobs(jobsData);
//       setFilteredJobs(jobsData);
//     } catch (err) {
//       console.error("Error fetching jobs:", err);
//       setApiError(true);
//       Swal.fire({
//         icon: 'error',
//         title: 'Connection Error',
//         text: 'Could not connect to the server. Please try again later.',
//         timer: 3000
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//     const retryInterval = setInterval(() => {
//       if (apiError) fetchJobs();
//     }, 30000);
//     return () => clearInterval(retryInterval);
//   }, [apiError]);

//   // Filter jobs based on search
//   useEffect(() => {
//     const filtered = jobs.filter(job => {
//       const matchesTitle = searchOptions.title 
//         ? job.title.toLowerCase().includes(searchOptions.title.toLowerCase())
//         : true;
      
//       const matchesLocation = searchOptions.location
//         ? job.location.toLowerCase().includes(searchOptions.location.toLowerCase())
//         : true;

//       return matchesTitle && matchesLocation;
//     });
//     setFilteredJobs(filtered);
//     setCurrentPage(1);
//   }, [searchOptions, jobs]);

//   // Pagination logic
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
//   const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

//   const handlePageChange = (page) => {
//     if (page > 0 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const { name, value } = e.target;
//     setSearchOptions(prev => ({ ...prev, [name]: value }));
//   };

//   if (loading) {
//     return (
//       <div className={`flex justify-center items-center h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//         <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Loading jobs...</div>
//       </div>
//     );
//   }

//   if (apiError) {
//     return (
//       <div className={`flex justify-center items-center h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//         <div className="text-red-500 text-xl">
//           Server connection failed. Trying to reconnect...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`h-full overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Header Section */}
//         <div className="mb-8">
//           <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//             Find Your Perfect Language Opportunity
//           </h1>
//           <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//             Browse thousands of translation and transcription jobs
//           </p>
//         </div>

//         {/* Search Bar */}
//         <div className={`p-4 rounded-xl shadow-sm mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className={`flex items-center flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//               <FiSearch className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
//               <input
//                 type="text"
//                 placeholder="Job title or keyword"
//                 name="title"
//                 value={searchOptions.title}
//                 onChange={handleSearchChange}
//                 className={`flex-1 bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
//               />
//             </div>
//             <div className={`flex items-center flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//               <FiMapPin className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 name="location"
//                 value={searchOptions.location}
//                 onChange={handleSearchChange}
//                 className={`flex-1 bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
//               />
//             </div>
//             <div className="flex gap-2">
//               <button className={`px-6 py-3 rounded-lg bg-[#EF9273] hover:bg-[#C35029] text-white transition`}>
//                 Search
//               </button>
//               {loggedUser?.role !== "jobseeker" && (
//                 <Link 
//                   to="/dashboard/createjob"
//                   className={`px-6 py-3 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition`}
//                 >
//                   <FaChalkboardTeacher />
//                   Post Job
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Job Listings */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//               Available Positions
//             </h2>
//             <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               {filteredJobs.length} jobs found
//             </span>
//           </div>

//           <div className="space-y-4">
//             {currentJobs.map((job) => (
//               <JobCard
//                 key={job._id}
//                 job={job}
//                 loggedUser={loggedUser}
//                 refreshJobs={fetchJobs}
//                 darkMode={darkMode}
//               />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <PaginationControls
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//               darkMode={darkMode}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Job Card Component
// const JobCard = ({ job, loggedUser, refreshJobs, darkMode }) => {
//   const [showExamModal, setShowExamModal] = useState(false);
//   const navigate = useNavigate();

//   const handleApplyClick = () => {
//     navigate(`job/${job._id}`, { state: job });
    
//   };

//   return (
//     <div className={`p-6 rounded-xl transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}>
//       <div className="flex flex-col md:flex-row md:items-center gap-6">
//         <div className="flex-shrink-0">
//           <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-[#EF9273]`}>
//             <FiFileText size={24} />
//           </div>
//         </div>
        
//         <div className="flex-1 min-w-0">
//           <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//             {job.title}
//           </h3>
//           <div className="flex items-center gap-2 mb-2">
//             <FaLanguage className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
//             <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//               {job.location}
//             </p>
//           </div>
          
//           <div className="flex flex-wrap gap-2">
//             {job.category && Array.isArray(job.category) && job.category.length > 0 ? (
//               job.category.map((cat, idx) => (
//                 <span
//                   key={idx}
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
//                   }`}
//                 >
//                   {cat.label}
//                 </span>
//               ))
//             ) : null}
//           </div>
//         </div>
        
//         <div className="flex flex-wrap gap-2 justify-end">
//           <button
//             onClick={handleApplyClick}
//             className={`px-4 py-2 rounded-lg transition ${
//               darkMode ? 'bg-[#EF9273] hover:bg-[#C35029] text-white' : 'bg-[#EF9273] hover:bg-[#C35029] text-white'
//             }`}
//           >
//             {loggedUser?.role === 'jobseeker' ? 'Apply Now' : 'View Details'}
//           </button>
          
//           {!job?.examSet && loggedUser?.role === 'recruiter' && (
//             <button
//               onClick={() => setShowExamModal(true)}
//               className={`px-4 py-2 rounded-lg transition ${
//                 darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//               }`}
//             >
//               Set Exam
//             </button>
//           )}
//         </div>
//       </div>
      
//       {showExamModal && (
//         <ExamModal 
//           onClose={() => setShowExamModal(false)} 
//           handleSetExam={async (questions) => {
//             try {
//               const response = await axiosInstance.post("/api/exam", {
//                 job,
//                 questions: questions.map(q => ({
//                   question: q.question,
//                   answer: q.answer,
//                   ...q.options.reduce((acc, opt, idx) => ({ ...acc, [`option${idx+1}`]: opt }), {})
//                 }))
//               });
              
//               if (response.data) {
//                 Swal.fire("Success!", "Exam added successfully", "success");
//                 refreshJobs();
//               }
//             } catch (err) {
//               Swal.fire("Error!", "Failed to add exam", "error");
//             }
//           }} 
//           darkMode={darkMode}
//         />
//       )}
//     </div>
//   );
// };

// // Exam Modal Component
// const ExamModal = ({ onClose, handleSetExam, darkMode }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: 'A' }]);

//   const handleQuestionChange = (e) => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion - 1].question = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionChange = (e, optionIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion - 1].options[optionIndex] = e.target.value;
//     setQuestions(newQuestions);
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 'A' }]);
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
//   };

//   const saveQuestions = () => {
//     handleSetExam(questions);
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//       <div className={`rounded-xl shadow-2xl w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//               Create Exam Questions
//             </h2>
//             <button
//               onClick={onClose}
//               className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//             >
//               <FiX className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
//             </button>
//           </div>
          
//           <div className="mb-6">
//             <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               Question {currentQuestion}
//             </label>
//             <input
//               type="text"
//               value={questions[currentQuestion - 1]?.question || ""}
//               onChange={handleQuestionChange}
//               className={`w-full p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
//               placeholder="Enter your question"
//             />
            
//             <div className="space-y-3">
//               {['A', 'B', 'C', 'D'].map((letter, i) => (
//                 <div key={letter} className="flex items-center gap-3">
//                   <span className={`font-medium w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{letter}</span>
//                   <input
//                     type="text"
//                     value={questions[currentQuestion - 1]?.options[i] || ""}
//                     onChange={(e) => handleOptionChange(e, i)}
//                     className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
//                     placeholder={`Option ${letter}`}
//                   />
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-4">
//               <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                 Correct Answer
//               </label>
//               <select
//                 value={questions[currentQuestion - 1]?.answer}
//                 onChange={(e) => {
//                   const temp = [...questions];
//                   temp[currentQuestion - 1].answer = e.target.value;
//                   setQuestions(temp);
//                 }}
//                 className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
//               >
//                 {['A', 'B', 'C', 'D'].map(letter => (
//                   <option key={letter} value={letter}>Option {letter}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <button
//               onClick={prevQuestion}
//               disabled={currentQuestion === 1}
//               className={`px-4 py-2 rounded-lg ${currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
//                 darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//               }`}
//             >
//               Previous
//             </button>
            
//             <div className="flex gap-2">
//               <button
//                 onClick={nextQuestion}
//                 className={`px-4 py-2 rounded-lg ${
//                   darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//                 }`}
//               >
//                 Next Question
//               </button>
              
//               <button
//                 onClick={saveQuestions}
//                 className={`px-4 py-2 rounded-lg bg-[#EF9273] hover:bg-[#C35029] text-white`}
//               >
//                 Save Exam
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Pagination Controls Component
// const PaginationControls = ({ currentPage, totalPages, onPageChange, darkMode }) => {
//   return (
//     <div className="flex justify-center mt-8 gap-2">
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
//           darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//         }`}
//       >
//         Previous
//       </button>
      
//       <div className={`flex items-center px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//         Page {currentPage} of {totalPages}
//       </div>
      
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${
//           darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
//         }`}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Apply;


































import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FiX, FiSearch, FiMapPin, FiFileText } from "react-icons/fi";
import { FaChalkboardTeacher, FaLanguage } from "react-icons/fa";
import Swal from 'sweetalert2';
import useUser from "../../../hooks/useUser";

const Apply = ({ darkMode }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const loggedUser = useUser();
  const jobsPerPage = 6;
  
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    location: "",
  });

  // Fetch jobs data
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setApiError(false);
      
      const response = await axiosInstance.get("/api/jobs");
      const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
      
      const jobsData = storedUser?.role === "recruiter"
        ? response.data.filter(job => job.userId === storedUser._id)
        : response.data;

      setJobs(jobsData);
      setFilteredJobs(jobsData);
      sessionStorage.setItem("jobList", JSON.stringify(response.data));
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setApiError(true);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Could not connect to the server. Please try again later.',
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const retryInterval = setInterval(() => {
      if (apiError) fetchJobs();
    }, 30000);
    return () => clearInterval(retryInterval);
  }, [apiError]);

  // Filter jobs based on search
  useEffect(() => {
    const filtered = jobs.filter(job => {
      const matchesTitle = searchOptions.title 
        ? job.title.toLowerCase().includes(searchOptions.title.toLowerCase())
        : true;
      
      const matchesLocation = searchOptions.location
        ? job.location.toLowerCase().includes(searchOptions.location.toLowerCase())
        : true;

      return matchesTitle && matchesLocation;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }, [searchOptions, jobs]);

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchOptions(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>Loading jobs...</div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className={`flex justify-center items-center h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-red-500 text-xl">
          Server connection failed. Trying to reconnect...
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Find Your Perfect Language Opportunity
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Browse thousands of translation and transcription jobs
          </p>
        </div>

        {/* Search Bar */}
        <div className={`p-4 rounded-xl shadow-sm mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex items-center flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <FiSearch className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Job title or keyword"
                name="title"
                value={searchOptions.title}
                onChange={handleSearchChange}
                className={`flex-1 bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
              />
            </div>
            <div className={`flex items-center flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <FiMapPin className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={searchOptions.location}
                onChange={handleSearchChange}
                className={`flex-1 bg-transparent focus:outline-none ${darkMode ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
              />
            </div>
            <div className="flex gap-2">
              <button className={`px-6 py-3 rounded-lg bg-[#EF9273] hover:bg-[#C35029] text-white transition`}>
                Search
              </button>
              {loggedUser?.role !== "jobseeker" && (
                <Link 
                  to="/dashboard/createjob"
                  className={`px-6 py-3 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} transition`}
                >
                  <FaChalkboardTeacher />
                  Create Job
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Available Positions
            </h2>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {filteredJobs.length} jobs found
            </span>
          </div>

          <div className="space-y-4">
            {currentJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                loggedUser={loggedUser}
                refreshJobs={fetchJobs}
                darkMode={darkMode}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, loggedUser, refreshJobs, darkMode }) => {
  const [showExamModal, setShowExamModal] = useState(false);
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Use absolute path for navigation
    navigate(`/dashboard/job/${job._id}`, { state: job });
  };

  const handleSetExam = async (questions) => {
    try {
      const formattedQuestions = questions.map((item) => ({
        question: item.question,
        answer: item.answer,
        ...item.options.reduce((acc, option, idx) => {
          acc[`option${idx + 1}`] = option;
          return acc;
        }, {})
      }));

      const response = await axiosInstance.post("/api/exam", {
        job,
        questions: formattedQuestions
      });
      
      if (response.data) {
        Swal.fire("Success!", "Questions added to this job", "success");
        refreshJobs();
      } else {
        Swal.fire("Error!", "Couldn't add questions, please try again.", "error");
      }
    } catch (err) {
      console.error('Exam creation error:', err);
      Swal.fire("Error!", "Couldn't add questions, please try again.", "error");
    } finally {
      setShowExamModal(false);
    }
  };

  return (
    <div className={`p-6 rounded-xl transition-all hover:shadow-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'}`}>
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-shrink-0">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-[#EF9273]`}>
            <FiFileText size={24} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <FaLanguage className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {job.location}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.category && Array.isArray(job.category) && job.category.length > 0 ? (
              job.category.map((cat, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {cat.label}
                </span>
              ))
            ) : null}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-end">
          <button
            onClick={handleApplyClick}
            className={`px-4 py-2 rounded-lg transition ${
              darkMode ? 'bg-[#EF9273] hover:bg-[#C35029] text-white' : 'bg-[#EF9273] hover:bg-[#C35029] text-white'
            }`}
          >
            {loggedUser?.role === 'jobseeker' ? 'View Details' : 'View Details'}
          </button>
          
          {!job?.examSet && loggedUser?.role === 'recruiter' && (
            <button
              onClick={() => setShowExamModal(true)}
              className={`px-4 py-2 rounded-lg transition ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Set Exam
            </button>
          )}
        </div>
      </div>
      
      {showExamModal && (
        <ExamModal 
          onClose={() => setShowExamModal(false)} 
          handleSetExam={handleSetExam}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

// Exam Modal Component
const ExamModal = ({ onClose, handleSetExam, darkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: 'A' }]);

  const handleQuestionChange = (e) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion - 1].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (e, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion - 1].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: 'A' }]);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const saveQuestions = () => {
    handleSetExam(questions);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className={`rounded-xl shadow-2xl w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Create Exam Questions
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FiX className={darkMode ? 'text-white' : 'text-gray-800'} size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Question {currentQuestion}
            </label>
            <input
              type="text"
              value={questions[currentQuestion - 1]?.question || ""}
              onChange={handleQuestionChange}
              className={`w-full p-3 rounded-lg mb-4 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
              placeholder="Enter your question"
            />
            
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((letter, i) => (
                <div key={letter} className="flex items-center gap-3">
                  <span className={`font-medium w-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{letter}</span>
                  <input
                    type="text"
                    value={questions[currentQuestion - 1]?.options[i] || ""}
                    onChange={(e) => handleOptionChange(e, i)}
                    className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
                    placeholder={`Option ${letter}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <label className={`block font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Correct Answer
              </label>
              <select
                value={questions[currentQuestion - 1]?.answer}
                onChange={(e) => {
                  const temp = [...questions];
                  temp[currentQuestion - 1].answer = e.target.value;
                  setQuestions(temp);
                }}
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border`}
              >
                {['A', 'B', 'C', 'D'].map(letter => (
                  <option key={letter} value={letter}>Option {letter}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 1}
              className={`px-4 py-2 rounded-lg ${currentQuestion === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Previous
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={nextQuestion}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Next Question
              </button>
              
              <button
                onClick={saveQuestions}
                className={`px-4 py-2 rounded-lg bg-[#EF9273] hover:bg-[#C35029] text-white`}
              >
                Save Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, onPageChange, darkMode }) => {
  return (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
          darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Previous
      </button>
      
      <div className={`flex items-center px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Page {currentPage} of {totalPages}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${
          darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Apply;