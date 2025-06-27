// import React, { useState, useEffect } from "react";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
// import ReactDOM from "react-dom";
// import Modal from "react-modal";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import useUser from "../../../hooks/useUser";
// import Swal from "sweetalert2";

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "auto",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

// Modal.setAppElement("#root");


// // Main ViewTasks component
// const ViewTasks = () => {
//   let subtitle;
//   const [selectedTask,setSelectedTask] = useState({})
//   const [jobList,setJobList] = useState([])
//   const [searchId, setSearchId] = useState(null);
//   const [modalIsOpen, setIsOpen] = React.useState(false);
//   const [tasks, setTasks] = useState([])
//   const user = useUser();

//   function openModal() {
//     setIsOpen(true);
//   }

//   function afterOpenModal() {
//     // references are now sync'd and can be accessed.
//     subtitle.style.color = "#f00";
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const [files, setFiles] = useState(null)

//   const submitTask = async ()=> {
//     const formData = new FormData();
//     console.log('files: ', files)
//     for(const file of files){
//       formData.append('files', file);
//     }
//     try{
//       const response = await axiosInstance.patch(`api/task/upload/${selectedTask?._id}`,formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         }
//       })
//       if(response.data){
//         Swal.fire({
//           title: "Task",
//           text: `Task Submitted successfully !!!`,
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           return;
//         });
//       }
//     }catch(err){
//       Swal.fire({
//         title: "Task",
//         text: `An error when submitting task try again !!!`,
//         icon: "error",
//         confirmButtonText: "OK",
//       }).then(() => {
//         return;
//       });
//     }finally{
//       fetchTasks();
//     }
//   }

//   const fetchTasks=async()=>{
//     let storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       storedUser = JSON.parse(storedUser);
//     }
//     if (storedUser?.role === 'recruiter' && !searchId) return;
//     const endpoint = storedUser?.role === 'recruiter' ? `api/task/job/${searchId}` : `api/task/user/${storedUser?._id}`
//     try{
//       const response = await axiosInstance.get(endpoint)
//       console.log('response.data: ', response.data)
//       if(response.data){
//         setTasks([...response.data])
//       }
//     }catch(err){
//       Swal.fire({
//         title: "Task",
//         text: `Failed to fetch tasks try again`,
//         icon: "error",
//         confirmButtonText: "OK",
//       }).then(() => {
//         return;
//       });
//     }
//   }

//   const fetchJobs = async () => {
//     let storedUser = sessionStorage.getItem("user");
//     if (storedUser) {
//       storedUser = JSON.parse(storedUser);
//     }

//     if (storedUser?.role === "jobseeker") return;

//     try {
//       const data = JSON.parse(sessionStorage.getItem("jobList"));

//       const filteredJobs = data?.filter(
//         (job) => job?.userId === storedUser?._id
//       );
//       setJobList(
//         storedUser?.role === "recruiter" ? [...filteredJobs] : [...data]
//       ); // Set jobs from backend response
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     }
//   };

//   useEffect(()=>{
//     fetchTasks();
//   },[searchId])

//   useEffect(()=>{
//     fetchJobs();
//   },[])

//   return (
//     <div className={`w-full h-full flex   ${user?.role === 'recruiter' ? 'flex-col justify-start items-center': 'justify-center items-start'}`}>
//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Tasks"
//       >
//         <div className="w-[600px] h-[650px] bg-white rounded-md ">
//           <button
//             onClick={closeModal}
//             className="bg-red-500 text-white w-6 h-6 mb-2 flex justify-center items-center text-lg rounded-full shadow-md flex items-center float-right"
//           >
//             x
//           </button>
//           <div className="bg-[#BEBEBE]  h-full w-full flex items-center justify-center flex flex-col">
//             <div className="uploadSection bg-[whitesmoke] h-[95%] w-[80%] shadow-2xl border rounded-2xl ">
//               <div className="flex justify-between my-8">
//                   <button onClick={closeModal} className="border-2 border-[#BEBEBE] border-solid ml-4 rounded-full">
//                     cancel
//                   </button>
//                   <button onClick={()=> submitTask()} className="rounded-full mr-4 bg-black text-white">
//                     continue
//                   </button>
//               </div>
//               <h1 className="text-3xl text-center">
//                 Finished Task and wish to submit ?
//               </h1>
//               <p className="text-center">
//                 Add your documents here and upload them
//               </p>
//               <div className="w-full h-3/4 flex flex-col items-center justify-center">
//                 <div className=" border-4 border-dashed border-[#BEBEBE] w-[90%] h-[75%] flex flex-col items-center justify-center mt-20">
//                   <MdOutlineFileUpload size={32} />
//                   <p>Upload complete work ...</p>&nbsp;
//                   <input type="file" multiple  onChange={e=> setFiles(e.target.files)} className="border-2 border-[#BEBEBE] border-solid rounded-full" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>


//       {user?.role === "recruiter" && (
//         <div className="w-11/12 h-20 my-4 bg-white shadow-md rounded-md flex justify-around items-center">
//           <select
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className="w-9/12 h-2/4 ml-4 px-2 border border-gray-200 rounded mt-2"
//           >
//             {jobList?.map((job, index) => (
//               <option key={index} value={job?._id}>
//                 {job?.title}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={() => fetchUserApplications()}
//             className="ml-8 bg-[rgba(239.146,115,1)] hover:bg-[rgba(239.146,115,1)] text-white px-6 py-2 rounded-md transition"
//           >
//             Search
//           </button>
//         </div>
//       )}

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 w-11/12">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Job ID
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Job Title
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Location
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Salary
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Status
//               </th>
//               {user?.role!== 'recruiter' && <th scope="col" className="px-6 py-3 flex justify-center">
//                 Action
//               </th>}
//               {user?.role === 'recruiter'  &&
//                <th scope="col" className="px-6 py-3 flex justify-center">
//                Work Done
//               </th>
//               }
              
//             </tr>
//           </thead>
//           <tbody>
//             {
//               tasks?.map((task,index)=>(
//                 <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//               <th
//                 scope="row"
//                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//               >
//                 {task?.job?._id}
//               </th>
//               <td className="px-6 py-4">{task?.job?.title}</td>
//               <td className="px-6 py-4">{task?.job?.location}</td>
//               <td className="px-6 py-4">{task?.job?.salary} XAF</td>
//               <td className={`px-6 py-4 ${task.staus === 'in progress' ? 'text-orange-500' : 'text-green-600'}`}>{task?.status}</td>
//               {user?.role!== 'recruiter' && <td className="px-6 py-4 flex justify-center">
//                 <button
//                 disabled={task.status == 'completed' }
//                   onClick={()=>{
//                     setSelectedTask(task)
//                     openModal()
//                   }}
//                   className={`${task.status == 'completed' ? 'bg-gray-500': 'bg-blue-500' } rounded bg-blue-500 font-medium text-white hover:opacity-0.8`}
//                 >
//                   {task.status == 'completed' ? 'done':'Upload Task'}
//                 </button>
//               </td>}
//               {user?.role === 'recruiter' && task.status == 'completed'  &&
//                <td scope="col" className="px-6 py-3 flex justify-center underline text-blue-600">
//                 {
//                   task?.files?.map((link, idx)=>(
//                     <a href={`http://localhost:3000/${link}`} download>file {idx+1}</a>
//                   ))
//                 }
//               </td>}
//             </tr>
//               ))
//             }
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewTasks;

























// import React, { useState, useEffect } from "react";
// import { MdOutlineFileUpload } from "react-icons/md";
// import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
// import Modal from "react-modal";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import useUser from "../../../hooks/useUser";
// import Swal from "sweetalert2";

// Modal.setAppElement("#root");

// const ViewTasks = () => {
//   const [selectedTask, setSelectedTask] = useState({});
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState(null);
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [files, setFiles] = useState(null);
//   const [sourceText, setSourceText] = useState("");
//   const [evaluationResult, setEvaluationResult] = useState(null);
//   const [isEvaluating, setIsEvaluating] = useState(false);
//   const [activeTab, setActiveTab] = useState("upload");
//   const user = useUser();

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => {
//     setIsOpen(false);
//     setFiles(null);
//     setSourceText("");
//     setEvaluationResult(null);
//     setActiveTab("upload");
//   };

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
//       'text/plain'
//     ];

//     if (!allowedTypes.includes(file.type)) {
//       Swal.fire({
//         title: "Invalid File",
//         html: `
//           <p>The file <strong>${file.name}</strong> is not supported.</p>
//           <div class="mt-3 text-sm text-left bg-red-50 p-2 rounded">
//             <p class="font-medium">Supported formats:</p>
//             <ul class="list-disc pl-5 mt-1">
//               <li>PDF (text-based, not scanned)</li>
//               <li>Word documents (DOCX)</li>
//               <li>Plain text (UTF-8 encoded)</li>
//             </ul>
//           </div>
//         `,
//         icon: "error",
//       });
//       e.target.value = "";
//       return;
//     }

//     if (file.size > 10 * 1024 * 1024) {
//       Swal.fire({
//         title: "File Too Large",
//         text: "Maximum file size is 10MB",
//         icon: "error",
//       });
//       e.target.value = "";
//       return;
//     }

//     setFiles(selectedFiles);
//   };

//   const evaluateTranslation = async () => {
//     if (!files || !files[0]) {
//       Swal.fire({
//         title: "Missing File",
//         text: "Please select a translation file to upload",
//         icon: "error",
//       });
//       return;
//     }

//     if (!sourceText || sourceText.trim().length === 0) {
//       Swal.fire({
//         title: "Missing Source Text",
//         text: "Please enter the original text for comparison",
//         icon: "error",
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

//       if (!response.data) {
//         throw new Error("Empty response from server");
//       }

//       if (response.data.error) {
//         throw new Error(response.data.error);
//       }

//       setEvaluationResult(response.data);
//       setActiveTab("evaluate");
      
//       Swal.fire({
//         title: "Evaluation Complete",
//         html: `
//           <div class="text-left">
//             <div class="flex items-center mb-4">
//               <span class="font-semibold mr-3">Score:</span>
//               <div class="flex-1">
//                 <div class="w-full bg-gray-200 rounded-full h-4">
//                   <div class="h-4 rounded-full ${
//                     response.data.score >= 7 ? 'bg-green-500' : 
//                     response.data.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
//                   }" style="width: ${response.data.score * 10}%"></div>
//                 </div>
//               </div>
//               <span class="ml-3 font-bold ${
//                 response.data.score >= 7 ? 'text-green-600' : 
//                 response.data.score >= 4 ? 'text-yellow-600' : 'text-red-600'
//               }">
//                 ${response.data.score}/10
//               </span>
//             </div>
//             <div class="mt-4">
//               <p class="font-semibold mb-2">Feedback:</p>
//               <div class="p-3 bg-gray-50 rounded border whitespace-pre-wrap">${
//                 response.data.feedback || "No detailed feedback provided"
//               }</div>
//             </div>
//             ${response.data.textSample ? `
//             <div class="mt-4">
//               <p class="font-semibold mb-2">Extracted Text Sample:</p>
//               <div class="p-3 bg-blue-50 rounded border text-sm overflow-auto max-h-40">
//                 ${response.data.textSample}
//               </div>
//             </div>
//             ` : ''}
//           </div>
//         `,
//         icon: "success",
//         width: "600px"
//       });
//     } catch (error) {
//       console.error("Evaluation error:", error);
      
//       let errorMessage = error.message;
//       let details = "";
//       let troubleshooting = [];

//       if (error.response?.data) {
//         errorMessage = error.response.data.error || "Evaluation failed";
//         details = error.response.data.details || "";
//         troubleshooting = error.response.data.troubleshooting || [];
//       } else if (error.message.includes('timeout')) {
//         errorMessage = "Evaluation timed out";
//         details = "The operation took too long. Please try a smaller file.";
//         troubleshooting = [
//           "Reduce file size if possible",
//           "Try a simpler document format"
//         ];
//       }

//       Swal.fire({
//         title: errorMessage,
//         html: `
//           <div class="text-left">
//             ${details ? `<p class="mb-3">${details}</p>` : ''}
//             ${troubleshooting.length > 0 ? `
//               <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
//                 <p class="font-medium mb-2">Troubleshooting tips:</p>
//                 <ul class="list-disc pl-5 space-y-1">
//                   ${troubleshooting.map(tip => `<li>${tip}</li>`).join('')}
//                 </ul>
//               </div>
//             ` : ''}
//             <div class="mt-4 p-2 bg-blue-50 rounded border">
//               <p class="text-sm font-medium">Supported formats:</p>
//               <ul class="list-disc pl-5 text-sm mt-1">
//                 <li>PDF (must contain selectable text)</li>
//                 <li>Word documents (.docx)</li>
//                 <li>Plain text files (.txt, UTF-8 encoded)</li>
//               </ul>
//             </div>
//           </div>
//         `,
//         icon: "error",
//         width: "600px"
//       });
//     } finally {
//       setIsEvaluating(false);
//     }
//   };

//   const submitTask = async () => {
//     if (!evaluationResult) {
//       Swal.fire({
//         title: "Evaluation Required",
//         text: "Please complete the evaluation before submitting",
//         icon: "warning",
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       Array.from(files).forEach(file => {
//         formData.append("files", file);
//       });
//       formData.append("evaluationScore", evaluationResult.score);

//       const response = await axiosInstance.patch(
//         `/api/task/upload/${selectedTask?._id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data) {
//         Swal.fire({
//           title: "Success",
//           text: "Task submitted successfully with evaluation!",
//           icon: "success",
//         });
//         closeModal();
//         fetchTasks();
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Submission Failed",
//         text: error.response?.data?.error || "Failed to submit task",
//         icon: "error",
//       });
//     }
//   };

//   const fetchTasks = async () => {
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//     if (storedUser?.role === "recruiter" && !searchId) return;

//     const endpoint = storedUser?.role === "recruiter"
//       ? `/api/task/job/${searchId}`
//       : `/api/task/user/${storedUser?._id}`;

//     try {
//       const response = await axiosInstance.get(endpoint);
//       setTasks(response.data || []);
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch tasks",
//         icon: "error",
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
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [searchId]);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   return (
//     <div className={`w-full h-full flex ${user?.role === 'recruiter' ? 'flex-col justify-start items-center': 'justify-center items-start'}`}>
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
//             borderRadius: '0.5rem',
//             padding: '0',
//             border: 'none',
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
//           },
//           overlay: {
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             zIndex: 1000
//           }
//         }}
//         contentLabel="Task Submission"
//         shouldCloseOnOverlayClick={false}
//       >
//         <div className="w-full h-full bg-white rounded-md">
//           <button
//             onClick={closeModal}
//             className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex justify-center items-center text-lg rounded-full shadow-md transition-colors"
//             aria-label="Close modal"
//           >
//             ×
//           </button>
          
//           <div className="flex border-b">
//             <button
//               className={`flex-1 py-4 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab('upload')}
//             >
//               Upload Work
//             </button>
//             <button
//               className={`flex-1 py-4 ${activeTab === 'evaluate' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'} ${!evaluationResult ? 'opacity-50 cursor-not-allowed' : ''}`}
//               onClick={() => evaluationResult && setActiveTab('evaluate')}
//             >
//               Results
//             </button>
//           </div>

//           <div className="p-6 max-h-[80vh] overflow-y-auto">
//             {activeTab === 'upload' ? (
//               <>
//                 <h2 className="text-2xl font-bold text-center mb-6">Submit Translation</h2>
                
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Original Source Text *
//                   </label>
//                   <textarea
//                     value={sourceText}
//                     onChange={(e) => setSourceText(e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     rows={6}
//                     placeholder="Paste the original text that was translated..."
//                     required
//                   />
//                 </div>
                
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
//                   <MdOutlineFileUpload className="mx-auto text-4xl text-gray-400 mb-3" />
//                   <p className="text-lg font-medium text-gray-700 mb-1">
//                     Upload Your Translation *
//                   </p>
//                   <p className="text-sm text-gray-500 mb-4">
//                     (PDF, DOCX, or TXT - Max 10MB)
//                   </p>
//                   <input 
//                     type="file" 
//                     id="file-upload"
//                     accept=".pdf,.docx,.txt"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Choose File
//                   </label>
//                   {files?.[0] && (
//                     <div className="mt-3">
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Selected:</span> {files[0].name}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {Math.round(files[0].size / 1024)} KB
//                       </p>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex justify-between mt-8">
//                   <button 
//                     onClick={closeModal}
//                     className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Cancel
//                   </button>
//                   <button 
//                     onClick={evaluateTranslation}
//                     disabled={!files || !sourceText || isEvaluating}
//                     className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                       isEvaluating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                     } ${(!files || !sourceText) ? 'opacity-50 cursor-not-allowed' : ''}`}
//                   >
//                     {isEvaluating ? (
//                       <span className="flex items-center justify-center">
//                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </span>
//                     ) : 'Evaluate Translation'}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h2 className="text-2xl font-bold text-center mb-6">Evaluation Results</h2>
                
//                 {evaluationResult && (
//                   <div className="space-y-6">
//                     <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//                       <div className="flex items-center justify-between mb-4">
//                         <div>
//                           <p className="text-sm font-medium text-gray-500">Overall Score</p>
//                           <p className={`text-3xl font-bold ${
//                             evaluationResult.score >= 7 ? 'text-green-600' : 
//                             evaluationResult.score >= 4 ? 'text-yellow-500' : 'text-red-600'
//                           }`}>
//                             {evaluationResult.score}/10
//                           </p>
//                         </div>
//                         <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full ${
//                               evaluationResult.score >= 7 ? 'bg-green-500' : 
//                               evaluationResult.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                             style={{ width: `${evaluationResult.score * 10}%` }}
//                           ></div>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <p className="text-sm font-medium text-gray-500 mb-2">Detailed Feedback</p>
//                         <div className="p-4 bg-white rounded border border-gray-300 whitespace-pre-wrap text-sm">
//                           {evaluationResult.feedback || "No detailed feedback provided"}
//                         </div>
//                       </div>
//                     </div>

//                     {evaluationResult.textSample && (
//                       <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                         <p className="text-sm font-medium text-blue-700 mb-2">Text Sample (First 200 chars):</p>
//                         <div className="p-3 bg-white rounded border border-blue-300 text-sm overflow-auto max-h-40">
//                           {evaluationResult.textSample}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
                
//                 <div className="flex justify-between mt-8">
//                   <button 
//                     onClick={() => setActiveTab('upload')}
//                     className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   >
//                     Back to Upload
//                   </button>
//                   <button 
//                     onClick={submitTask}
//                     className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                   >
//                     Submit Evaluation
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </Modal>

//       {user?.role === "recruiter" && (
//         <div className="w-11/12 h-20 my-4 bg-white shadow-md rounded-md flex justify-around items-center px-4">
//           <select
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className="w-9/12 h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select a job to view tasks</option>
//             {jobList?.map((job, index) => (
//               <option key={index} value={job?._id}>
//                 {job?.title} ({job?.location})
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={() => fetchTasks()}
//             className="ml-4 h-12 px-6 bg-[#EF9273] hover:bg-[#E88360] text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
//           >
//             Search Tasks
//           </button>
//         </div>
//       )}

//       <div className="w-11/12 mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Job Reference
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Title
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Location
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Salary
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               {user?.role !== 'recruiter' ? (
//                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               ) : (
//                 <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Submissions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {tasks?.length > 0 ? (
//               tasks.map((task, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                     {task?.job?._id?.substring(0, 8)}...
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {task?.job?.title}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {task?.job?.location}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {task?.job?.salary?.toLocaleString()} XAF
//                   </td>
//                   <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
//                     task.status === 'in progress' ? 'text-yellow-600' : 'text-green-600'
//                   }`}>
//                     {task?.status?.charAt(0).toUpperCase() + task?.status?.slice(1)}
//                   </td>
//                   {user?.role !== 'recruiter' ? (
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                       <button
//                         disabled={task.status === 'completed'}
//                         onClick={() => {
//                           setSelectedTask(task);
//                           openModal();
//                         }}
//                         className={`inline-flex items-center px-4 py-2 border ${
//                           task.status === 'completed' 
//                             ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
//                             : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
//                         } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//                       >
//                         {task.status === 'completed' ? (
//                           <>
//                             <AiOutlineFile className="mr-2" />
//                             Completed
//                           </>
//                         ) : (
//                           <>
//                             <MdOutlineFileUpload className="mr-2" />
//                             Upload Work
//                           </>
//                         )}
//                       </button>
//                     </td>
//                   ) : (
//                     <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
//                       {task.status === 'completed' ? (
//                         <div className="flex flex-col space-y-1 items-center">
//                           {task?.files?.map((link, idx) => (
//                             <a 
//                               key={idx} 
//                               href={`http://localhost:3000/${link}`} 
//                               download
//                               className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
//                             >
//                               <AiOutlineFile className="mr-1" />
//                               Download {idx + 1}
//                             </a>
//                           ))}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400">Pending</span>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={user?.role !== 'recruiter' ? 6 : 7} className="px-6 py-4 text-center text-sm text-gray-500">
//                   {searchId ? "No tasks found for this job" : "No tasks available"}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ViewTasks;














import React, { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { AiOutlineCloseCircle, AiOutlineFile } from "react-icons/ai";
import Modal from "react-modal";
import { axiosInstance } from "../../../utils/axiosInstance";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const ViewTasks = () => {
  const [selectedTask, setSelectedTask] = useState({});
  const [jobList, setJobList] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [files, setFiles] = useState(null);
  const [sourceText, setSourceText] = useState("");
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const user = useUser();

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFiles(null);
    setSourceText("");
    setEvaluationResult(null);
    setActiveTab("upload");
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) {
      setFiles(null);
      return;
    }

    const file = selectedFiles[0];
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        title: "Invalid File",
        html: `
          <p>The file <strong>${file.name}</strong> is not supported.</p>
          <div class="mt-3 text-sm text-left bg-red-50 p-2 rounded">
            <p class="font-medium">Supported formats:</p>
            <ul class="list-disc pl-5 mt-1">
              <li>PDF (text-based, not scanned)</li>
              <li>Word documents (DOCX)</li>
              <li>Plain text (UTF-8 encoded)</li>
            </ul>
          </div>
        `,
        icon: "error",
      });
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      Swal.fire({
        title: "File Too Large",
        text: "Maximum file size is 10MB",
        icon: "error",
      });
      e.target.value = "";
      return;
    }

    setFiles(selectedFiles);
  };

  const evaluateTranslation = async () => {
    if (!files || !files[0]) {
      Swal.fire({
        title: "Missing File",
        text: "Please select a translation file to upload",
        icon: "error",
      });
      return;
    }

    if (!sourceText || sourceText.trim().length === 0) {
      Swal.fire({
        title: "Missing Source Text",
        text: "Please enter the original text for comparison",
        icon: "error",
      });
      return;
    }

    setIsEvaluating(true);
    try {
      const formData = new FormData();
      formData.append("sourceText", sourceText);
      formData.append("file", files[0]);

      const response = await axiosInstance.post(
        "/api/evaluate-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 40000
        }
      );

      if (!response.data) {
        throw new Error("Empty response from server");
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setEvaluationResult(response.data);
      setActiveTab("evaluate");
      
      Swal.fire({
        title: "Evaluation Complete",
        html: `
          <div class="text-left">
            <div class="flex items-center mb-4">
              <span class="font-semibold mr-3">Score:</span>
              <div class="flex-1">
                <div class="w-full bg-gray-200 rounded-full h-4">
                  <div class="h-4 rounded-full ${
                    response.data.score >= 7 ? 'bg-green-500' : 
                    response.data.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                  }" style="width: ${response.data.score * 10}%"></div>
                </div>
              </div>
              <span class="ml-3 font-bold ${
                response.data.score >= 7 ? 'text-green-600' : 
                response.data.score >= 4 ? 'text-yellow-600' : 'text-red-600'
              }">
                ${response.data.score}/10
              </span>
            </div>
            <div class="mt-4">
              <p class="font-semibold mb-2">Feedback:</p>
              <div class="p-3 bg-gray-50 rounded border whitespace-pre-wrap">${
                response.data.feedback || "No detailed feedback provided"
              }</div>
            </div>
            ${response.data.textSample ? `
            <div class="mt-4">
              <p class="font-semibold mb-2">Extracted Text Sample:</p>
              <div class="p-3 bg-blue-50 rounded border text-sm overflow-auto max-h-40">
                ${response.data.textSample}
              </div>
            </div>
            ` : ''}
          </div>
        `,
        icon: "success",
        width: "600px"
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      
      let errorMessage = error.message;
      let details = "";
      let troubleshooting = [];

      if (error.response?.data) {
        errorMessage = error.response.data.error || "Evaluation failed";
        details = error.response.data.details || "";
        troubleshooting = error.response.data.troubleshooting || [];
      } else if (error.message.includes('timeout')) {
        errorMessage = "Evaluation timed out";
        details = "The operation took too long. Please try a smaller file.";
        troubleshooting = [
          "Reduce file size if possible",
          "Try a simpler document format"
        ];
      }

      Swal.fire({
        title: errorMessage,
        html: `
          <div class="text-left">
            ${details ? `<p class="mb-3">${details}</p>` : ''}
            ${troubleshooting.length > 0 ? `
              <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p class="font-medium mb-2">Troubleshooting tips:</p>
                <ul class="list-disc pl-5 space-y-1">
                  ${troubleshooting.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            <div class="mt-4 p-2 bg-blue-50 rounded border">
              <p class="text-sm font-medium">Supported formats:</p>
              <ul class="list-disc pl-5 text-sm mt-1">
                <li>PDF (must contain selectable text)</li>
                <li>Word documents (.docx)</li>
                <li>Plain text files (.txt, UTF-8 encoded)</li>
              </ul>
            </div>
          </div>
        `,
        icon: "error",
        width: "600px"
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  const submitTask = async () => {
    if (!evaluationResult) {
      Swal.fire({
        title: "Evaluation Required",
        text: "Please complete the evaluation before submitting",
        icon: "warning",
      });
      return;
    }

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append("files", file);
      });
      formData.append("evaluationScore", evaluationResult.score);

      const response = await axiosInstance.patch(
        `/api/task/upload/${selectedTask?._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        Swal.fire({
          title: "Success",
          text: "Task submitted successfully with evaluation!",
          icon: "success",
        });
        closeModal();
        fetchAllTasks();
      }
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.response?.data?.error || "Failed to submit task",
        icon: "error",
      });
    }
  };

  const fetchAllTasks = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    try {
      if (storedUser?.role === "recruiter") {
        // Get jobs from sessionStorage as in your previous version
        const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
        const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
        
        // Fetch tasks for each job and combine
        const allTasks = [];
        for (const job of filteredJobs) {
          try {
            const response = await axiosInstance.get(`/api/task/job/${job._id}`);
            allTasks.push(...(response.data || []));
          } catch (error) {
            console.error(`Error fetching tasks for job ${job._id}:`, error);
          }
        }
        
        setAllTasks(allTasks);
        setTasks(allTasks);
      } else {
        // For job seeker - use existing endpoint
        const response = await axiosInstance.get(`/api/task/user/${storedUser?._id}`);
        setAllTasks(response.data || []);
        setTasks(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch tasks",
        icon: "error",
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
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error filtering tasks:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to filter tasks",
        icon: "error",
      });
    }
  };

  const fetchJobs = async () => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (storedUser?.role !== "recruiter") return;

    try {
      // Using sessionStorage as in your previous working version
      const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
      const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
      setJobList(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch jobs",
        icon: "error",
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
  }, [searchId]);

  return (
    <div className={`w-full h-full flex ${user?.role === 'recruiter' ? 'flex-col justify-start items-center': 'justify-center items-start'}`}>
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
            borderRadius: '0.5rem',
            padding: '0',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }
        }}
        contentLabel="Task Submission"
        shouldCloseOnOverlayClick={false}
      >
        <div className="w-full h-full bg-white rounded-md">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex justify-center items-center text-lg rounded-full shadow-md transition-colors"
            aria-label="Close modal"
          >
            ×
          </button>
          
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('upload')}
            >
              Upload Work
            </button>
            <button
              className={`flex-1 py-4 ${activeTab === 'evaluate' ? 'border-b-2 border-blue-500 font-semibold text-blue-600' : 'text-gray-500 hover:text-gray-700'} ${!evaluationResult ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => evaluationResult && setActiveTab('evaluate')}
            >
              Results
            </button>
          </div>

          <div className="p-6 max-h-[80vh] overflow-y-auto">
            {activeTab === 'upload' ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Submit Translation</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Source Text *
                  </label>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={6}
                    placeholder="Paste the original text that was translated..."
                    required
                  />
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
                  <MdOutlineFileUpload className="mx-auto text-4xl text-gray-400 mb-3" />
                  <p className="text-lg font-medium text-gray-700 mb-1">
                    Upload Your Translation *
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    (PDF, DOCX, or TXT - Max 10MB)
                  </p>
                  <input 
                    type="file" 
                    id="file-upload"
                    accept=".pdf,.docx,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Choose File
                  </label>
                  {files?.[0] && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Selected:</span> {files[0].name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round(files[0].size / 1024)} KB
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={evaluateTranslation}
                    disabled={!files || !sourceText || isEvaluating}
                    className={`px-6 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isEvaluating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    } ${(!files || !sourceText) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isEvaluating ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : 'Evaluate Translation'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Evaluation Results</h2>
                
                {evaluationResult && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Overall Score</p>
                          <p className={`text-3xl font-bold ${
                            evaluationResult.score >= 7 ? 'text-green-600' : 
                            evaluationResult.score >= 4 ? 'text-yellow-500' : 'text-red-600'
                          }`}>
                            {evaluationResult.score}/10
                          </p>
                        </div>
                        <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              evaluationResult.score >= 7 ? 'bg-green-500' : 
                              evaluationResult.score >= 4 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${evaluationResult.score * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-2">Detailed Feedback</p>
                        <div className="p-4 bg-white rounded border border-gray-300 whitespace-pre-wrap text-sm">
                          {evaluationResult.feedback || "No detailed feedback provided"}
                        </div>
                      </div>
                    </div>

                    {evaluationResult.textSample && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-700 mb-2">Text Sample (First 200 chars):</p>
                        <div className="p-3 bg-white rounded border border-blue-300 text-sm overflow-auto max-h-40">
                          {evaluationResult.textSample}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back to Upload
                  </button>
                  <button 
                    onClick={submitTask}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Submit Evaluation
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>

      {user?.role === "recruiter" && (
        <div className="w-11/12 h-20 my-4 bg-white shadow-md rounded-md flex justify-around items-center px-4">
          <select
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-9/12 h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className={`ml-4 h-12 px-6 ${
              !searchId ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#EF9273] hover:bg-[#E88360]'
            } text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors`}
          >
            Filter
          </button>
        </div>
      )}

      <div className="w-11/12 mt-4 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Reference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salary
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {user?.role !== 'recruiter' ? (
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              ) : (
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submissions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks?.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task?.job?._id?.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task?.job?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task?.job?.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {task?.job?.salary?.toLocaleString()} XAF
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    task.status === 'in progress' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {task?.status?.charAt(0).toUpperCase() + task?.status?.slice(1)}
                  </td>
                  {user?.role !== 'recruiter' ? (
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        disabled={task.status === 'completed'}
                        onClick={() => {
                          setSelectedTask(task);
                          openModal();
                        }}
                        className={`inline-flex items-center px-4 py-2 border ${
                          task.status === 'completed' 
                            ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100'
                        } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                      >
                        {task.status === 'completed' ? (
                          <>
                            <AiOutlineFile className="mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <MdOutlineFileUpload className="mr-2" />
                            Upload Work
                          </>
                        )}
                      </button>
                    </td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      {task.status === 'completed' ? (
                        <div className="flex flex-col space-y-1 items-center">
                          {task?.files?.map((link, idx) => (
                            <a 
                              key={idx} 
                              href={`http://localhost:3000/${link}`} 
                              download
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <AiOutlineFile className="mr-1" />
                              Download {idx + 1}
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">Pending</span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user?.role !== 'recruiter' ? 6 : 7} className="px-6 py-4 text-center text-sm text-gray-500">
                  {searchId ? "No tasks found for this job" : "No tasks available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTasks;











































































