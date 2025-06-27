import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Hero from "../../../assets/images/Jdi.jpg";
import { FiMapPin } from 'react-icons/fi';
import useUser from "../../../hooks/useUser";
import Swal from 'sweetalert2';

const JobDetails = () => {
  const { id } = useParams(); // Get job ID from URL params
  
  
  const navigate = useNavigate();
  const [job, setJob] = useState(null); // State to hold job details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const loggedUser = useUser();

  // Fetch job details from the backend
  const fetchJobDetails = async () => {
    try {
      let jobList = sessionStorage.getItem('jobList')
      if(jobList){
        jobList = JSON.parse(jobList)
        const currentJob = jobList?.find((item)=> item?._id == id);
        setJob(currentJob)
      }else{
         navigate('/dashboard/apply');
      }
    } catch (err) {
      setError("Failed to fetch job details.");
    }finally{
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-4">
        <p>Loading job details...</p>
      </div>
    );
    
  }

  const applyForJob=async()=>{
    if(!job?.examSet){
      Swal.fire({
        title: 'Apply For Job',
        text: "Sorry can't apply for this job yet no exam set for this job",
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        return;
      });
    }else{
      sessionStorage.setItem('selectedJob', JSON.stringify(job))
      navigate(`/mcq/${job?._id}`)
    }
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-8 p-4">
        <Link to="/dashboard/apply" className="text-blue-500 mb-4 inline-block">
          &lt; Back to all jobs
        </Link>
        <div className="bg-red-100 p-4 rounded-xl text-red-500">
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }


return (
 
    <div className="Jobdetailspage h-full w-full bg-[whitesmoke]">
      <Link to="/dashboard/apply" className="text-blue-500 mb-4 inline-block hover:underline">
        &lt; Back to all jobs
      </Link>
      
      <div className="jobDIV flex h-full w-full flex-col items-center justify-center">
        
        {/* Hero Image */}
        <div className="Jobdetailscardbg h-64 w-[95%] rounded-t-xl">
          <img 
            src={Hero} 
            alt="Job Hero" 
            className="w-full h-full object-fit rounded-t-xl" 
          />
        </div>
  
      
        <div className="JobdetailsForm w-[85%] bg-[#FEF9F8] relative ZIndex-10 bottom-20 rounded-2xl shadow-md p-6">
          
      
          <h1 className="text-3xl text-primary font-bold text-gray-800 mb-6 ">{job?.title}</h1>
  
          
          <div className="flex items-center  mb-4">
            <FiMapPin className="text-gray-600 mr-2" />
            <span className="text-xl text-gray-700">{job?.location}</span>
          </div>
  
         
          <ul className="space-y-3 mb-8">
            <li className="text-xl text-gray-800">
              <strong>Description:</strong> {job?.descrilition || "No description available"}
            </li>
            <li className="text-xl text-gray-800">
              <strong>Category:</strong> {job?.category}
            </li>
            {/* <li className="text-xl text-gray-800">
              <strong>Type:</strong> {job?.type}
            </li> */}
            <li className="text-xl text-gray-800">
              <strong>Experience:</strong> {job?.experience || "Not specified"}
            </li>
            <li className="text-xl text-gray-800">
              <strong>Summary:</strong> {job?.summary || "Not specified"}
            </li>
            <li className="text-xl text-gray-800">
              <strong>Salary:</strong> {job?.salary || "Not disclosed"}
            </li>
            <li className={`text-xl ${job?.examSet ? 'text-green-600' : 'text-red-600'}`}>
              <strong>Exam Set:</strong> {job?.examSet ? ' Yes':' No'}
            </li>
          </ul>
  
         
          <div className="text-gray-600 mb-8">
            <p className="text-lg">Posted Date: {new Date(job?.createdAt).toDateString()}</p>
          </div>
  
      
          {
            loggedUser?.role === 'jobseeker' &&
            <div className="flex justify-end">
            <button onClick={()=> applyForJob()} className="bg-[rgba(239,146,115,1)] text-white text-lg py-2 px-6 rounded-lg shadow hover:bg-orange-600 transition-colors duration-200">
              Apply
            </button>
          </div>}
          
        </div>
      </div>
    </div>
  );
};
// };


export default JobDetails;

