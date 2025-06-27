import React, { useState, useEffect } from "react";
import axios from "axios";
import search from "../../../assets/images/search-svgrepo-com.svg";
import location from "../../../assets/images/location-pin-svgrepo-com.svg";
import transcription from "../../../assets/images/transcription.svg";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../utils/axiosInstance";
import { FiX } from "react-icons/fi";
import Swal from 'sweetalert2';
import useUser from "../../../hooks/useUser";

function isImage(filename) {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const extension = filename.split(".").pop().toLowerCase();

  return imageExtensions.includes(extension);
}

const Modal = ({ onClose, onSave, handleSetExam }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""], answer: '' }]);
  const letters= ['A', 'B', 'C', 'D'];

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
      setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: '' }]);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const saveQuestions = () => {
    onSave(questions); // Pass questions to parent component
    handleSetExam(questions);
  };

return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg relative shadow-2xl max-w-lg w-full">
      <button
        className="absolute top-3 right-3 text-black text-2xl bg-red-500 w-10 h-10 flex justify-center items-center"
        onClick={onClose}
      >
        <FiX color="white"/>
      </button>
      <h2 className="text-2xl font-bold mb-4">Set MCQ Questions</h2>

      <div className="mb-4">
        <label className="block font-semibold">Question {currentQuestion}</label>
        <input
          type="text"
          value={questions[currentQuestion - 1]?.question || ""}
          onChange={handleQuestionChange}
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
          placeholder="Enter your question"
        />
        <div>
          {questions[currentQuestion - 1]?.options.map((option, i) => (
            <div key={i} className="mb-2">
              <label className="block text-gray-700">{letters[i]}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, i)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder={`Option ${i + 1}`}
              /> 
            </div>
          ))}
          <div>
                <label>Correct Answer</label> <br />
                <select
                value={questions[currentQuestion - 1]?.answer}
                onChange={(e) => {
                  const temp = [...questions];
                  temp[currentQuestion - 1].answer = e.target.value;
                  setQuestions([...questions])
                }}
                className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  {letters.map((letter)=> (
                    <option key={letter}>{letter}</option>
                  ))}
                </select>
              </div>
          
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 1}
          className={`px-4 py-2 bg-gray-400 text-white rounded-lg ${currentQuestion === 1 && "opacity-50 cursor-not-allowed"}`}
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={saveQuestions}
          className="w-full py-2 bg-green-500 text-white rounded-lg"
        >
          Save Exam
        </button>
      </div>
    </div>
  </div>
);
};

// Pagination Controls Component
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border border-gray-300 rounded-md bg-white"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border border-gray-300 rounded-md bg-white"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

// Job Card Component
const JobCard = ({ job, index, loggedUser }) => {
  const [questions, setQuestions] = useState([]);

  const openModal = () => setShowModal(true);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const [step, setStep] = useState(1);

  let image = null;
  job?.files?.forEach((filename) => {
    if (filename && isImage(filename)) {
      image = filename;
    }
  });

  const navigate = useNavigate();

  const handleApplyClick = () => {
    const path = `job/${job?._id}`;
    // Navigate to the job details page
    navigate(path, { state: job });
  };

  const saveQuestions=(questions)=>{
    setQuestions([...questions])
  }

  const handleSetExam = async (questions) => {
    let formattedQuestions = questions.map((item)=> {
      let obj = {};
      obj['question'] = item?.question;
      obj['answer'] = item?.answer;
      item?.options.forEach((option, index)=>{
        obj['option'+(index+1)] = option;
      })

      return obj;
    })  

    try{
      const response = await axiosInstance.post("/api/exam", {
        job,
        questions: formattedQuestions
      })
      if(response?.data){
        Swal.fire("Success!","Questions added to this job ", "success");
      }else{
        Swal.fire("Error!", "Couldnt add questions try again.", "error");
      }
    }catch(err){
      console.log('error: ', err)
      Swal.fire("Error!", "Couldn't add questions try again.", "error");
    }finally{
      closeModal();
    }
    
  };


  return (
    <li className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src={transcription} alt="Company Logo" className="h-12 w-12" />
        <div>
          <h3 className="font-bold">{job.title}</h3>
          <p className="text-gray-600">{job.location}</p>
          <div className="flex space-x-2 mt-1">
            {/* Ensure categories exist before mapping */}
            {job.category &&
            Array.isArray(job.category) &&
            job.category.length > 0 ? (
              job.category.map((cat, index) => (
                <span
                  key={index}
                  className={`bg-${cat.color}-100 text-${cat.color}-500 px-2 py-1 rounded-full`}
                >
                  {cat.label}
                </span>
              ))
            ) : (
              <span>{job?.category ?? "No categories"}</span>
            )}
          </div>
        </div>
      </div>
       <div>
        <button
          onClick={handleApplyClick}
          className="bg-[rgba(239,146,115,1)] text-white px-4 py-2 mx-2 rounded-md"
        >
          {loggedUser?.role === 'jobseeker' ? 'Apply' : 'View Details'}
        </button>
        {!job?.examSet && loggedUser?.role === 'recruiter' &&
        <button
          onClick={() => {
            openModal();
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition"
        >
          Set Exam
        </button>
        }
      </div>
      {showModal && <Modal onClose={closeModal} onSave={saveQuestions} handleSetExam={handleSetExam} />}
    </li>
  );
};

// Apply Component
export const Apply = () => {
  const [jobs, setJobs] = useState([]); // Job listings state
  const [currentPage, setCurrentPage] = useState(1); // Current page state for pagination
  const jobsPerPage = 6; // Number of jobs displayed per page
  const loggedUser = useUser();
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    location: "",
    type: [],
    category: [],
    experience: [],
  });

  useEffect(() => {
    // Fetch jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/api/jobs");
        sessionStorage.setItem("jobList", JSON.stringify(response.data));
        let storedUser = sessionStorage.getItem("user");
        if (storedUser) {
          storedUser = JSON.parse(storedUser);
        }
        const filteredJobs = response.data?.filter(
          (job) => job?.userId === storedUser?._id
        );
        setJobs(
          storedUser?.role === "recruiter"
            ? [...filteredJobs]
            : [...response?.data]
        );
        setFilteredJobs(
          storedUser?.role === "recruiter"
            ? [...filteredJobs]
            : [...response?.data]
        );
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Filtering function
  useEffect(() => {
    const filterJobs = () => {
      let updatedJobs = [...jobs];

      if (searchOptions.title) {
        updatedJobs = updatedJobs.filter((job) =>
          job.title.toLowerCase().includes(searchOptions.title.toLowerCase())
        );
      }

      if (searchOptions.location) {
        updatedJobs = updatedJobs.filter((job) =>
          job.location.toLowerCase().includes(searchOptions.location.toLowerCase())
        );
      }

      // Add more filters based on category, type, experience if necessary
      // Example for category:
      if (searchOptions.category.length > 0) {
        updatedJobs = updatedJobs.filter((job) =>
          searchOptions.category.includes(job.category)
        );
      }

      setFilteredJobs(updatedJobs);
    };

    filterJobs();
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

  // Update search options as users type
  const handleSearchChange = (e) => {
    setSearchOptions({
      ...searchOptions,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50 h-full overflow-auto">
      <main className="max-w-6xl mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold mb-4">
          Discover more than{" "}
          <span className="text-[rgba(239,146,115,1)]">
            4000+ Translation and Transcription Jobs
          </span>
        </h1>

        {/* Search and Filter Section */}
        <div className="mt-8 bg-white flex flex-row w-full max-w-4xl h-[72px] justify-evenly">
          <div className="flex mt-2 gap-4">
            <img
              style={{ width: "41px", height: "41px" }}
              src={search}
              alt="Search Icon"
            />
            <input
              className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
              type="text"
              placeholder="Job title or keyword"
              name="title"
              value={searchOptions.title}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex mt-2 gap-4">
            <img
              style={{ width: "41px", height: "41px" }}
              src={location}
              alt="Location Icon"
            />
            <input
              className="bg-white h-1/2 w-full mt-1 focus:outline-none border-b-2 border-[#BEBEBE]"
              type="text"
              placeholder="Location"
              name="location"
              value={searchOptions.location}
              onChange={handleSearchChange}
            />
          </div>
          <button className="bg-[rgba(239,146,115,1)] text-white mt-3 px-4 py-2">
            Search my job
          </button>
          {loggedUser?.role !== "jobseeker" && (
            <Link to={"/dashboard/createjob"}>
              <button className="bg-[rgba(239,146,115,1)] text-white mt-3 px-4 py-2">
                Create New Job
              </button>
            </Link>
          )}
        </div>

        {/* Main Job Listing Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {/* Sidebar Section */}

          {/* Job Cards Section */}
          <section className="col-span-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Jobs</h2>
            </div>

            {/* List of Job Cards */}
            <ul className="space-y-4">
              {currentJobs.map((job, index) => (
                <JobCard
                  key={index}
                  job={job}
                  index={index + 1}
                  loggedUser={loggedUser}
                />
              ))}
            </ul>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Apply;
