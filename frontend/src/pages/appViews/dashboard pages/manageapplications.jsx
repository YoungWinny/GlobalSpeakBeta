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

  // const fetchApplications = async () => {
  //   try {
  //     setIsLoading(true);
  //     const storedUser = JSON.parse(sessionStorage.getItem("user") || "{}");
      
  //     if (storedUser?.role === "recruiter") {
  //       // Get applications for all jobs the recruiter has posted
  //       const jobs = JSON.parse(sessionStorage.getItem("jobList") || []);
  //       const recruiterJobs = jobs.filter(job => job?.userId === storedUser?._id);
        
  //       // Fetch applications for each job
  //       const applicationsPromises = recruiterJobs.map(job => 
  //         axiosInstance.get(`/api/application/job/${job._id}`)
  //       );
        
  //       const applicationsResponses = await Promise.all(applicationsPromises);
  //       const allApps = applicationsResponses.flatMap(res => res.data);
        
  //       setApplications(allApps);
  //     } else {
  //       // For candidates
  //       const response = await axiosInstance.get(`/api/application/user/${storedUser?._id}`);
  //       setApplications(response.data);
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
