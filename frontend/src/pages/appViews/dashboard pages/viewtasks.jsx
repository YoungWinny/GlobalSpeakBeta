// import React, { useState, useEffect } from "react";
// import { MdOutlineFileUpload, MdDownload, MdOutlineDescription } from "react-icons/md";
// import { AiOutlineClose, AiOutlineFile, AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
// import { FiUpload, FiDollarSign, FiUser } from "react-icons/fi";
// import Modal from "react-modal";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import useUser from "../../../hooks/useUser";
// import Swal from "sweetalert2";
// import MakePayment from "../dashboard pages/makepayment";

// Modal.setAppElement("#root");

// const ViewTasks = ({ darkMode }) => {
//   // State management
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [allTasks, setAllTasks] = useState([]);
//   const [files, setFiles] = useState(null);
//   const [sourceText, setSourceText] = useState("");
//   const [evaluationResult, setEvaluationResult] = useState(null);
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [activeTab, setActiveTab] = useState("upload");
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [selectedTaskForPayment, setSelectedTaskForPayment] = useState(null);
//   const user = useUser();

//   // File path normalization
//   const normalizeFilePath = (filePath) => {
//     if (!filePath) return '';
//     return filePath; // Just return the filename as stored
//   };

//   // Download file function - FIXED
//   const downloadFile = async (filename, fileType) => {
//     try {
//       // Create a proper download URL
//       const downloadUrl = `${axiosInstance.defaults.baseURL}/api/task/download/${fileType}/${filename}`;
      
//       // Create a temporary anchor element to trigger download
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.setAttribute('download', filename);
//       link.setAttribute('target', '_blank');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       // Show success message
//       Swal.fire({
//         title: "Download Started",
//         text: "Your file download has started",
//         icon: "success",
//         confirmButtonColor: "#EF9273",
//         timer: 2000
//       });
//     } catch (error) {
//       console.error('Download error:', error);
//       Swal.fire({
//         title: "Download Failed",
//         text: "Failed to download the file",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   // Modal controls
//   const openModal = (task) => {
//     setSelectedTask(task);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setFiles(null);
//     setSourceText("");
//     setEvaluationResult(null);
//     setActiveTab("upload");
//   };

//   const openPaymentModal = (task) => {
//     setSelectedTaskForPayment(task);
//     setPaymentModalOpen(true);
//   };

//   const closePaymentModal = () => {
//     setPaymentModalOpen(false);
//     setSelectedTaskForPayment(null);
//   };

//   // File handling
//   const handleFileChange = (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) {
//       setFiles(null);
//       return;
//     }

//     const file = selectedFiles[0];
//     const allowedTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/msword',
//       'text/plain'
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       Swal.fire({
//         title: "Invalid File",
//         html: `
//           <div class="text-left">
//             <p>The file <strong>${file.name}</strong> is not supported.</p>
//             <div class="mt-3 p-3 bg-red-50 rounded-lg">
//               <p class="font-medium">Supported formats:</p>
//               <ul class="list-disc pl-5 mt-1 space-y-1">
//                 <li>PDF documents</li>
//                 <li>Word documents (.docx)</li>
//                 <li>Plain text files</li>
//               </ul>
//             </div>
//           </div>
//         `,
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       Swal.fire({
//         title: "File Too Large",
//         text: "Maximum file size is 10MB",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       e.target.value = "";
//       return;
//     }

//     setFiles(selectedFiles);
//   };

//   // Task evaluation
//   const evaluateTranslation = async () => {
//     if (!files || !files[0]) {
//       Swal.fire({
//         title: "Missing File",
//         text: "Please select a translation file to upload",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       return;
//     }

//     if (!sourceText || sourceText.trim().length === 0) {
//       Swal.fire({
//         title: "Missing Source Text",
//         text: "Please enter the original text for comparison",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       return;
//     }

//     setIsEvaluating(true);
//     try {
//       const formData = new FormData();
//       formData.append("sourceText", sourceText);
//       formData.append("file", files[0]);

//       const response = await axiosInstance.post(
//         "/api/evaluate-upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           timeout: 40000
//         }
//       );

//       setEvaluationResult(response.data);
//       setActiveTab("evaluate");
      
//       Swal.fire({
//         title: "Evaluation Complete",
//         html: `
//           <div class="text-left space-y-4">
//             <div class="flex items-center justify-between">
//               <span class="font-medium">Quality Score:</span>
//               <span class="text-xl font-bold ${
//                 response.data.score >= 7 ? 'text-green-600' : 
//                 response.data.score >= 4 ? 'text-yellow-500' : 'text-red-500'
//               }">
//                 ${response.data.score}/10
//               </span>
//             </div>
//             <div class="w-full bg-gray-200 rounded-full h-2.5">
//               <div class="h-2.5 rounded-full ${
//                 response.data.score >= 7 ? 'bg-green-500' : 
//                 response.data.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
//               }" style="width: ${response.data.score * 10}%"></div>
//             </div>
//             <div class="space-y-2">
//               <p class="font-medium">Feedback:</p>
//               <div class="p-3 bg-gray-50 rounded-lg border text-sm">
//                 ${response.data.feedback || "No detailed feedback provided"}
//               </div>
//             </div>
//           </div>
//         `,
//         icon: "success",
//         confirmButtonColor: "#EF9273",
//       });
//     } catch (error) {
//       Swal.fire({
//         title: "Evaluation Failed",
//         text: error.response?.data?.error || error.message,
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     } finally {
//       setIsEvaluating(false);
//     }
//   };

//   const submitTask = async () => {
//     if (user?.role === 'jobseeker' && !evaluationResult) {
//       Swal.fire({
//         title: "Evaluation Required",
//         text: "Please complete the evaluation before submitting",
//         icon: "warning",
//         confirmButtonColor: "#EF9273",
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       Array.from(files).forEach(file => {
//         formData.append("files", file);
//       });
      
//       if (user?.role === 'jobseeker') {
//         formData.append("evaluationScore", evaluationResult.score);
//       }

//       const endpoint = user?.role === 'recruiter' 
//         ? `/api/task/initial-upload/${selectedTask?._id}`
//         : `/api/task/upload/${selectedTask?._id}`;

//       const response = await axiosInstance.patch(
//         endpoint,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       Swal.fire({
//         title: "Success",
//         text: user?.role === 'recruiter' 
//           ? "Task instructions uploaded successfully" 
//           : "Task submitted successfully with evaluation!",
//         icon: "success",
//         confirmButtonColor: "#EF9273",
//       });
      
//       closeModal();
//       fetchAllTasks();
//     } catch (error) {
//       Swal.fire({
//         title: "Submission Failed",
//         text: error.response?.data?.error || "Failed to submit task",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   // Payment handling
//   const handlePaymentSuccess = () => {
//     Swal.fire({
//       title: "Payment Successful",
//       text: "The payment has been processed successfully",
//       icon: "success",
//       confirmButtonColor: "#EF9273",
//     });
//     closePaymentModal();
//     fetchAllTasks();
//   };

//   // Data fetching
//   const fetchAllTasks = async () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//     try {
//       if (storedUser?.role === "recruiter") {
//         const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
//         const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
        
//         const allTasks = [];
//         for (const job of filteredJobs) {
//           try {
//             const response = await axiosInstance.get(`/api/task/job/${job._id}`);
//             const tasksWithFiles = response.data.map(task => ({
//               ...task,
//               initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//               submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//               jobseekerName: task.userId?.username || 'Unknown'
//             }));
//             allTasks.push(...tasksWithFiles);
//           } catch (error) {
//             console.error(`Error fetching tasks for job ${job._id}:`, error);
//           }
//         }
        
//         setAllTasks(allTasks);
//         setTasks(allTasks);
//       } else {
//         const response = await axiosInstance.get(`/api/task/user/${storedUser?._id}`);
//         const tasksWithFiles = response.data?.map(task => ({
//           ...task,
//           initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//           submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//           jobseekerName: storedUser.username
//         })) || [];
//         setAllTasks(tasksWithFiles);
//         setTasks(tasksWithFiles);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch tasks",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   const filterTasksByJob = async (jobId) => {
//     if (!jobId) {
//       setTasks(allTasks);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/api/task/job/${jobId}`);
//       const tasksWithFiles = response.data?.map(task => ({
//         ...task,
//         initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//         submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//         jobseekerName: task.userId?.username || 'Unknown'
//       })) || [];
//       setTasks(tasksWithFiles);
//     } catch (error) {
//       console.error("Error filtering tasks:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to filter tasks",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   const fetchJobs = async () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//     if (storedUser?.role !== "recruiter") return;

//     try {
//       const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
//       const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
//       setJobList(filteredJobs);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch jobs",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   useEffect(() => {
//     const initializeData = async () => {
//       await fetchJobs();
//       await fetchAllTasks();
//     };
//     initializeData();
//   }, []);

//   useEffect(() => {
//     if (searchId) {
//       filterTasksByJob(searchId);
//     } else {
//       setTasks(allTasks);
//     }
//   }, [searchId, allTasks]);

//   // UI Components
//   const FileCard = ({ filePath, title, emptyMessage, fileType = 'initial' }) => {
//     if (!filePath) {
//       return (
//         <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
//           <span className="text-sm text-gray-400">{emptyMessage}</span>
//         </div>
//       );
//     }

//     return (
//       <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//         <div className="flex items-center">
//           <AiOutlineFile className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
//           <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'} truncate max-w-xs`}>
//             {filePath}
//           </span>
//         </div>
//         <button
//           onClick={() => downloadFile(filePath, fileType)}
//           className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
//           title="Download"
//         >
//           <MdDownload className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
//         </button>
//       </div>
//     );
//   };

//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       'in progress': {
//         color: 'bg-yellow-100 text-yellow-800',
//         icon: <AiOutlineClockCircle className="mr-1" />
//       },
//       'completed': {
//         color: 'bg-green-100 text-green-800',
//         icon: <AiOutlineCheckCircle className="mr-1" />
//       },
//       'pending': {
//         color: 'bg-blue-100 text-blue-800',
//         icon: <AiOutlineClockCircle className="mr-1" />
//       }
//     };

//     const config = statusConfig[status] || statusConfig['pending'];

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
//         {config.icon}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   const PaymentStatus = ({ task }) => {
//     if (!task.paymentStatus) {
//       return <span className="text-gray-500">Pending</span>;
//     }
    
//     return task.paymentStatus === 'completed' ? (
//       <span className="flex items-center text-green-600">
//         <AiOutlineCheckCircle className="mr-1" /> Paid
//       </span>
//     ) : (
//       <span className="text-yellow-600">Processing</span>
//     );
//   };

//   const PaymentButton = ({ task }) => {
//     if (task.paymentStatus === 'completed') {
//       return (
//         <span className="flex items-center text-green-600">
//           <AiOutlineCheckCircle className="mr-1" /> Paid
//         </span>
//       );
//     }
    
//     return (
//       <button
//         onClick={() => openPaymentModal(task)}
//         className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
//       >
//         <FiDollarSign className="mr-1" /> Pay
//       </button>
//     );
//   };

//   const UploadButton = ({ task }) => {
//     if (user?.role === 'recruiter') {
//       return (
//         <button
//           onClick={() => openModal(task)}
//           className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
//         >
//           <FiUpload className="mr-1" /> 
//           {task.initialFiles?.length ? 'Update' : 'Upload'}
//         </button>
//       );
//     }

//     if (task.status === 'completed') {
//       return (
//         <span className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm">
//           <AiOutlineCheckCircle className="mr-1" /> Completed
//         </span>
//       );
//     }

//     return (
//       <button
//         onClick={() => openModal(task)}
//         disabled={!task.initialFiles?.length}
//         className={`flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors ${
//           !task.initialFiles?.length ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//       >
//         <FiUpload className="mr-1" /> Submit
//       </button>
//     );
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-6`}>
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//               {user?.role === 'recruiter' ? 'Manage Tasks' : 'My Tasks'}
//             </h1>
//             <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               {user?.role === 'recruiter' 
//                 ? 'View and manage all your tasks' 
//                 : 'Track your assigned tasks and submissions'}
//             </p>
//           </div>

//           {user?.role === "recruiter" && (
//             <div className="flex flex-col sm:flex-row gap-3">
//               <select
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className={`flex-grow p-2.5 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
//               >
//                 <option value="">All Jobs</option>
//                 {jobList?.map((job, index) => (
//                   <option key={index} value={job?._id}>
//                     {job?.title} ({job?.location})
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={() => filterTasksByJob(searchId)}
//                 disabled={!searchId}
//                 className={`px-4 py-2.5 rounded-lg ${!searchId ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'} text-white transition-colors`}
//               >
//                 Filter
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Tasks Grid */}
//       <div className="max-w-7xl mx-auto">
//         {tasks.length === 0 ? (
//           <div className={`p-8 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
//             <MdOutlineDescription className="mx-auto text-4xl text-gray-400 mb-3" />
//             <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               {searchId ? "No tasks found for this job" : "No tasks available"}
//             </h3>
//             <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//               {user?.role === 'recruiter' 
//                 ? 'Create a new job to assign tasks' 
//                 : 'You currently have no assigned tasks'}
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {tasks.map((task, index) => (
//               <div 
//                 key={index} 
//                 className={`p-5 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                   <div>
//                     <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//                       {task?.job?.title}
//                     </h3>
//                     <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
//                       <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Job ID: {task?.job?._id?.substring(0, 8)}...
//                       </p>
//                       {user?.role === 'recruiter' && task.jobseekerName && (
//                         <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
//                           <FiUser className="mr-1" /> {task.jobseekerName}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <StatusBadge status={task?.status} />
//                     {user?.role === 'recruiter' ? (
//                       <PaymentButton task={task} />
//                     ) : (
//                       <PaymentStatus task={task} />
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       Initial Task Files
//                     </h4>
//                     {task.initialFiles && task.initialFiles.length > 0 ? (
//                       <div className="space-y-2">
//                         {task.initialFiles.map((file, i) => (
//                           <FileCard 
//                             key={i} 
//                             filePath={file} 
//                             fileType="initial"
//                             title="Initial File" 
//                             emptyMessage="No files uploaded yet"
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <FileCard 
//                         filePath={null} 
//                         fileType="initial"
//                         title="Initial File" 
//                         emptyMessage="No files uploaded yet"
//                       />
//                     )}
//                   </div>

//                   <div>
//                     <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       {user?.role === 'recruiter' ? 'Submitted Files' : 'Your Submission'}
//                     </h4>
//                     {task.submittedFiles && task.submittedFiles.length > 0 ? (
//                       <div className="space-y-2">
//                         {task.submittedFiles.map((file, i) => (
//                           <FileCard 
//                             key={i} 
//                             filePath={file} 
//                             fileType="submitted"
//                             title="Submitted File" 
//                             emptyMessage="No files submitted yet"
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <FileCard 
//                         filePath={null} 
//                         fileType="submitted"
//                         title="Submitted File" 
//                         emptyMessage="No files submitted yet"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <UploadButton task={task} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Task Submission Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             width: '600px',
//             maxWidth: '90vw',
//             maxHeight: '90vh',
//             borderRadius: '12px',
//             padding: '0',
//             border: 'none',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             overflow: 'hidden',
//             backgroundColor: darkMode ? '#1F2937' : 'white'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//           }
//         }}
//         contentLabel="Task Submission"
//         shouldCloseOnOverlayClick={false}
//       >
//         <div className="relative">
//           <button
//             onClick={closeModal}
//             className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//             aria-label="Close modal"
//           >
//             <AiOutlineClose className="text-xl" />
//           </button>
          
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-6 text-center">
//               {user?.role === 'recruiter' ? 'Upload Task Instructions' : 'Submit Your Work'}
//             </h2>
            
//             <div className="space-y-6">
//               {user?.role !== 'recruiter' && (
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Original Source Text *
//                   </label>
//                   <textarea
//                     value={sourceText}
//                     onChange={(e) => setSourceText(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700"
//                     rows={5}
//                     placeholder="Paste the original text that was translated..."
//                     required
//                   />
//                 </div>
//               )}

//               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//                 <div className="flex flex-col items-center justify-center space-y-3">
//                   <MdOutlineFileUpload className="text-4xl text-gray-400" />
//                   <div>
//                     <p className="font-medium">
//                       {user?.role === 'recruiter' 
//                         ? 'Upload task instructions' 
//                         : 'Upload your completed work'}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Supported formats: PDF, DOCX, TXT (Max 10MB)
//                     </p>
//                   </div>
//                   <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
//                     <FiUpload className="mr-2" />
//                     Select File
//                     <input 
//                       type="file" 
//                       className="hidden"
//                       onChange={handleFileChange}
//                       accept=".pdf,.docx,.txt"
//                     />
//                   </label>
//                 </div>
//                 {files?.[0] && (
//                   <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <AiOutlineFile className="mr-2" />
//                         <span className="truncate max-w-xs">{files[0].name}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {(files[0].size / 1024 / 1024).toFixed(2)} MB
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={user?.role === 'recruiter' ? submitTask : evaluateTranslation}
//                   disabled={!files || (user?.role !== 'recruiter' && !sourceText) || isEvaluating}
//                   className={`px-4 py-2 rounded-lg text-white transition-colors ${
//                     isEvaluating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                   } ${(!files || (user?.role !== 'recruiter' && !sourceText)) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {isEvaluating ? (
//                     <span className="flex items-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : user?.role === 'recruiter' ? 'Upload Instructions' : 'Evaluate & Submit'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {/* Payment Modal */}
//       <Modal
//         isOpen={paymentModalOpen}
//         onRequestClose={closePaymentModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             width: '500px',
//             maxWidth: '90vw',
//             borderRadius: '12px',
//             padding: '0',
//             border: 'none',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             backgroundColor: darkMode ? '#1F2937' : 'white'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//           }
//         }}
//         contentLabel="Make Payment"
//       >
//         {selectedTaskForPayment && (
//           <MakePayment 
//             task={selectedTaskForPayment} 
//             onClose={closePaymentModal}
//             onSuccess={handlePaymentSuccess}
//             darkMode={darkMode}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ViewTasks;















// import React, { useState, useEffect } from "react";
// import { MdOutlineFileUpload, MdDownload, MdOutlineDescription } from "react-icons/md";
// import { AiOutlineClose, AiOutlineFile, AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
// import { FiUpload, FiDollarSign, FiUser } from "react-icons/fi";
// import Modal from "react-modal";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import useUser from "../../../hooks/useUser";
// import Swal from "sweetalert2";
// import MakePayment from "../dashboard pages/makepayment";

// Modal.setAppElement("#root");

// const ViewTasks = ({ darkMode }) => {
//   // State management
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [allTasks, setAllTasks] = useState([]);
//   const [files, setFiles] = useState(null);
//   const [paymentModalOpen, setPaymentModalOpen] = useState(false);
//   const [selectedTaskForPayment, setSelectedTaskForPayment] = useState(null);
//   const user = useUser();

//   // File path normalization
//   const normalizeFilePath = (filePath) => {
//     if (!filePath) return '';
//     return filePath; // Just return the filename as stored
//   };

//   // Download file function - FIXED
//   const downloadFile = async (filename, fileType) => {
//     try {
//       // Create a proper download URL
//       const downloadUrl = `${axiosInstance.defaults.baseURL}/api/task/download/${fileType}/${filename}`;
      
//       // Create a temporary anchor element to trigger download
//       const link = document.createElement('a');
//       link.href = downloadUrl;
//       link.setAttribute('download', filename);
//       link.setAttribute('target', '_blank');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       // Show success message
//       Swal.fire({
//         title: "Download Started",
//         text: "Your file download has started",
//         icon: "success",
//         confirmButtonColor: "#EF9273",
//         timer: 2000
//       });
//     } catch (error) {
//       console.error('Download error:', error);
//       Swal.fire({
//         title: "Download Failed",
//         text: "Failed to download the file",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   // Modal controls
//   const openModal = (task) => {
//     setSelectedTask(task);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setFiles(null);
//   };

//   const openPaymentModal = (task) => {
//     setSelectedTaskForPayment(task);
//     setPaymentModalOpen(true);
//   };

//   const closePaymentModal = () => {
//     setPaymentModalOpen(false);
//     setSelectedTaskForPayment(null);
//   };

//   // File handling
//   const handleFileChange = (e) => {
//     const selectedFiles = e.target.files;
//     if (!selectedFiles || selectedFiles.length === 0) {
//       setFiles(null);
//       return;
//     }

//     const file = selectedFiles[0];
//     const allowedTypes = [
//       'application/pdf',
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//       'application/msword',
//       'text/plain'
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       Swal.fire({
//         title: "Invalid File",
//         html: `
//           <div class="text-left">
//             <p>The file <strong>${file.name}</strong> is not supported.</p>
//             <div class="mt-3 p-3 bg-red-50 rounded-lg">
//               <p class="font-medium">Supported formats:</p>
//               <ul class="list-disc pl-5 mt-1 space-y-1">
//                 <li>PDF documents</li>
//                 <li>Word documents (.docx)</li>
//                 <li>Plain text files</li>
//               </ul>
//             </div>
//           </div>
//         `,
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       Swal.fire({
//         title: "File Too Large",
//         text: "Maximum file size is 10MB",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//       e.target.value = "";
//       return;
//     }

//     setFiles(selectedFiles);
//   };

//   const submitTask = async () => {
//     try {
//       const formData = new FormData();
//       Array.from(files).forEach(file => {
//         formData.append("files", file);
//       });

//       const endpoint = user?.role === 'recruiter' 
//         ? `/api/task/initial-upload/${selectedTask?._id}`
//         : `/api/task/upload/${selectedTask?._id}`;

//       const response = await axiosInstance.patch(
//         endpoint,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       Swal.fire({
//         title: "Success",
//         text: user?.role === 'recruiter' 
//           ? "Task instructions uploaded successfully" 
//           : "Task submitted successfully!",
//         icon: "success",
//         confirmButtonColor: "#EF9273",
//       });
      
//       closeModal();
//       fetchAllTasks();
//     } catch (error) {
//       Swal.fire({
//         title: "Submission Failed",
//         text: error.response?.data?.error || "Failed to submit task",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   // Payment handling
//   const handlePaymentSuccess = () => {
//     Swal.fire({
//       title: "Payment Successful",
//       text: "The payment has been processed successfully",
//       icon: "success",
//       confirmButtonColor: "#EF9273",
//     });
//     closePaymentModal();
//     fetchAllTasks();
//   };

//   // Data fetching
//   const fetchAllTasks = async () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//     try {
//       if (storedUser?.role === "recruiter") {
//         const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
//         const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
        
//         const allTasks = [];
//         for (const job of filteredJobs) {
//           try {
//             const response = await axiosInstance.get(`/api/task/job/${job._id}`);
//             const tasksWithFiles = response.data.map(task => ({
//               ...task,
//               initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//               submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//               jobseekerName: task.userId?.username || 'Unknown'
//             }));
//             allTasks.push(...tasksWithFiles);
//           } catch (error) {
//             console.error(`Error fetching tasks for job ${job._id}:`, error);
//           }
//         }
        
//         setAllTasks(allTasks);
//         setTasks(allTasks);
//       } else {
//         const response = await axiosInstance.get(`/api/task/user/${storedUser?._id}`);
//         const tasksWithFiles = response.data?.map(task => ({
//           ...task,
//           initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//           submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//           jobseekerName: storedUser.username
//         })) || [];
//         setAllTasks(tasksWithFiles);
//         setTasks(tasksWithFiles);
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch tasks",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   const filterTasksByJob = async (jobId) => {
//     if (!jobId) {
//       setTasks(allTasks);
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(`/api/task/job/${jobId}`);
//       const tasksWithFiles = response.data?.map(task => ({
//         ...task,
//         initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
//         submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
//         jobseekerName: task.userId?.username || 'Unknown'
//       })) || [];
//       setTasks(tasksWithFiles);
//     } catch (error) {
//       console.error("Error filtering tasks:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to filter tasks",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   const fetchJobs = async () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//     if (storedUser?.role !== "recruiter") return;

//     try {
//       const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
//       const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
//       setJobList(filteredJobs);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch jobs",
//         icon: "error",
//         confirmButtonColor: "#EF9273",
//       });
//     }
//   };

//   useEffect(() => {
//     const initializeData = async () => {
//       await fetchJobs();
//       await fetchAllTasks();
//     };
//     initializeData();
//   }, []);

//   useEffect(() => {
//     if (searchId) {
//       filterTasksByJob(searchId);
//     } else {
//       setTasks(allTasks);
//     }
//   }, [searchId, allTasks]);

//   // UI Components
//   const FileCard = ({ filePath, title, emptyMessage, fileType = 'initial' }) => {
//     if (!filePath) {
//       return (
//         <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
//           <span className="text-sm text-gray-400">{emptyMessage}</span>
//         </div>
//       );
//     }

//     return (
//       <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
//         <div className="flex items-center">
//           <AiOutlineFile className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
//           <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'} truncate max-w-xs`}>
//             {filePath}
//           </span>
//         </div>
//         <button
//           onClick={() => downloadFile(filePath, fileType)}
//           className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
//           title="Download"
//         >
//           <MdDownload className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
//         </button>
//       </div>
//     );
//   };

//   const StatusBadge = ({ status }) => {
//     const statusConfig = {
//       'in progress': {
//         color: 'bg-yellow-100 text-yellow-800',
//         icon: <AiOutlineClockCircle className="mr-1" />
//       },
//       'completed': {
//         color: 'bg-green-100 text-green-800',
//         icon: <AiOutlineCheckCircle className="mr-1" />
//       },
//       'pending': {
//         color: 'bg-blue-100 text-blue-800',
//         icon: <AiOutlineClockCircle className="mr-1" />
//       }
//     };

//     const config = statusConfig[status] || statusConfig['pending'];

//     return (
//       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
//         {config.icon}
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </span>
//     );
//   };

//   const PaymentStatus = ({ task }) => {
//     if (!task.paymentStatus) {
//       return <span className="text-gray-500">Pending</span>;
//     }
    
//     return task.paymentStatus === 'completed' ? (
//       <span className="flex items-center text-green-600">
//         <AiOutlineCheckCircle className="mr-1" /> Paid
//       </span>
//     ) : (
//       <span className="text-yellow-600">Processing</span>
//     );
//   };

//   const PaymentButton = ({ task }) => {
//     if (task.paymentStatus === 'completed') {
//       return (
//         <span className="flex items-center text-green-600">
//           <AiOutlineCheckCircle className="mr-1" /> Paid
//         </span>
//       );
//     }
    
//     return (
//       <button
//         onClick={() => openPaymentModal(task)}
//         className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
//       >
//         <FiDollarSign className="mr-1" /> Pay
//       </button>
//     );
//   };

//   const UploadButton = ({ task }) => {
//     if (user?.role === 'recruiter') {
//       return (
//         <button
//           onClick={() => openModal(task)}
//           className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
//         >
//           <FiUpload className="mr-1" /> 
//           {task.initialFiles?.length ? 'Update' : 'Upload'}
//         </button>
//       );
//     }

//     if (task.status === 'completed') {
//       return (
//         <span className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm">
//           <AiOutlineCheckCircle className="mr-1" /> Completed
//         </span>
//       );
//     }

//     return (
//       <button
//         onClick={() => openModal(task)}
//         disabled={!task.initialFiles?.length}
//         className={`flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors ${
//           !task.initialFiles?.length ? 'opacity-50 cursor-not-allowed' : ''
//         }`}
//       >
//         <FiUpload className="mr-1" /> Submit
//       </button>
//     );
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-6`}>
//       {/* Header Section */}
//       <div className="max-w-7xl mx-auto mb-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//               {user?.role === 'recruiter' ? 'Manage Tasks' : 'My Tasks'}
//             </h1>
//             <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               {user?.role === 'recruiter' 
//                 ? 'View and manage all your tasks' 
//                 : 'Track your assigned tasks and submissions'}
//             </p>
//           </div>

//           {user?.role === "recruiter" && (
//             <div className="flex flex-col sm:flex-row gap-3">
//               <select
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className={`flex-grow p-2.5 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
//               >
//                 <option value="">All Jobs</option>
//                 {jobList?.map((job, index) => (
//                   <option key={index} value={job?._id}>
//                     {job?.title} ({job?.location})
//                   </option>
//                 ))}
//               </select>
//               <button
//                 onClick={() => filterTasksByJob(searchId)}
//                 disabled={!searchId}
//                 className={`px-4 py-2.5 rounded-lg ${!searchId ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'} text-white transition-colors`}
//               >
//                 Filter
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Tasks Grid */}
//       <div className="max-w-7xl mx-auto">
//         {tasks.length === 0 ? (
//           <div className={`p-8 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
//             <MdOutlineDescription className="mx-auto text-4xl text-gray-400 mb-3" />
//             <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               {searchId ? "No tasks found for this job" : "No tasks available"}
//             </h3>
//             <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
//               {user?.role === 'recruiter' 
//                 ? 'Create a new job to assign tasks' 
//                 : 'You currently have no assigned tasks'}
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {tasks.map((task, index) => (
//               <div 
//                 key={index} 
//                 className={`p-5 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//                   <div>
//                     <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//                       {task?.job?.title}
//                     </h3>
//                     <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
//                       <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Job ID: {task?.job?._id?.substring(0, 8)}...
//                       </p>
//                       {user?.role === 'recruiter' && task.jobseekerName && (
//                         <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
//                           <FiUser className="mr-1" /> {task.jobseekerName}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <StatusBadge status={task?.status} />
//                     {user?.role === 'recruiter' ? (
//                       <PaymentButton task={task} />
//                     ) : (
//                       <PaymentStatus task={task} />
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       Initial Task Files
//                     </h4>
//                     {task.initialFiles && task.initialFiles.length > 0 ? (
//                       <div className="space-y-2">
//                         {task.initialFiles.map((file, i) => (
//                           <FileCard 
//                             key={i} 
//                             filePath={file} 
//                             fileType="initial"
//                             title="Initial File" 
//                             emptyMessage="No files uploaded yet"
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <FileCard 
//                         filePath={null} 
//                         fileType="initial"
//                         title="Initial File" 
//                         emptyMessage="No files uploaded yet"
//                       />
//                     )}
//                   </div>

//                   <div>
//                     <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                       {user?.role === 'recruiter' ? 'Submitted Files' : 'Your Submission'}
//                     </h4>
//                     {task.submittedFiles && task.submittedFiles.length > 0 ? (
//                       <div className="space-y-2">
//                         {task.submittedFiles.map((file, i) => (
//                           <FileCard 
//                             key={i} 
//                             filePath={file} 
//                             fileType="submitted"
//                             title="Submitted File" 
//                             emptyMessage="No files submitted yet"
//                           />
//                         ))}
//                       </div>
//                     ) : (
//                       <FileCard 
//                         filePath={null} 
//                         fileType="submitted"
//                         title="Submitted File" 
//                         emptyMessage="No files submitted yet"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <UploadButton task={task} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Task Submission Modal */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             width: '600px',
//             maxWidth: '90vw',
//             maxHeight: '90vh',
//             borderRadius: '12px',
//             padding: '0',
//             border: 'none',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             overflow: 'hidden',
//             backgroundColor: darkMode ? '#1F2937' : 'white'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//           }
//         }}
//         contentLabel="Task Submission"
//         shouldCloseOnOverlayClick={false}
//       >
//         <div className="relative">
//           <button
//             onClick={closeModal}
//             className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//             aria-label="Close modal"
//           >
//             <AiOutlineClose className="text-xl" />
//           </button>
          
//           <div className="p-6">
//             <h2 className="text-xl font-bold mb-6 text-center">
//               {user?.role === 'recruiter' ? 'Upload Task Instructions' : 'Submit Your Work'}
//             </h2>
            
//             <div className="space-y-6">
//               <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
//                 <div className="flex flex-col items-center justify-center space-y-3">
//                   <MdOutlineFileUpload className="text-4xl text-gray-400" />
//                   <div>
//                     <p className="font-medium">
//                       {user?.role === 'recruiter' 
//                         ? 'Upload task instructions' 
//                         : 'Upload your completed work'}
//                     </p>
//                     <p className="text-sm text-gray-500 mt-1">
//                       Supported formats: PDF, DOCX, TXT (Max 10MB)
//                     </p>
//                   </div>
//                   <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
//                     <FiUpload className="mr-2" />
//                     Select File
//                     <input 
//                       type="file" 
//                       className="hidden"
//                       onChange={handleFileChange}
//                       accept=".pdf,.docx,.txt"
//                     />
//                   </label>
//                 </div>
//                 {files?.[0] && (
//                   <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <AiOutlineFile className="mr-2" />
//                         <span className="truncate max-w-xs">{files[0].name}</span>
//                       </div>
//                       <span className="text-sm text-gray-500">
//                         {(files[0].size / 1024 / 1024).toFixed(2)} MB
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end space-x-3 pt-4">
//                 <button
//                   onClick={closeModal}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={submitTask}
//                   disabled={!files}
//                   className={`px-4 py-2 rounded-lg text-white transition-colors ${
//                     'bg-blue-600 hover:bg-blue-700'
//                   } ${!files ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   {user?.role === 'recruiter' ? 'Upload Instructions' : 'Submit Work'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>

//       {/* Payment Modal */}
//       <Modal
//         isOpen={paymentModalOpen}
//         onRequestClose={closePaymentModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             width: '500px',
//             maxWidth: '90vw',
//             borderRadius: '12px',
//             padding: '0',
//             border: 'none',
//             boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             backgroundColor: darkMode ? '#1F2937' : 'white'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//           }
//         }}
//         contentLabel="Make Payment"
//       >
//         {selectedTaskForPayment && (
//           <MakePayment 
//             task={selectedTaskForPayment} 
//             onClose={closePaymentModal}
//             onSuccess={handlePaymentSuccess}
//             darkMode={darkMode}
//           />
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ViewTasks;






import React, { useState, useEffect } from "react";
import { MdOutlineFileUpload, MdDownload, MdOutlineDescription } from "react-icons/md";
import { AiOutlineClose, AiOutlineFile, AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { FiUpload, FiDollarSign, FiUser } from "react-icons/fi";
import Modal from "react-modal";
import { axiosInstance } from "../../../utils/axiosInstance";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import MakePayment from "../dashboard pages/makepayment";

Modal.setAppElement("#root");

const ViewTasks = ({ darkMode }) => {
  // State management
  const [selectedTask, setSelectedTask] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [files, setFiles] = useState([]); // Changed to array for multiple files
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedTaskForPayment, setSelectedTaskForPayment] = useState(null);
  const user = useUser();

  // File path normalization
  const normalizeFilePath = (filePath) => {
    if (!filePath) return '';
    return filePath;
  };

  // Download file function
  const downloadFile = async (filename, fileType) => {
    try {
      const downloadUrl = `${axiosInstance.defaults.baseURL}/api/task/download/${fileType}/${filename}`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      Swal.fire({
        title: "Download Started",
        text: "Your file download has started",
        icon: "success",
        confirmButtonColor: "#EF9273",
        timer: 2000
      });
    } catch (error) {
      console.error('Download error:', error);
      Swal.fire({
        title: "Download Failed",
        text: "Failed to download the file",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
    }
  };

  // Modal controls
  const openModal = (task) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFiles([]);
  };

  const openPaymentModal = (task) => {
    setSelectedTaskForPayment(task);
    setPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setPaymentModalOpen(false);
    setSelectedTaskForPayment(null);
  };

  // File handling - UPDATED FOR MULTIPLE FILES
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    // Validate each file
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    const invalidFiles = selectedFiles.filter(file => !allowedTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      Swal.fire({
        title: "Invalid Files",
        html: `
          <div class="text-left">
            <p>Some files are not supported:</p>
            <div class="mt-3 p-3 bg-red-50 rounded-lg">
              <p class="font-medium">Supported formats:</p>
              <ul class="list-disc pl-5 mt-1 space-y-1">
                <li>PDF documents</li>
                <li>Word documents (.docx)</li>
                <li>Plain text files</li>
              </ul>
            </div>
          </div>
        `,
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
      e.target.value = "";
      return;
    }

    const oversizedFiles = selectedFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      Swal.fire({
        title: "Files Too Large",
        text: "Maximum file size is 10MB per file",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
      e.target.value = "";
      return;
    }

    setFiles(selectedFiles);
  };

  // Remove individual file
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const submitTask = async () => {
    try {
      // For jobseekers: Check if they're submitting the correct number of files
      if (user?.role === 'jobseeker' && selectedTask?.initialFiles) {
        const expectedFileCount = selectedTask.initialFiles.length;
        const currentSubmittedCount = selectedTask.submittedFiles?.length || 0;
        const newFilesCount = files.length;
        
        // Check if total submissions would exceed expected count
        if (currentSubmittedCount + newFilesCount > expectedFileCount) {
          Swal.fire({
            title: "Too Many Files",
            text: `You can only submit ${expectedFileCount - currentSubmittedCount} more file(s) for this task`,
            icon: "warning",
            confirmButtonColor: "#EF9273",
          });
          return;
        }
      }

      const formData = new FormData();
      files.forEach(file => {
        formData.append("files", file);
      });

      // For jobseekers: Don't mark as completed until all files are submitted
      if (user?.role === 'jobseeker') {
        formData.append("status", "in progress"); // Keep as in progress
      }

      const endpoint = user?.role === 'recruiter' 
        ? `/api/task/initial-upload/${selectedTask?._id}`
        : `/api/task/upload/${selectedTask?._id}`;

      const response = await axiosInstance.patch(
        endpoint,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        title: "Success",
        text: user?.role === 'recruiter' 
          ? "Task instructions uploaded successfully" 
          : `File${files.length > 1 ? 's' : ''} submitted successfully!`,
        icon: "success",
        confirmButtonColor: "#EF9273",
      });
      
      closeModal();
      fetchAllTasks();
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.response?.data?.error || "Failed to submit task",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
    }
  };

  // Payment handling
  const handlePaymentSuccess = () => {
    Swal.fire({
      title: "Payment Successful",
      text: "The payment has been processed successfully",
      icon: "success",
      confirmButtonColor: "#EF9273",
    });
    closePaymentModal();
    fetchAllTasks();
  };

  // Data fetching
  const fetchAllTasks = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    try {
      if (storedUser?.role === "recruiter") {
        const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
        const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
        
        const allTasks = [];
        for (const job of filteredJobs) {
          try {
            const response = await axiosInstance.get(`/api/task/job/${job._id}`);
            const tasksWithFiles = response.data.map(task => ({
              ...task,
              initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
              submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
              jobseekerName: task.userId?.username || 'Unknown'
            }));
            allTasks.push(...tasksWithFiles);
          } catch (error) {
            console.error(`Error fetching tasks for job ${job._id}:`, error);
          }
        }
        
        setAllTasks(allTasks);
        setTasks(allTasks);
      } else {
        const response = await axiosInstance.get(`/api/task/user/${storedUser?._id}`);
        const tasksWithFiles = response.data?.map(task => ({
          ...task,
          initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
          submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
          jobseekerName: storedUser.username
        })) || [];
        setAllTasks(tasksWithFiles);
        setTasks(tasksWithFiles);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch tasks",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
    }
  };

  const filterTasksByJob = async (jobId) => {
    if (!jobId) {
      setTasks(allTasks);
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/task/job/${jobId}`);
      const tasksWithFiles = response.data?.map(task => ({
        ...task,
        initialFiles: task.initialFiles?.map(normalizeFilePath) || [],
        submittedFiles: task.submittedFiles?.map(normalizeFilePath) || [],
        jobseekerName: task.userId?.username || 'Unknown'
      })) || [];
      setTasks(tasksWithFiles);
    } catch (error) {
      console.error("Error filtering tasks:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to filter tasks",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
    }
  };

  const fetchJobs = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (storedUser?.role !== "recruiter") return;

    try {
      const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
      const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
      setJobList(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch jobs",
        icon: "error",
        confirmButtonColor: "#EF9273",
      });
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await fetchJobs();
      await fetchAllTasks();
    };
    initializeData();
  }, []);

  useEffect(() => {
    if (searchId) {
      filterTasksByJob(searchId);
    } else {
      setTasks(allTasks);
    }
  }, [searchId, allTasks]);

  // UI Components
  const FileCard = ({ filePath, title, emptyMessage, fileType = 'initial' }) => {
    if (!filePath) {
      return (
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
          <span className="text-sm text-gray-400">{emptyMessage}</span>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className="flex items-center">
          <AiOutlineFile className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
          <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'} truncate max-w-xs`}>
            {filePath}
          </span>
        </div>
        <button
          onClick={() => downloadFile(filePath, fileType)}
          className={`p-1 rounded-full ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'} transition-colors`}
          title="Download"
        >
          <MdDownload className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
        </button>
      </div>
    );
  };

  const StatusBadge = ({ status, task }) => {
    const statusConfig = {
      'in progress': {
        color: 'bg-yellow-100 text-yellow-800',
        icon: <AiOutlineClockCircle className="mr-1" />
      },
      'completed': {
        color: 'bg-green-100 text-green-800',
        icon: <AiOutlineCheckCircle className="mr-1" />
      },
      'pending': {
        color: 'bg-blue-100 text-blue-800',
        icon: <AiOutlineClockCircle className="mr-1" />
      }
    };

    // Determine status based on file counts for jobseekers
    let displayStatus = status;
    if (user?.role === 'jobseeker' && task?.initialFiles && task?.submittedFiles) {
      if (task.submittedFiles.length >= task.initialFiles.length) {
        displayStatus = 'completed';
      } else if (task.submittedFiles.length > 0) {
        displayStatus = 'in progress';
      }
    }

    const config = statusConfig[displayStatus] || statusConfig['pending'];

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
        {user?.role === 'jobseeker' && task?.initialFiles && task?.submittedFiles && (
          <span className="ml-1 text-xs">
            ({task.submittedFiles.length}/{task.initialFiles.length})
          </span>
        )}
      </span>
    );
  };

  const PaymentStatus = ({ task }) => {
    if (!task.paymentStatus) {
      return <span className="text-gray-500">Pending</span>;
    }
    
    return task.paymentStatus === 'completed' ? (
      <span className="flex items-center text-green-600">
        <AiOutlineCheckCircle className="mr-1" /> Paid
      </span>
    ) : (
      <span className="text-yellow-600">Processing</span>
    );
  };

  const PaymentButton = ({ task }) => {
    if (task.paymentStatus === 'completed') {
      return (
        <span className="flex items-center text-green-600">
          <AiOutlineCheckCircle className="mr-1" /> Paid
        </span>
      );
    }
    
    return (
      <button
        onClick={() => openPaymentModal(task)}
        className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
      >
        <FiDollarSign className="mr-1" /> Pay
      </button>
    );
  };

  const UploadButton = ({ task }) => {
    if (user?.role === 'recruiter') {
      return (
        <button
          onClick={() => openModal(task)}
          className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
        >
          <FiUpload className="mr-1" /> 
          {task.initialFiles?.length ? 'Add More Files' : 'Upload Files'}
        </button>
      );
    }

    // For jobseekers: Check if all files are submitted
    const isCompleted = task.submittedFiles?.length >= task.initialFiles?.length;
    
    if (isCompleted) {
      return (
        <span className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-sm">
          <AiOutlineCheckCircle className="mr-1" /> Completed
        </span>
      );
    }

    return (
      <button
        onClick={() => openModal(task)}
        disabled={!task.initialFiles?.length}
        className={`flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors ${
          !task.initialFiles?.length ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <FiUpload className="mr-1" /> 
        Submit {task.submittedFiles?.length > 0 ? 'More' : 'Work'}
        {task.initialFiles && (
          <span className="ml-1 text-xs">
            ({task.submittedFiles?.length || 0}/{task.initialFiles.length})
          </span>
        )}
      </button>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-4 md:p-6`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {user?.role === 'recruiter' ? 'Manage Tasks' : 'My Tasks'}
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user?.role === 'recruiter' 
                ? 'View and manage all your tasks' 
                : 'Track your assigned tasks and submissions'}
            </p>
          </div>

          {user?.role === "recruiter" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className={`flex-grow p-2.5 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="">All Jobs</option>
                {jobList?.map((job, index) => (
                  <option key={index} value={job?._id}>
                    {job?.title} ({job?.location})
                  </option>
                ))}
              </select>
              <button
                onClick={() => filterTasksByJob(searchId)}
                disabled={!searchId}
                className={`px-4 py-2.5 rounded-lg ${!searchId ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'} text-white transition-colors`}
              >
                Filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="max-w-7xl mx-auto">
        {tasks.length === 0 ? (
          <div className={`p-8 text-center rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <MdOutlineDescription className="mx-auto text-4xl text-gray-400 mb-3" />
            <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {searchId ? "No tasks found for this job" : "No tasks available"}
            </h3>
            <p className={`mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              {user?.role === 'recruiter' 
                ? 'Create a new job to assign tasks' 
                : 'You currently have no assigned tasks'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {task?.job?.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Job ID: {task?.job?._id?.substring(0, 8)}...
                      </p>
                      {user?.role === 'recruiter' && task.jobseekerName && (
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                          <FiUser className="mr-1" /> {task.jobseekerName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={task?.status} task={task} />
                    {user?.role === 'recruiter' ? (
                      <PaymentButton task={task} />
                    ) : (
                      <PaymentStatus task={task} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Initial Task Files {task.initialFiles?.length > 0 && `(${task.initialFiles.length})`}
                    </h4>
                    {task.initialFiles && task.initialFiles.length > 0 ? (
                      <div className="space-y-2">
                        {task.initialFiles.map((file, i) => (
                          <FileCard 
                            key={i} 
                            filePath={file} 
                            fileType="initial"
                            title="Initial File" 
                            emptyMessage="No files uploaded yet"
                          />
                        ))}
                      </div>
                    ) : (
                      <FileCard 
                        filePath={null} 
                        fileType="initial"
                        title="Initial File" 
                        emptyMessage="No files uploaded yet"
                      />
                    )}
                  </div>

                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {user?.role === 'recruiter' ? 'Submitted Files' : 'Your Submission'} 
                      {task.submittedFiles?.length > 0 && ` (${task.submittedFiles.length}/${task.initialFiles?.length || 0})`}
                    </h4>
                    {task.submittedFiles && task.submittedFiles.length > 0 ? (
                      <div className="space-y-2">
                        {task.submittedFiles.map((file, i) => (
                          <FileCard 
                            key={i} 
                            filePath={file} 
                            fileType="submitted"
                            title="Submitted File" 
                            emptyMessage="No files submitted yet"
                          />
                        ))}
                      </div>
                    ) : (
                      <FileCard 
                        filePath={null} 
                        fileType="submitted"
                        title="Submitted File" 
                        emptyMessage="No files submitted yet"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <UploadButton task={task} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Task Submission Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: '12px',
            padding: '0',
            border: 'none',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            backgroundColor: darkMode ? '#1F2937' : 'white'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }
        }}
        contentLabel="Task Submission"
        shouldCloseOnOverlayClick={false}
      >
        <div className="relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <AiOutlineClose className="text-xl" />
          </button>
          
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6 text-center">
              {user?.role === 'recruiter' ? 'Upload Task Instructions' : 'Submit Your Work'}
            </h2>
            
            <div className="space-y-6">
              {/* File submission info for jobseekers */}
              {user?.role !== 'recruiter' && selectedTask?.initialFiles && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'} border ${darkMode ? 'border-gray-600' : 'border-blue-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-blue-800'}`}>
                    <strong>Task Requirements:</strong> Please submit {selectedTask.initialFiles.length} file(s) total. 
                    You have submitted {selectedTask.submittedFiles?.length || 0} of {selectedTask.initialFiles.length} files.
                  </p>
                  {selectedTask.submittedFiles?.length > 0 && (
                    <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-blue-600'}`}>
                      You can submit {selectedTask.initialFiles.length - (selectedTask.submittedFiles?.length || 0)} more file(s).
                    </p>
                  )}
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <MdOutlineFileUpload className="text-4xl text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {user?.role === 'recruiter' 
                        ? 'Upload task instructions' 
                        : 'Upload your completed work'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: PDF, DOCX, TXT (Max 10MB per file)
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {user?.role === 'recruiter' ? 'Select multiple files' : `Select 1-${selectedTask?.initialFiles?.length || 1} file(s)`}
                    </p>
                  </div>
                  <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <FiUpload className="mr-2" />
                    Select File(s)
                    <input 
                      type="file" 
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.docx,.txt"
                      multiple={user?.role === 'recruiter'} // Multiple only for recruiters
                    />
                  </label>
                </div>
                
                {/* Selected files list */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Selected Files ({files.length}):
                    </p>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                        <div className="flex items-center">
                          <AiOutlineFile className="mr-2 text-gray-500" />
                          <span className="text-sm truncate max-w-xs">{file.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitTask}
                  disabled={files.length === 0}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
                    'bg-blue-600 hover:bg-blue-700'
                  } ${files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {user?.role === 'recruiter' ? 'Upload Files' : `Submit ${files.length} File${files.length !== 1 ? 's' : ''}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onRequestClose={closePaymentModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            maxWidth: '90vw',
            borderRadius: '12px',
            padding: '0',
            border: 'none',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? '#1F2937' : 'white'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }
        }}
        contentLabel="Make Payment"
      >
        {selectedTaskForPayment && (
          <MakePayment 
            task={selectedTaskForPayment} 
            onClose={closePaymentModal}
            onSuccess={handlePaymentSuccess}
            darkMode={darkMode}
          />
        )}
      </Modal>
    </div>
  );
};

export default ViewTasks;