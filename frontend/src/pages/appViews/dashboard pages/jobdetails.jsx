// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import Hero from "../../../assets/images/Jdi.jpg";
// import { FiMapPin } from 'react-icons/fi';
// import useUser from "../../../hooks/useUser";
// import Swal from 'sweetalert2';

// const JobDetails = () => {
//   const { id } = useParams(); // Get job ID from URL params
  
  
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null); // State to hold job details
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const loggedUser = useUser();

//   // Fetch job details from the backend
//   const fetchJobDetails = async () => {
//     try {
//       let jobList = sessionStorage.getItem('jobList')
//       if(jobList){
//         jobList = JSON.parse(jobList)
//         const currentJob = jobList?.find((item)=> item?._id == id);
//         setJob(currentJob)
//       }else{
//          navigate('/dashboard/apply');
//       }
//     } catch (err) {
//       setError("Failed to fetch job details.");
//     }finally{
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails();
//   }, []);

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto mt-8 p-4">
//         <p>Loading job details...</p>
//       </div>
//     );
    
//   }

//   const applyForJob=async()=>{
//     if(!job?.examSet){
//       Swal.fire({
//         title: 'Apply For Job',
//         text: "Sorry can't apply for this job yet no exam set for this job",
//         icon: 'error',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         return;
//       });
//     }else{
//       sessionStorage.setItem('selectedJob', JSON.stringify(job))
//       navigate(`/mcq/${job?._id}`)
//     }
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto mt-8 p-4">
//         <Link to="/dashboard/apply" className="text-blue-500 mb-4 inline-block">
//           &lt; Back to all jobs
//         </Link>
//         <div className="bg-red-100 p-4 rounded-xl text-red-500">
//           <h2 className="text-xl font-bold">Error</h2>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }


// return (
 
//     <div className="Jobdetailspage h-full w-full bg-[whitesmoke]">
//       <Link to="/dashboard/apply" className="text-blue-500 mb-4 inline-block hover:underline">
//         &lt; Back to all jobs
//       </Link>
      
//       <div className="jobDIV flex h-full w-full flex-col items-center justify-center">
        
//         {/* Hero Image */}
//         <div className="Jobdetailscardbg h-64 w-[95%] rounded-t-xl">
//           <img 
//             src={Hero} 
//             alt="Job Hero" 
//             className="w-full h-full object-fit rounded-t-xl" 
//           />
//         </div>
  
      
//         <div className="JobdetailsForm w-[85%] bg-[#FEF9F8] relative ZIndex-10 bottom-20 rounded-2xl shadow-md p-6">
          
      
//           <h1 className="text-3xl text-primary font-bold text-gray-800 mb-6 ">{job?.title}</h1>
  
          
//           <div className="flex items-center  mb-4">
//             <FiMapPin className="text-gray-600 mr-2" />
//             <span className="text-xl text-gray-700">{job?.location}</span>
//           </div>
  
         
//           <ul className="space-y-3 mb-8">
//             <li className="text-xl text-gray-800">
//               <strong>Description:</strong> {job?.descrilition || "No description available"}
//             </li>
//             <li className="text-xl text-gray-800">
//               <strong>Category:</strong> {job?.category}
//             </li>
//             {/* <li className="text-xl text-gray-800">
//               <strong>Type:</strong> {job?.type}
//             </li> */}
//             <li className="text-xl text-gray-800">
//               <strong>Experience:</strong> {job?.experience || "Not specified"}
//             </li>
//             <li className="text-xl text-gray-800">
//               <strong>Summary:</strong> {job?.summary || "Not specified"}
//             </li>
//             <li className="text-xl text-gray-800">
//               <strong>Salary:</strong> {job?.salary || "Not disclosed"}
//             </li>
//             <li className={`text-xl ${job?.examSet ? 'text-green-600' : 'text-red-600'}`}>
//               <strong>Exam Set:</strong> {job?.examSet ? ' Yes':' No'}
//             </li>
//           </ul>
  
         
//           <div className="text-gray-600 mb-8">
//             <p className="text-lg">Posted Date: {new Date(job?.createdAt).toDateString()}</p>
//           </div>
  
      
//           {
//             loggedUser?.role === 'jobseeker' &&
//             <div className="flex justify-end">
//             <button onClick={()=> applyForJob()} className="bg-[rgba(239,146,115,1)] text-white text-lg py-2 px-6 rounded-lg shadow hover:bg-orange-600 transition-colors duration-200">
//               Apply
//             </button>
//           </div>}
          
//         </div>
//       </div>
//     </div>
//   );
// };
// // };


// export default JobDetails;










import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Hero from "../../../assets/images/Jdi.jpg";
import { FiMapPin, FiClock, FiDollarSign, FiAward, FiBook } from 'react-icons/fi';
import { MdWorkOutline, MdDescription } from 'react-icons/md';
import useUser from "../../../hooks/useUser";
import Swal from 'sweetalert2';

const JobDetails = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedUser = useUser();

  const fetchJobDetails = async () => {
    try {
      let jobList = sessionStorage.getItem('jobList');
      if(jobList){
        jobList = JSON.parse(jobList);
        const currentJob = jobList?.find((item)=> item?._id == id);
        setJob(currentJob);
      } else {
        navigate('/dashboard/apply');
      }
    } catch (err) {
      setError("Failed to fetch job details.");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const applyForJob = async () => {
    if(!job?.examSet){
      Swal.fire({
        title: 'Apply For Job',
        text: "Sorry can't apply for this job yet - no exam set for this position",
        icon: 'error',
        confirmButtonText: 'OK',
        background: darkMode ? '#1f2937' : '#fff',
        color: darkMode ? '#fff' : '#000'
      });
    } else {
      sessionStorage.setItem('selectedJob', JSON.stringify(job));
      // navigate(`/mcq/${job?._id}`);
      navigate(`/dashboard/mcq/${job?._id}`);
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-full ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-pulse flex flex-col items-center">
          <div className={`h-8 w-64 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4`}></div>
          <div className={`h-4 w-48 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`max-w-6xl mx-auto p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Link 
          to="/dashboard/apply" 
          className={`inline-flex items-center mb-6 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all jobs
        </Link>
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'}`}>
          <h2 className="text-xl font-bold">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} pb-12`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button with better spacing */}
        <div className="pt-6">
          <Link 
            to="/dashboard/apply" 
            className={`inline-flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all jobs
          </Link>
        </div>

        {/* Modern job header with gradient overlay */}
        <div className="relative mt-6 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={Hero} 
            alt="Job Hero" 
            className="w-full h-64 object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className={`text-3xl sm:text-4xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>
              {job?.title}
            </h1>
            <div className="flex items-center mt-2 mb-6">
              <FiMapPin className={`mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-200'}`} />
              <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                {job?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Job details card - modern glass morphism effect */}
        <div className={`relative -mt-10 mx-4 rounded-xl shadow-xl ${darkMode ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700' : 'bg-white/90 backdrop-blur-sm border border-gray-200'} p-6 sm:p-8`}>
          {/* Job meta information */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <FiDollarSign className={`mr-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Salary</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {job?.salary || "Not disclosed"}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <MdWorkOutline className={`mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Experience</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {job?.experience || "Not specified"}
                </p>
              </div>
            </div>
            
            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
              <FiClock className={`mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Posted</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {new Date(job?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Job details sections */}
          <div className="space-y-6">
            <div>
              <h2 className={`flex items-center text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <MdDescription className="mr-2" /> Description
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {job?.description || "No description available"}
              </p>
            </div>

            <div>
              <h2 className={`flex items-center text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <FiBook className="mr-2" /> Summary
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                {job?.category || "Not specified"}
              </p>
            </div>

            <div>
              <h2 className={`flex items-center text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <FiAward className="mr-2" /> Requirements
              </h2>
              <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {job?.requirements?.length > 0 ? (
                  job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{req}</span>
                    </li>
                  ))
                ) : (
                  <li>No specific requirements listed</li>
                )}
              </ul>
            </div>

            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/30 border border-gray-600' : 'bg-blue-50 border border-blue-100'}`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-gray-600' : 'bg-blue-100'}`}>
                  <FiAward className={`text-lg ${darkMode ? 'text-yellow-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Exam Status
                  </h3>
                  <p className={`text-sm ${job?.examSet ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-red-400' : 'text-red-600')}`}>
                    {job?.examSet ? 'Exam available for this position' : 'No exam set for this position yet'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Apply button - sticky at bottom on mobile */}
          {loggedUser?.role === 'jobseeker' && (
            <div className="sticky bottom-6 mt-8 flex justify-end">
              <button 
                onClick={applyForJob}
                disabled={!job?.examSet}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center shadow-lg
                  ${job?.examSet 
                    ? `${darkMode ? 'bg-[#EF9273] hover:bg-[#C35029] text-white' : 'bg-[#C35029] hover:bg-[#EF9273] text-white'}`
                    : `${darkMode ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`
                  }`}
              >
                {job?.examSet ? (
                  <>
                    <span>Apply Now</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                ) : (
                  "Application Unavailable"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

