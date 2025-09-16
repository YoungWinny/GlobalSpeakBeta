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
//         const application = applications.find(app => app._id === id);
//         if (application) {
//           await updateApplication(application, status);
//           fetchApplications();
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

//   // const fetchApplications = async () => {
//   //   try {
//   //     setIsLoading(true);
//   //     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      
//   //     if (storedUser?.role === "recruiter") {
//   //       // Get applications for all jobs the recruiter has posted
//   //       const jobs = JSON.parse(sessionStorage.getItem("jobList") || []);
//   //       const recruiterJobs = jobs.filter(job => job?.userId === storedUser?._id);
        
//   //       // Fetch applications for each job
//   //       const applicationsPromises = recruiterJobs.map(job => 
//   //         axiosInstance.get(`/api/application/job/${job._id}`)
//   //       );
        
//   //       const applicationsResponses = await Promise.all(applicationsPromises);
//   //       const allApps = applicationsResponses.flatMap(res => res.data);
        
//   //       setApplications(allApps);
//   //     } else {
//   //       // For candidates
//   //       const response = await axiosInstance.get(`/api/application/user/${storedUser?._id}`);
//   //       setApplications(response.data);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching applications:", error);
//   //     Swal.fire({
//   //       title: 'Error!',
//   //       text: 'Failed to load applications',
//   //       icon: 'error'
//   //     });
//   //     setApplications([]);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
// const fetchApplications = async () => {
//   try {
//     setIsLoading(true);
//     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

//     if (storedUser?.role === "recruiter") {
//       const jobsRaw = sessionStorage.getItem("jobList");
//       const jobs = jobsRaw ? JSON.parse(jobsRaw) : [];

//       const recruiterJobs = jobs.filter(job => job?.userId === storedUser?._id);

//       const applicationsPromises = recruiterJobs.map(job =>
//         axiosInstance.get(`/api/application/job/${job._id}`)
//       );

//       const applicationsResponses = await Promise.all(applicationsPromises);
//       const allApps = applicationsResponses.flatMap(res => res.data || []);

//       setApplications(allApps);
//     } else {
//       const response = await axiosInstance.get(`/api/application/user/${storedUser?._id}`);
//       setApplications(response.data || []);
//     }
//   } catch (error) {
//     console.error("Error fetching applications:", error);
//     Swal.fire({
//       title: 'Error!',
//       text: 'Failed to load applications',
//       icon: 'error'
//     });
//     setApplications([]);
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const filterApplications = () => {
//     if (!searchId) {
//       fetchApplications(); // Reset to show all
//     } else {
//       const filtered = applications.filter(app => app.job?._id === searchId);
//       setApplications(filtered);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     if (searchId) {
//       filterApplications();
//     }
//   }, [searchId]);

//   const formatApplications = (data) => {
//     return data.map((item) => ({
//       id: item._id,
//       jobTitle: item?.job?.title,
//       applicantName: user?.role === "recruiter" 
//         ? item?.user?.fullName 
//         : `${item?.job?.location} - ${item?.job?.salary} XAF`,
//       experience: item?.score,
//       status: item?.status,
//       motivation: item?.motivation,
//       presentation: item?.presentation,
//       _id: item?._id
//     }));
//   };

//   const displayApplications = formatApplications(applications);

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
//             onClick={filterApplications}
//             disabled={isLoading}
//             className={`ml-4 h-12 px-6 ${
//               isLoading ? 'bg-gray-400' : 'bg-[#EF9273] hover:bg-[#E88360]'
//             } text-white font-medium rounded-md shadow-sm transition-colors`}
//           >
//             {isLoading ? 'Loading...' : 'Filter'}
//           </button>
//         </div>
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EF9273]"></div>
//         </div>
//       ) : displayApplications.length === 0 ? (
//         <div className="text-center py-8">
//           <p className="text-gray-500 text-lg">
//             {searchId ? "No applications found for this job" : "No applications available"}
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {displayApplications.map((application) => (
//             <div 
//               key={application.id}
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
import { 
  FaCheck, 
  FaTimes, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaDownload,
  FaUserCircle,
  FaBriefcase,
  FaChartLine,
  FaClock,
  FaSort,
  FaSortUp,
  FaSortDown
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
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
    width: '90%',
    maxWidth: '800px',
    maxHeight: '85vh',
    overflow: 'auto',
    borderRadius: '12px',
    padding: '0',
    border: 'none',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)'
  }
};

const ManageApplications = ({ darkMode }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState({});
  const [jobList, setJobList] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
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
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#EF4444',
      confirmButtonText: `Yes, ${status} it!`,
      background: darkMode ? '#374151' : '#fff',
      color: darkMode ? '#fff' : '#000',
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
          icon: 'success',
          background: darkMode ? '#374151' : '#fff',
          color: darkMode ? '#fff' : '#000',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update application',
        icon: 'error',
        background: darkMode ? '#374151' : '#fff',
        color: darkMode ? '#fff' : '#000',
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
        icon: 'error',
        background: darkMode ? '#374151' : '#fff',
        color: darkMode ? '#fff' : '#000',
      });
    }
  };

  const fetchApplications = async () => {
    try {
      setIsLoading(true);
      const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");

      if (storedUser?.role === "recruiter") {
        const jobsRaw = sessionStorage.getItem("jobList");
        const jobs = jobsRaw ? JSON.parse(jobsRaw) : [];

        const recruiterJobs = jobs.filter(job => job?.userId === storedUser?._id);

        const applicationsPromises = recruiterJobs.map(job =>
          axiosInstance.get(`/api/application/job/${job._id}`)
        );

        const applicationsResponses = await Promise.all(applicationsPromises);
        const allApps = applicationsResponses.flatMap(res => res.data || []);

        setApplications(allApps);
      } else {
        const response = await axiosInstance.get(`/api/application/user/${storedUser?._id}`);
        setApplications(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to load applications',
        icon: 'error',
        background: darkMode ? '#374151' : '#fff',
        color: darkMode ? '#fff' : '#000',
      });
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    if (!searchId) {
      fetchApplications();
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
      _id: item?._id,
      createdAt: item?.createdAt,
      jobLocation: item?.job?.location,
      jobSalary: item?.job?.salary,
      applicantEmail: item?.user?.email
    }));
  };

  const filteredApplications = formatApplications(applications)
    .filter(app => {
      const matchesSearch = searchTerm === "" || 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "score") {
        return sortOrder === "asc" ? a.experience - b.experience : b.experience - a.experience;
      }
      return 0;
    });

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted": return "bg-green-100 text-green-800 border-green-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted": return <FaCheck className="text-green-500" />;
      case "rejected": return <FaTimes className="text-red-500" />;
      case "pending": return <FaClock className="text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Applications</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {user?.role === "recruiter" ? "Manage candidate applications" : "Track your job applications"}
          </p>
        </div>

        {/* Filters and Search */}
        <div className={`mb-6 p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {user?.role === "recruiter" && (
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium mb-2">Filter by Job</label>
                <select
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className={`w-full h-12 px-4 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                  disabled={isLoading}
                >
                  <option value="">All Jobs</option>
                  {jobList?.map((job) => (
                    <option key={job._id} value={job._id}>
                      {job.title} ({job.location})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex-1 w-full">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <FaSearch className={`absolute left-3 top-3.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full h-12 pl-10 pr-4 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                />
              </div>
            </div>

            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full h-12 px-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium mb-2">Sort by</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`flex-1 h-12 px-4 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-[#EF9273] focus:border-transparent`}
                >
                  <option value="date">Date</option>
                  <option value="score">Score</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className={`h-12 px-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } hover:bg-gray-100 transition-colors`}
                >
                  {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EF9273]"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className={`text-center py-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <FaBriefcase className="mx-auto text-4xl mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No applications found</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || statusFilter !== "all" || searchId 
                ? "Try adjusting your filters" 
                : "No applications available yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredApplications.map((application) => (
              <div 
                key={application.id}
                className={`rounded-xl p-6 shadow-sm transition-all hover:shadow-md ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 truncate">{application.jobTitle}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className="text-sm">{application.applicantName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <FaChartLine className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className="text-sm">
                      Test Score: <span className="font-semibold text-green-600">{application.experience || 'N/A'}</span>
                    </span>
                  </div>
                </div>

                {user?.role === "recruiter" && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => openModal(application)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        darkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    >
                      <FaEye size={12} /> View
                    </button>
                    
                    {application.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleDecision(application.id, "accepted")}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-green-100 hover:bg-green-200 text-green-800 transition-colors"
                        >
                          <FaCheck size={12} /> Accept
                        </button>
                        <button
                          onClick={() => handleDecision(application.id, "rejected")}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-100 hover:bg-red-200 text-red-800 transition-colors"
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

        {/* Application Details Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={{
            ...customStyles,
            content: {
              ...customStyles.content,
              background: darkMode ? '#374151' : '#fff',
              color: darkMode ? '#fff' : '#000'
            }
          }}
          contentLabel="Application Details"
        >
          <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Application Details</h2>
              <button 
                onClick={closeModal}
                className={`p-2 rounded-lg hover:bg-opacity-20 ${
                  darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <FaTimes size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-500">APPLICANT</h3>
                <p className="text-lg">{selectedApplication?.applicantName || 'N/A'}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-500">TEST SCORE</h3>
                <p className="text-2xl font-bold text-green-600">
                  {selectedApplication?.experience || 'N/A'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-500">MOTIVATION LETTER</h3>
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <p className="leading-relaxed">
                    {selectedApplication?.motivation || 'No motivation letter provided'}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-sm mb-3 text-gray-500">PRESENTATION VIDEO</h3>
                {selectedApplication?.presentation?.length > 0 ? (
                  <div className="relative">
                    <video
                      controls
                      src={`${SERVER_URL}${selectedApplication.presentation[0]}`}
                      className="w-full rounded-lg border"
                    />
                    <a
                      href={`${SERVER_URL}${selectedApplication.presentation[0]}`}
                      download
                      className="absolute top-2 right-2 bg-white bg-opacity-90 p-2 rounded-lg shadow-md hover:bg-opacity-100 transition-opacity"
                    >
                      <FaDownload className="text-gray-700" />
                    </a>
                  </div>
                ) : (
                  <div className={`w-full h-32 rounded-lg border flex items-center justify-center ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                  }`}>
                    <span className="text-gray-500">No video available</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ManageApplications;
