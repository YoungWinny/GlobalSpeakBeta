// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import useUser from "../../../hooks/useUser";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import ReactDOM from "react-dom";
// import Modal from "react-modal";

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

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#root");
// const SERVER_URL = "http://localhost:3000/"

// const ManageApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [applicationData, setApplicationData] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState({})
//   const user = useUser();
//   const [job, setJob] = useState([]);
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState(null);

//   let subtitle;
//   const [modalIsOpen, setIsOpen] = React.useState(false);

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

//   // Function to handle acceptance or rejection
//   const handleDecision = (id, status) => {
//     // Display SweetAlert notification
//     const application = applicationData.find((item, index) => index === id - 1);
//     Swal.fire({
//       title:
//         status === "accepted" ? "Application Accepted" : "Application Rejected",
//       text: `Are you sure you want to ${status.toUpperCase()} this applicant ?`,
//       icon: status === "accepted" ? "success" : "error",
//       confirmButtonText: "Yes",
//     }).then(() => {
//       updateApplication(application, status);
//       fetchUserApplications();
//     });
//   };

//   const updateApplication = async (application, status) => {
//     console.log("status: ", status);
//     console.log("id: ", application);
//     try {
//       const response = axiosInstance.patch(
//         `/api/application/${application?._id}`,
//         {
//           status,
//         }
//       );
//       if (response.data) {
//         Swal.fire({
//           title: "Application Status",
//           text: `Application status ${status.toUpperCase()} successfully !!!`,
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then(() => {
//           return;
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         title: "Application Status",
//         text: `Application status update failed please try again`,
//         icon: "error",
//         confirmButtonText: "OK",
//       }).then(() => {
//         return;
//       });
//     } finally {
//       fetchUserApplications();
//     }
//   };

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

//   const fetchUserApplications = async () => {
//     let storedUser = sessionStorage.getItem("user");
    
//     console.log
//     if (storedUser) {
//       storedUser = JSON.parse(storedUser);
//     }

//     if (storedUser?.role === "recruiter" && !searchId) return;
//     const endpoint =
//       storedUser?.role === "recruiter"
//         ? `/api/application/job/${searchId}`
//         : `/api/application/user/${storedUser?._id}`;
//     try {
//       const response = await axiosInstance.get(endpoint);
//       if (response?.data) {
//         const temp = response.data?.map((item, index) => {
//           const recruiterObj = {
//             id: index + 1,
//             jobTitle: item?.job?.title,
//             applicantName: item?.user?.fullName,
//             experience: item?.score,
//             status: item?.status,
//             motivation: item?.motivation,
//             presentation: item?.presentation
//           };
//           const jobSeekerObj = {
//             id: index + 1,
//             jobTitle: item?.job?.title,
//             applicantName:
//               item?.job?.location + " - " + item?.job?.salary + " XAF",
//             experience: item?.score,
//             status: item?.status,
//             motivation: item?.motivation,
//             presentation: item?.presentation
//           };
//           const obj =
//             user?.role === "recruiter"
//               ? { ...recruiterObj }
//               : { ...jobSeekerObj };
//           return { ...obj };
//         });

//         setApplications([...temp]);
//         setApplicationData(response.data);
//       }
//     } catch (err) {}
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     fetchUserApplications();
//   }, [searchId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

//       <Modal
//         isOpen={modalIsOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Application Profile"
//       >
//        <div className="w-[600px] h-[650px] bg-white rounded-md ">
//           <button onClick={closeModal} className="bg-red-500 text-white w-6 h-6 flex justify-center items-center text-lg rounded-full shadow-md flex items-center float-right">x</button>
//           <div>
//             <h2>Applicant: {selectedApplication?.applicantName}</h2>
//             <h2>Test Score: <b className="text-green-500 font-bold text-lg">{selectedApplication?.experience}</b></h2>
//             <label className="mt-4 text-sm text-gray-500">Motivation Letter</label>
//             <textarea value={selectedApplication?.motivation} className='w-[98%] h-[200px] p-2 border border-gray-300 rounded border-dashed'/>
//             <video autoPlay src={selectedApplication?.presentation?.length > 0 ? SERVER_URL+selectedApplication?.presentation[0] : ''} className="w-[98%] h-[370px] border rounded"/>
//           </div>
//        </div>
//       </Modal>

//       {user?.role === "recruiter" && (
//         <div className="w-full h-20 mb-4 bg-white shadow-md rounded-md flex justify-around items-center">
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

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {applications.map((application) => (
//           <div
//             key={application.id}
//             className="border border-gray-300 shadow-md rounded-lg p-4 bg-white"
//           >
//             <h2 className="text-xl font-semibold mb-2">
//               {application.jobTitle}
//             </h2>
//             <p className="mb-1">
//               {user?.role == "recruiter" ? "Applicant" : "Job Details"}:{" "}
//               {application.applicantName}
//             </p>
//             <p className="mb-1 ">
//               Test Score:{" "}
//               <b className="font-bold text-primary text-lg">
//                 {application.experience}
//               </b>
//             </p>
//             <p
//               className={`mb-3 font-bold ${
//                 application.status === "accepted"
//                   ? "text-green-500"
//                   : application.status === "rejected"
//                   ? "text-red-500"
//                   : "text-gray-500"
//               }`}
//             >
//               Status: {application.status}
//             </p>
//             {user?.role === "recruiter" && (
//               <div className="flex justify-between">
                
//                 {
//                   user?.role === 'recruiter' && 
//                   <button
//                     onClick={() => {
//                       openModal()
//                       setSelectedApplication(application)
//                     }}
//                     className="bg-blue-500 mx-1 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                   >
//                     View Profile
//                   </button>
//                 }
//                 {application.status == "pending" && (
//                   <button
//                     onClick={() => handleDecision(application.id, "accepted")}
//                     className="bg-[#e8744d] mx-1 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                   >
//                     <FaCheck /> Accept
//                   </button>
//                 )}
//                 {application.status == "pending" && (
//                   <button
//                     onClick={() => handleDecision(application.id, "rejected")}
//                     className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                   >
//                     <FaTimes />
//                     <span>Reject</span>
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageApplications;














// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
// import useUser from "../../../hooks/useUser";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import Modal from "react-modal";

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
// const SERVER_URL = "http://localhost:3000/";

// const ManageApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [applicationData, setApplicationData] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState({});
//   const user = useUser();
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [modalIsOpen, setIsOpen] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleDecision = async (id, status) => {
//     const confirmation = await Swal.fire({
//       title: status === "accepted" ? "Accept Application" : "Reject Application",
//       text: `Are you sure you want to ${status.toUpperCase()} this applicant?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     });

//     if (confirmation.isConfirmed) {
//       const application = applicationData.find((item, index) => index === id - 1);
//       await updateApplication(application, status);
//     }
//   };

//   const updateApplication = async (application, status) => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.patch(
//         `/api/application/${application?._id}`,
//         { status }
//       );

//       if (response.data) {
//         await Swal.fire({
//           title: "Success!",
//           text: `Application ${status.toUpperCase()} successfully!`,
//           icon: "success",
//         });
//         fetchUserApplications();
//       }
//     } catch (err) {
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to update application status. Please try again.",
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchJobs = async () => {
//     try {
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//       if (storedUser?.role === "jobseeker") return;

//       const jobListData = sessionStorage.getItem("jobList");
//       const data = jobListData ? JSON.parse(jobListData) : [];
      
//       const filteredJobs = Array.isArray(data) 
//         ? data.filter(job => job?.userId === storedUser?._id)
//         : [];

//       setJobList(
//         storedUser?.role === "recruiter" ? filteredJobs : data
//       );
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setJobList([]);
//     }
//   };

//   const fetchUserApplications = async () => {
//     try {
//       setLoading(true);
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

//       if (storedUser?.role === "recruiter" && !searchId) {
//         setApplications([]);
//         return;
//       }

//       const endpoint = storedUser?.role === "recruiter"
//         ? `/api/application/job/${searchId}`
//         : `/api/application/user/${storedUser?._id}`;

//       const response = await axiosInstance.get(endpoint);
      
//       if (response?.data) {
//         const temp = response.data.map((item, index) => {
//           const commonData = {
//             id: index + 1,
//             jobTitle: item?.job?.title,
//             experience: item?.score,
//             status: item?.status,
//             motivation: item?.motivation,
//             presentation: item?.presentation
//           };

//           return user?.role === "recruiter"
//             ? {
//                 ...commonData,
//                 applicantName: item?.user?.fullName,
//               }
//             : {
//                 ...commonData,
//                 applicantName: `${item?.job?.location} - ${item?.job?.salary} XAF`,
//               };
//         });

//         setApplications(temp);
//         setApplicationData(response.data);
//       }
//     } catch (err) {
//       console.error("Error fetching applications:", err);
//       Swal.fire({
//         title: "Error!",
//         text: "Failed to load applications. Please try again.",
//         icon: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     fetchUserApplications();
//   }, [searchId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Application Profile"
//       >
//         <div className="w-[600px] h-[650px] bg-white rounded-md p-4">
//           <button 
//             onClick={closeModal} 
//             className="bg-red-500 text-white w-6 h-6 flex justify-center items-center text-lg rounded-full shadow-md float-right"
//           >
//             ×
//           </button>
//           <div className="mt-4">
//             <h2 className="text-xl font-semibold">Applicant: {selectedApplication?.applicantName}</h2>
//             <h2 className="mt-2">
//               Test Score: <span className="text-green-500 font-bold text-lg">{selectedApplication?.experience}</span>
//             </h2>
//             <label className="mt-4 block text-sm text-gray-500">Motivation Letter</label>
//             <textarea 
//               readOnly
//               value={selectedApplication?.motivation || ""} 
//               className='w-full h-[200px] p-2 mt-1 border border-gray-300 rounded border-dashed'
//             />
//             <video 
//               controls
//               src={selectedApplication?.presentation ? `${SERVER_URL}${selectedApplication.presentation}` : undefined} 
//               className="w-full h-[300px] border rounded mt-4"
//             />
//           </div>
//         </div>
//       </Modal>

//       {user?.role === "recruiter" && (
//         <div className="w-full h-20 mb-4 bg-white shadow-md rounded-md flex justify-around items-center px-4">
//           <select
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className="w-9/12 h-2/4 px-2 border border-gray-200 rounded"
//           >
//             <option value="">Select a job</option>
//             {jobList.map((job, index) => (
//               <option key={index} value={job?._id}>
//                 {job?.title}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={fetchUserApplications}
//             disabled={loading}
//             className="ml-4 bg-[#EF9273] hover:bg-[#e8744d] text-white px-6 py-2 rounded-md transition disabled:opacity-50"
//           >
//             {loading ? <FaSpinner className="animate-spin" /> : "Search"}
//           </button>
//         </div>
//       )}

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <FaSpinner className="animate-spin text-4xl text-[#EF9273]" />
//         </div>
//       ) : applications.length === 0 ? (
//         <div className="text-center py-10 text-gray-500">
//           No applications found
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {applications.map((application) => (
//             <div
//               key={application.id}
//               className="border border-gray-300 shadow-md rounded-lg p-4 bg-white hover:shadow-lg transition"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 {application.jobTitle}
//               </h2>
//               <p className="mb-1">
//                 {user?.role === "recruiter" ? "Applicant" : "Job Details"}:{" "}
//                 {application.applicantName}
//               </p>
//               <p className="mb-1">
//                 Test Score:{" "}
//                 <span className="font-bold text-[#EF9273] text-lg">
//                   {application.experience}
//                 </span>
//               </p>
//               <p
//                 className={`mb-3 font-bold ${
//                   application.status === "accepted"
//                     ? "text-green-500"
//                     : application.status === "rejected"
//                     ? "text-red-500"
//                     : "text-gray-500"
//                 }`}
//               >
//                 Status: {application.status}
//               </p>
              
//               {user?.role === "recruiter" && (
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => {
//                       openModal();
//                       setSelectedApplication(application);
//                     }}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                   >
//                     View Profile
//                   </button>
                  
//                   {application.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => handleDecision(application.id, "accepted")}
//                         className="bg-[#e8744d] text-white px-4 py-2 rounded-md flex items-center gap-2"
//                       >
//                         <FaCheck /> Accept
//                       </button>
//                       <button
//                         onClick={() => handleDecision(application.id, "rejected")}
//                         className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                       >
//                         <FaTimes /> Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageApplications;






















// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import useUser from "../../../hooks/useUser";
// import { axiosInstance } from "../../../utils/axiosInstance";
// import Modal from "react-modal";

// // Modal setup
// Modal.setAppElement("#root");
// const SERVER_URL = "http://localhost:3000/";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '600px',
//     maxWidth: '90vw',
//     maxHeight: '90vh',
//     overflow: 'auto'
//   },
//   overlay: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//   }
// };

// const ManageApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [applicationData, setApplicationData] = useState([]);
//   const [selectedApplication, setSelectedApplication] = useState({});
//   const [jobList, setJobList] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [modalIsOpen, setIsOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const user = useUser();

//   const openModal = (application) => {
//     setSelectedApplication(application);
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   const handleDecision = async (id, status) => {
//     const result = await Swal.fire({
//       title: `Are you sure?`,
//       text: `This will ${status} the application`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: `Yes, ${status} it!`
//     });

//     if (result.isConfirmed) {
//       try {
//         const application = applicationData.find((_, index) => index === id - 1);
//         if (application) {
//           await updateApplication(application, status);
//           fetchUserApplications();
//         }
//       } catch (error) {
//         console.error("Error handling decision:", error);
//       }
//     }
//   };

//   const updateApplication = async (application, status) => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.patch(
//         `/api/application/${application?._id}`,
//         { status }
//       );
      
//       if (response.data) {
//         Swal.fire({
//           title: 'Success!',
//           text: `Application ${status} successfully`,
//           icon: 'success'
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: 'Error!',
//         text: error.response?.data?.message || 'Failed to update application',
//         icon: 'error'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchJobs = async () => {
//     try {
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
//       if (storedUser?.role !== "recruiter") return;

//       const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
//       const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
//       setJobList(filteredJobs);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to load jobs',
//         icon: 'error'
//       });
//     }
//   };

//   const fetchUserApplications = async () => {
//     try {
//       setIsLoading(true);
//       const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      
//       if (storedUser?.role === "recruiter" && !searchId) {
//         setApplications([]);
//         return;
//       }

//       const endpoint = storedUser?.role === "recruiter"
//         ? `/api/application/job/${searchId}`
//         : `/api/application/user/${storedUser?._id}`;
      
//       const response = await axiosInstance.get(endpoint);
      
//       if (response?.data) {
//         const formattedApplications = response.data.map((item, index) => ({
//           id: index + 1,
//           jobTitle: item?.job?.title,
//           applicantName: user?.role === "recruiter" 
//             ? item?.user?.fullName 
//             : `${item?.job?.location} - ${item?.job?.salary} XAF`,
//           experience: item?.score,
//           status: item?.status,
//           motivation: item?.motivation,
//           presentation: item?.presentation,
//           _id: item?._id
//         }));

//         setApplications(formattedApplications);
//         setApplicationData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       Swal.fire({
//         title: 'Error!',
//         text: 'Failed to load applications',
//         icon: 'error'
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     fetchUserApplications();
//   }, [searchId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

//       {user?.role === "recruiter" && (
//         <div className="w-full h-20 mb-4 bg-white shadow-md rounded-md flex justify-around items-center px-4">
//           <select
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//             className="w-9/12 h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//             disabled={isLoading}
//           >
//             <option value="">All Jobs</option>
//             {jobList?.map((job) => (
//               <option key={job._id} value={job._id}>
//                 {job.title} ({job.location})
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={fetchUserApplications}
//             disabled={isLoading || !searchId}
//             className={`ml-4 h-12 px-6 ${
//               isLoading || !searchId ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'
//             } text-white font-medium rounded-md shadow-sm transition-colors`}
//           >
//             {isLoading ? 'Loading...' : 'Search'}
//           </button>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EF9273]"></div>
//         </div>
//       ) : applications.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-500 text-lg">
//             {searchId ? "No applications found for this job" : "No applications available"}
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {applications.map((application) => (
//             <div 
//               key={`${application.id}-${application._id}`}
//               className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
//             >
//               <h2 className="text-xl font-semibold mb-2">{application.jobTitle}</h2>
//               <p className="mb-2">
//                 <span className="font-medium">
//                   {user?.role === "recruiter" ? "Applicant:" : "Location:"}
//                 </span> {application.applicantName}
//               </p>
//               <p className="mb-2">
//                 <span className="font-medium">Test Score:</span> 
//                 <span className="font-bold text-green-600 ml-1">
//                   {application.experience || 'N/A'}
//                 </span>
//               </p>
//               <div className="flex items-center mb-3">
//                 <span className="font-medium mr-1">Status:</span>
//                 <span className={`font-semibold ${
//                   application.status === "accepted" ? "text-green-600" :
//                   application.status === "rejected" ? "text-red-600" : "text-yellow-600"
//                 }`}>
//                   {application.status}
//                 </span>
//               </div>

//               {user?.role === "recruiter" && (
//                 <div className="flex flex-wrap gap-2">
//                   <button
//                     onClick={() => openModal(application)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
//                   >
//                     View Profile
//                   </button>
                  
//                   {application.status === "pending" && (
//                     <>
//                       <button
//                         onClick={() => handleDecision(application.id, "accepted")}
//                         disabled={isLoading}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
//                       >
//                         <FaCheck size={12} /> Accept
//                       </button>
//                       <button
//                         onClick={() => handleDecision(application.id, "rejected")}
//                         disabled={isLoading}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
//                       >
//                         <FaTimes size={12} /> Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Application Details"
//         ariaHideApp={true}
//       >
//         <div className="bg-white rounded-md p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Application Details</h2>
//             <button 
//               onClick={closeModal}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <FaTimes size={20} />
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-semibold">Applicant:</h3>
//               <p>{selectedApplication?.applicantName || 'N/A'}</p>
//             </div>
            
//             <div>
//               <h3 className="font-semibold">Test Score:</h3>
//               <p className="text-green-600 font-bold">
//                 {selectedApplication?.experience || 'N/A'}
//               </p>
//             </div>
            
//             <div>
//               <h3 className="font-semibold">Motivation Letter:</h3>
//               <textarea 
//                 readOnly
//                 value={selectedApplication?.motivation || 'No motivation letter provided'}
//                 className="w-full h-32 p-2 border border-gray-300 rounded mt-1"
//               />
//             </div>
            
//             <div>
//               <h3 className="font-semibold">Presentation Video:</h3>
//               {selectedApplication?.presentation?.length > 0 ? (
//                 <video
//                   controls
//                   src={`${SERVER_URL}${selectedApplication.presentation[0]}`}
//                   className="w-full max-h-64 border rounded mt-1"
//                 />
//               ) : (
//                 <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-500">
//                   No video available
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default ManageApplications;

















import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import { axiosInstance } from "../../../utils/axiosInstance";
import Modal from "react-modal";

// Modal setup
Modal.setAppElement("#root");
const SERVER_URL = "http://localhost:3000/";

const customStyles = {
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
    overflow: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});
  const [jobList, setJobList] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const openModal = (application) => {
    setSelectedApplication(application);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleDecision = async (id, status) => {
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `This will ${status} the application`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${status} it!`
    });

    if (result.isConfirmed) {
      try {
        const application = applications.find(app => app._id === id);
        if (application) {
          await updateApplication(application, status);
          fetchApplications();
        }
      } catch (error) {
        console.error("Error handling decision:", error);
      }
    }
  };

  const updateApplication = async (application, status) => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        `/api/application/${application?._id}`,
        { status }
      );
      
      if (response.data) {
        Swal.fire({
          title: 'Success!',
          text: `Application ${status} successfully`,
          icon: 'success'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update application',
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      if (storedUser?.role !== "recruiter") return;

      const data = JSON.parse(sessionStorage.getItem("jobList") || "[]");
      const filteredJobs = data.filter(job => job?.userId === storedUser?._id);
      setJobList(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load jobs',
        icon: 'error'
      });
    }
  };

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      
      if (storedUser?.role === "recruiter") {
        // Get applications for all jobs the recruiter has posted
        const jobs = JSON.parse(sessionStorage.getItem("jobList") || []);
        const recruiterJobs = jobs.filter(job => job?.userId === storedUser?._id);
        
        // Fetch applications for each job
        const applicationsPromises = recruiterJobs.map(job => 
          axiosInstance.get(`/api/application/job/${job._id}`)
        );
        
        const applicationsResponses = await Promise.all(applicationsPromises);
        const allApps = applicationsResponses.flatMap(res => res.data);
        
        setApplications(allApps);
      } else {
        // For candidates
        const response = await axiosInstance.get(`/api/application/user/${storedUser?._id}`);
        setApplications(response.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load applications',
        icon: 'error'
      });
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    if (!searchId) {
      fetchApplications(); // Reset to show all
    } else {
      const filtered = applications.filter(app => app.job?._id === searchId);
      setApplications(filtered);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  useEffect(() => {
    if (searchId) {
      filterApplications();
    }
  }, [searchId]);

  const formatApplications = (data) => {
    return data.map((item) => ({
      id: item._id,
      jobTitle: item?.job?.title,
      applicantName: user?.role === "recruiter" 
        ? item?.user?.fullName 
        : `${item?.job?.location} - ${item?.job?.salary} XAF`,
      experience: item?.score,
      status: item?.status,
      motivation: item?.motivation,
      presentation: item?.presentation,
      _id: item?._id
    }));
  };

  const displayApplications = formatApplications(applications);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Job Applications</h1>

      {user?.role === "recruiter" && (
        <div className="w-full h-20 mb-4 bg-white shadow-md rounded-md flex justify-around items-center px-4">
          <select
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-9/12 h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          >
            <option value="">All Jobs</option>
            {jobList?.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title} ({job.location})
              </option>
            ))}
          </select>

          <button
            onClick={filterApplications}
            disabled={isLoading}
            className={`ml-4 h-12 px-6 ${
              isLoading ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'
            } text-white font-medium rounded-md shadow-sm transition-colors`}
          >
            {isLoading ? 'Loading...' : 'Filter'}
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EF9273]"></div>
        </div>
      ) : displayApplications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">
            {searchId ? "No applications found for this job" : "No applications available"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayApplications.map((application) => (
            <div 
              key={application.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{application.jobTitle}</h2>
              <p className="mb-2">
                <span className="font-medium">
                  {user?.role === "recruiter" ? "Applicant:" : "Location:"}
                </span> {application.applicantName}
              </p>
              <p className="mb-2">
                <span className="font-medium">Test Score:</span> 
                <span className="font-bold text-green-600 ml-1">
                  {application.experience || 'N/A'}
                </span>
              </p>
              <div className="flex items-center mb-3">
                <span className="font-medium mr-1">Status:</span>
                <span className={`font-semibold ${
                  application.status === "accepted" ? "text-green-600" :
                  application.status === "rejected" ? "text-red-600" : "text-yellow-600"
                }`}>
                  {application.status}
                </span>
              </div>

              {user?.role === "recruiter" && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openModal(application)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                  >
                    View Profile
                  </button>
                  
                  {application.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleDecision(application.id, "accepted")}
                        disabled={isLoading}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
                      >
                        <FaCheck size={12} /> Accept
                      </button>
                      <button
                        onClick={() => handleDecision(application.id, "rejected")}
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-1"
                      >
                        <FaTimes size={12} /> Reject
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Application Details"
        ariaHideApp={true}
      >
        <div className="bg-white rounded-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Application Details</h2>
            <button 
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Applicant:</h3>
              <p>{selectedApplication?.applicantName || 'N/A'}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Test Score:</h3>
              <p className="text-green-600 font-bold">
                {selectedApplication?.experience || 'N/A'}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Motivation Letter:</h3>
              <textarea 
                readOnly
                value={selectedApplication?.motivation || 'No motivation letter provided'}
                className="w-full h-32 p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            
            <div>
              <h3 className="font-semibold">Presentation Video:</h3>
              {selectedApplication?.presentation?.length > 0 ? (
                <video
                  controls
                  src={`${SERVER_URL}${selectedApplication.presentation[0]}`}
                  className="w-full max-h-64 border rounded mt-1"
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center text-gray-500">
                  No video available
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageApplications;
