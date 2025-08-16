// import React, { useEffect, useState } from 'react';
// import { FaBook, FaUpload } from 'react-icons/fa';
// import { MdVideoLibrary } from 'react-icons/md';
// import { useDropzone } from 'react-dropzone';
// import Swal from 'sweetalert2';
// import { useParams, useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../../utils/axiosInstance';
// import useUser from '../../../hooks/useUser';

// const QuizApp = () => {
//   const navigate = useNavigate();
//   const {id} = useParams();
//   const [job, setJob] = useState([]);
//   const [loading, setLoading] = useState(false)
//   const user = useUser();
//   const [motivation, setMotivation] = useState('')
//   const [quizData, setQuizData] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [score, setScore] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [videoFile, setVideoFile] = useState(null);

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const handleNextQuestion = () => {
//     if (selectedOption === quizData[currentQuestionIndex].answer) {
//       setScore(score + 1);
//     }

//     setSelectedOption("");
//     if (currentQuestionIndex < quizData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setSelectedOption("");
//     setIsSubmitted(false);
//     setVideoFile(null); // Reset video file on retake
//   };

//   // Drag and drop functionality
//   const onDrop = (acceptedFiles) => {
//     setVideoFile(acceptedFiles[0]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   const formatQuiz=(questions)=>{

//     let tempArr = questions.map((item)=> {
//       const answers = {
//         'A': 0,
//         'B': 1,
//         'C': 2,
//         'D': 3
//       }
//       const options = [item?.option1, item?.option2,item?.option3,item?.option4]
//       return {
//         question: item?.question,
//         options,
//         answer: options[answers[item?.answer]]
//       }
//     })

//     setQuizData([...tempArr])
//   }

//   useEffect(()=>{
//     const selectedJob = sessionStorage.getItem('selectedJob');
//     if(selectedJob){
//       setJob(JSON.parse(selectedJob));
//     }
//     formatQuiz(JSON.parse(selectedJob)?.exam[0]?.questions)
//   }, [])

//   const submitExam = async ()=>{
//     setLoading(true)
//     if(!motivation){
//       Swal.fire({
//         title: 'Submit Exam',
//         text: 'Sorry can\'t submit all required data must be submitted',
//         icon: 'error',
//         confirmButtonText: 'OK'
//       }).then(() => {
//         return;
//       });
//       setLoading(false)
//     }else{
//       const formData = new FormData();
//       formData.append('job', id);
//       formData.append('user', user?._id);
//       formData.append('score', `${score} / ${quizData.length}`);
//       formData.append('motivation', motivation);
//       formData.append('files', videoFile);

//       try{
//         const response = await axiosInstance.post('/api/applications',formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           }
//         });
//         if(response.status == 201 || response.status == 200){
//           Swal.fire({
//             title: 'Submit Exam',
//             text: `Applied successfully to job ${job?.title} `,
//             icon: 'success',
//             confirmButtonText: 'OK'
//           }).then(() => {
//             navigate('/dashboard/apply')
//           });
//         }

//       }catch(err){
//         Swal.fire({
//           title: 'Submit Exam',
//           text: 'An error occured while submitting try re-submitting  and make sure you haven\'t applied already',
//           icon: 'error',
//           confirmButtonText: 'OK'
//         }).then(() => {
//           return;
//         });
//       }finally{
//         setLoading(false)
//       }
//     }
//   }



//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-evenly bg-gray-100">
//       <div className='w-11/12 flex items-center'>
//         <FaBook size={32} className='text-primary ml-2' />
//         <h1 className='text-[42px] font-bolder text-primary py-[-6px] float-left'>Take Test</h1>
//       </div>

//       <div className='w-11/12 h-3/4 bg-primary flex justify-around items-center rounded'>
//         <div className="w-[30%] bg-[#FEF9F8] h-[90%] p-8 rounded-lg shadow-lg">
//           {!isSubmitted ? (
//             <>
//               <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                 Question {currentQuestionIndex + 1} / {quizData.length}
//               </h1>
//               <p className="text-lg mb-4">{quizData[currentQuestionIndex]?.question}</p>

//               <div className="space-y-4">
//                 {quizData[currentQuestionIndex]?.options?.map((option, index) => (
//                   <label key={index} className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       value={option}
//                       checked={selectedOption === option}
//                       onChange={handleOptionChange}
//                       className="form-radio h-5 w-5 text-orange-500"
//                     />
//                     <span className="text-gray-800">{option}</span>
//                   </label>
//                 ))}
//               </div>

//               <div className="flex justify-between h-1/3 items-end ">
//                 <button
//                   onClick={handlePrevQuestion}
//                   className={`bg-gray-400 text-white py-2 px-4 rounded-lg shadow ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'}`}
//                   disabled={currentQuestionIndex === 0}
//                 >
//                   Previous
//                 </button>

//                 <button
//                   onClick={handleNextQuestion}
//                   className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow hover:bg-orange-600"
//                   disabled={!selectedOption}
//                 >
//                   {currentQuestionIndex === quizData.length - 1 ? 'Submit' : 'Next'}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
//               <p className="mt-4 text-lg">Your Score: {score} / {quizData.length}</p>
//               <button
//                 onClick={resetQuiz}
//                 className="mt-6 w-full bg-orange-500 text-white py-2 px-4 rounded-lg shadow hover:bg-orange-600"
//               >
//                 Retake Quiz
//               </button>
//             </div>
//           )}
//         </div>
//         <div className='part2 w-[30%] bg-[#FEF9F8] h-[90%] p-8 rounded-lg shadow-lg flex flex-col justify-between items-center'>
//           <h2 className='text-lg'>Tell me about you? We need a full description of you and why you're fit for the job in textual form in the language of the job</h2>
//           <span className='self-end text-red-500 text-2xl'>*</span>
//           <textarea value={motivation} onChange={(e)=> setMotivation(e.target.value)} className='w-[98%] h-[400px] p-2 border border-gray-300 rounded border-dashed'/>
//         </div>
//         <div className='part3 w-[30%] bg-[#FEF9F8] h-[90%] p-8 rounded-lg shadow-lg flex flex-col'>
//           <span className='text-lg text-center py-4'>Upload a video of yourself giving your motivations in the language of the job</span>
//           <p className='self-end text-red-500 text-2xl float-right mt-4'>*</p>
//           <div {...getRootProps()} className='border-[#BEBEBE] border-dashed border-2 h-[400px] flex flex-col items-center justify-center'>
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p className='text-gray-500'>Drop the video file here...</p>
//             ) : (
//               <>
//                 <MdVideoLibrary size={32} />
//                 <button className="w-1/2 bg-orange-500 text-white py-2 px-4 rounded-lg shadow hover:bg-orange-600">Upload Video</button>
//                 <p className='text-gray-500'>Drag & drop your video here, or click to select file</p>
//               </>
//             )}
//             {videoFile && <p className='mt-2'>Uploaded: {videoFile.name}</p>}
//           </div>
//         </div>
//       </div>

//       <button onClick={()=> submitExam()} className={`flex self-end mr-16 ${loading ? 'bg-gray-500': 'bg-orange-500'} text-white py-2 px-4 rounded-lg shadow ${!loading && 'hover:bg-orange-600'}`}>{loading ? 'Submittig': 'Submit Test'}</button>
//     </div>
//   );
// };

// export default QuizApp;















































// import React, { useEffect, useState } from 'react';
// import { FaBook, FaUpload, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
// import { MdVideoLibrary, MdOutlineDescription } from 'react-icons/md';
// import { RiQuestionAnswerFill } from 'react-icons/ri';
// import { useDropzone } from 'react-dropzone';
// import Swal from 'sweetalert2';
// import { useParams, useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../../../utils/axiosInstance';
// import useUser from '../../../hooks/useUser';

// const QuizApp = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [job, setJob] = useState({});
//   const [loading, setLoading] = useState(false);
//   const user = useUser();
//   const [motivation, setMotivation] = useState('');
//   const [quizData, setQuizData] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState("");
//   const [score, setScore] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [videoFile, setVideoFile] = useState(null);
//   const [progress, setProgress] = useState(0);

//   // Enhanced quiz navigation with progress tracking
//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//     setProgress(((currentQuestionIndex + 1) / quizData.length) * 100);
//   };

//   const handleNextQuestion = () => {
//     if (selectedOption === quizData[currentQuestionIndex]?.answer) {
//       setScore(score + 1);
//     }
//     setSelectedOption("");
//     if (currentQuestionIndex < quizData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setProgress(((currentQuestionIndex + 2) / quizData.length) * 100);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setProgress((currentQuestionIndex / quizData.length) * 100);
//     }
//   };

//   const resetQuiz = () => {
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setSelectedOption("");
//     setIsSubmitted(false);
//     setVideoFile(null);
//     setProgress(0);
//   };

//   // Premium dropzone with file preview
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       if (acceptedFiles[0]?.size > 50 * 1024 * 1024) {
//         Swal.fire({
//           title: 'File Too Large',
//           text: 'Maximum file size is 50MB',
//           icon: 'error',
//           background: darkMode ? '#1f2937' : '#fff',
//           color: darkMode ? '#fff' : '#000'
//         });
//         return;
//       }
//       setVideoFile(acceptedFiles[0]);
//     },
//     accept: {
//       'video/*': ['.mp4', '.mov', '.avi']
//     },
//     maxFiles: 1
//   });

//   const formatQuiz = (questions) => {
//     const tempArr = questions?.map((item) => {
//       const answers = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
//       const options = [item?.option1, item?.option2, item?.option3, item?.option4];
//       return {
//         question: item?.question,
//         options,
//         answer: options[answers[item?.answer]]
//       };
//     });
//     setQuizData(tempArr || []);
//   };

//   useEffect(() => {
//     const selectedJob = sessionStorage.getItem('selectedJob');
//     if (selectedJob) {
//       const jobData = JSON.parse(selectedJob);
//       setJob(jobData);
//       formatQuiz(jobData?.exam[0]?.questions);
//       setProgress((1 / (jobData?.exam[0]?.questions?.length || 1)) * 100);
//     }
//   }, []);

//   const submitExam = async () => {
//     if (!motivation || !videoFile) {
//       Swal.fire({
//         title: 'Incomplete Application',
//         text: 'Please complete all required fields before submitting',
//         icon: 'warning',
//         confirmButtonText: 'OK',
//         background: darkMode ? 'bg-gray-800' : 'bg-white',
//         color: darkMode ? 'text-white' : 'text-gray-800'
//       });
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('job', id);
//     formData.append('user', user?._id);
//     formData.append('score', `${score} / ${quizData.length}`);
//     formData.append('motivation', motivation);
//     formData.append('files', videoFile);

//     try {
//       const response = await axiosInstance.post('/api/applications', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setProgress(percentCompleted);
//         }
//       });
      
//       if (response.status === 201 || response.status === 200) {
//         await Swal.fire({
//           title: 'Success!',
//           text: `Your application for ${job?.title} has been submitted`,
//           icon: 'success',
//           confirmButtonText: 'View Applications',
//           background: darkMode ? 'bg-gray-800' : 'bg-white',
//           color: darkMode ? 'text-white' : 'text-gray-800'
//         });
//         navigate('/dashboard/apply');
//       }
//     } catch (err) {
//       Swal.fire({
//         title: 'Submission Error',
//         text: err.response?.data?.message || 'An error occurred. Please try again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//         background: darkMode ? 'bg-gray-800' : 'bg-white',
//         color: darkMode ? 'text-white' : 'text-gray-800'
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // UI Components with your color scheme
//   const ProgressBar = ({ value }) => (
//     <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
//       <div 
//         className="h-full rounded-full bg-[#EF9273]" 
//         style={{ width: `${value}%` }}
//       ></div>
//     </div>
//   );

//   const SectionHeader = ({ icon, title, required = false }) => (
//     <div className="flex items-center mb-4">
//       <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
//         {React.cloneElement(icon, { className: 'text-xl text-[#C35029]' })}
//       </div>
//       <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//         {title}
//         {required && <span className="text-red-500 ml-2 text-sm">* Required</span>}
//       </h2>
//     </div>
//   );

//   return (
//     <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FEF9F8] text-gray-800'}`}>
//       {/* Application Header */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold flex items-center">
//               <FaBook className="mr-3 text-[#C35029]" />
//               {job?.title || 'Job Application'}
//             </h1>
//             <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Complete your application by following these steps
//             </p>
//           </div>
//           <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
//             <span className="font-medium">Score: </span>
//             <span className="text-[#C35029]">{score}/{quizData.length}</span>
//           </div>
//         </div>

//         {/* Progress Indicator */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Application Progress</span>
//             <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{Math.round(progress)}%</span>
//           </div>
//           <ProgressBar value={progress} />
//         </div>

//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Quiz Section */}
//           <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="p-6">
//               <SectionHeader icon={<RiQuestionAnswerFill />} title="Assessment Questions" />
              
//               {!isSubmitted ? (
//                 <>
//                   <div className="mb-6">
//                     <div className="flex justify-between items-center mb-2">
//                       <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//                         Question {currentQuestionIndex + 1} of {quizData.length}
//                       </span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
//                         {Math.round(((currentQuestionIndex + 1) / quizData.length) * 100)}% Complete
//                       </span>
//                     </div>
//                     <ProgressBar value={((currentQuestionIndex + 1) / quizData.length) * 100} />
//                   </div>

//                   <div className="space-y-6">
//                     <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//                       {quizData[currentQuestionIndex]?.question}
//                     </p>
                    
//                     <div className="space-y-3">
//                       {quizData[currentQuestionIndex]?.options?.map((option, index) => (
//                         <label 
//                           key={index} 
//                           className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
//                             selectedOption === option
//                               ? 'ring-2 ring-[#C35029] bg-[#EF9273]/10'
//                               : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#FEF9F8]'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             value={option}
//                             checked={selectedOption === option}
//                             onChange={handleOptionChange}
//                             className={`h-5 w-5 text-[#C35029] focus:ring-0`}
//                           />
//                           <span className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{option}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-between mt-8">
//                     <button
//                       onClick={handlePrevQuestion}
//                       disabled={currentQuestionIndex === 0}
//                       className={`flex items-center px-4 py-2 rounded-lg ${
//                         currentQuestionIndex === 0
//                           ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
//                           : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#FEF9F8] hover:bg-gray-100'}`
//                       }`}
//                     >
//                       Previous
//                     </button>

//                     <button
//                       onClick={handleNextQuestion}
//                       disabled={!selectedOption}
//                       className={`flex items-center px-4 py-2 rounded-lg text-white ${
//                         !selectedOption
//                           ? 'bg-[#EF9273] cursor-not-allowed'
//                           : 'bg-[#C35029] hover:bg-[#EF9273]'
//                       }`}
//                     >
//                       {currentQuestionIndex === quizData.length - 1 ? 'Complete Assessment' : 'Next Question'}
//                       <FaArrowRight className="ml-2" />
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex flex-col items-center justify-center py-8 text-center">
//                   <div className={`p-4 rounded-full mb-4 ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
//                     <FaCheck className="text-3xl text-[#C35029]" />
//                   </div>
//                   <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Assessment Complete!</h2>
//                   <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your score: {score}/{quizData.length}</p>
//                   <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mb-6`}>
//                     <div 
//                       className="bg-[#EF9273] h-2.5 rounded-full" 
//                       style={{ width: `${(score / quizData.length) * 100}%` }}
//                     ></div>
//                   </div>
//                   <button
//                     onClick={resetQuiz}
//                     // className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#FEF9F8] hover:bg-gray-100'}`}
//                      className="px-8 py-3 rounded-lg bg-[#C35029] hover:bg-[#EF9273] text-white text-lg font-medium transition-colors"
//                   >
//                     Retake Assessment
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Motivation Section */}
//           <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="p-6">
//               <SectionHeader icon={<MdOutlineDescription />} title="Motivation Letter" required />
              
//               <div className="mb-4">
//                 <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Tell us why you're the perfect candidate for this position (in {job?.language || 'the required language'}):
//                 </p>
//                 <textarea
//                   value={motivation}
//                   onChange={(e) => setMotivation(e.target.value)}
//                   className={`w-full h-64 p-4 rounded-lg border ${
//                     darkMode ? 'bg-gray-700 border-gray-600 focus:border-[#C35029]' : 'bg-white border-gray-300 focus:border-[#C35029]'
//                   } focus:ring-2 focus:ring-[#EF9273]/50 resize-none`}
//                   placeholder="I'm excited to apply for this position because..."
//                 />
//                 <div className={`flex justify-between mt-2 text-xs ${
//                   motivation.length > 1800 ? 'text-red-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')
//                 }`}>
//                   <span>{motivation.length}/2000 characters</span>
//                   <span>{2000 - motivation.length} remaining</span>
//                 </div>
//               </div>

//               <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
//                 <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tips for a great motivation letter:</h3>
//                 <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                   <li>Keep it concise (200-500 words ideal)</li>
//                   <li>Highlight relevant experience</li>
//                   <li>Show passion for the language</li>
//                   <li>Proofread for errors</li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Video Upload Section */}
//           <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//             <div className="p-6">
//               <SectionHeader icon={<MdVideoLibrary />} title="Video Introduction" required />
              
//               <div className="mb-4">
//                 <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Record a 1-2 minute video introducing yourself in {job?.language || 'the required language'}:
//                 </p>
                
//                 <div
//                   {...getRootProps()}
//                   className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg ${
//                     isDragActive
//                       ? `${darkMode ? 'border-[#C35029] bg-[#EF9273]/10' : 'border-[#C35029] bg-[#FEF9F8]'}`
//                       : `${darkMode ? 'border-gray-700 hover:border-[#C35029]' : 'border-gray-300 hover:border-[#C35029]'}`
//                   } transition-all cursor-pointer`}
//                 >
//                   <input {...getInputProps()} />
//                   {videoFile ? (
//                     <div className="text-center">
//                       <div className="relative inline-block">
//                         <MdVideoLibrary className="text-5xl text-[#C35029] mb-3" />
//                         <button 
//                           onClick={(e) => { e.stopPropagation(); setVideoFile(null); }}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
//                         >
//                           <FaTimes className="text-xs" />
//                         </button>
//                       </div>
//                       <p className={`font-medium truncate max-w-full ${darkMode ? 'text-white' : 'text-gray-800'}`}>{videoFile.name}</p>
//                       <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
//                       </p>
//                       <button 
//                         className={`mt-4 px-4 py-2 rounded-lg ${
//                           darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#FEF9F8] hover:bg-gray-100'
//                         }`}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         Change Video
//                       </button>
//                     </div>
//                   ) : (
//                     <>
//                       <MdVideoLibrary className={`text-5xl mb-3 ${
//                         isDragActive ? 'text-[#C35029]' : (darkMode ? 'text-gray-500' : 'text-gray-400')
//                       }`} />
//                       <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
//                         {isDragActive ? 'Drop your video here' : 'Drag & drop video here'}
//                       </p>
//                       <p className={`text-sm mb-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         or click to browse files<br />
//                         <span className="text-xs">(MP4, MOV, or AVI - Max 50MB)</span>
//                       </p>
//                       <button 
//                         className={`px-4 py-2 rounded-lg bg-[#C35029] hover:bg-[#EF9273] text-white`}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         Select Video File
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
//                 <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Video Guidelines:</h3>
//                 <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
//                   <li>Speak clearly in {job?.language || 'the required language'}</li>
//                   <li>Dress professionally</li>
//                   <li>Good lighting and audio quality</li>
//                   <li>1-2 minutes in length</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submission Section */}
//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={submitExam}
//             disabled={loading || !motivation || !videoFile || !isSubmitted}
//             className={`px-8 py-3 rounded-lg font-medium flex items-center ${
//               loading || !motivation || !videoFile || !isSubmitted
//                 ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
//                 : 'bg-[#C35029] hover:bg-[#EF9273] text-white shadow-lg'
//             } transition-all`}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Submitting...
//               </>
//             ) : (
//               'Submit Application'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizApp;












































import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaBook, FaUpload, FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { MdVideoLibrary, MdOutlineDescription } from 'react-icons/md';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../../utils/axiosInstance';
import useUser from '../../../hooks/useUser';

const QuizApp = ({ darkMode }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Now gets the job ID from the route
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const [motivation, setMotivation] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);

  // Enhanced quiz navigation with progress tracking
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setProgress(((currentQuestionIndex + 1) / quizData.length) * 100);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestionIndex]?.answer) {
      setScore(score + 1);
    }
    setSelectedOption("");
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setProgress(((currentQuestionIndex + 2) / quizData.length) * 100);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setProgress((currentQuestionIndex / quizData.length) * 100);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption("");
    setIsSubmitted(false);
    setVideoFile(null);
    setProgress(0);
  };

  // Premium dropzone with file preview
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]?.size > 50 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Maximum file size is 50MB',
          icon: 'error',
          background: darkMode ? '#1f2937' : '#fff',
          color: darkMode ? '#fff' : '#000'
        });
        return;
      }
      setVideoFile(acceptedFiles[0]);
    },
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const formatQuiz = (questions) => {
    const tempArr = questions?.map((item) => {
      const answers = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
      const options = [item?.option1, item?.option2, item?.option3, item?.option4];
      return {
        question: item?.question,
        options,
        answer: options[answers[item?.answer]]
      };
    });
    setQuizData(tempArr || []);
  };

  useEffect(() => {
    const selectedJob = sessionStorage.getItem('selectedJob');
    if (selectedJob) {
      const jobData = JSON.parse(selectedJob);
      setJob(jobData);
      formatQuiz(jobData?.exam[0]?.questions);
      setProgress((1 / (jobData?.exam[0]?.questions?.length || 1)) * 100);
    }
  }, [id]); // Add id to dependency array to reload if it changes

  const submitExam = async () => {
    if (!motivation || !videoFile) {
      Swal.fire({
        title: 'Incomplete Application',
        text: 'Please complete all required fields before submitting',
        icon: 'warning',
        confirmButtonText: 'OK',
        background: darkMode ? 'bg-gray-800' : 'bg-white',
        color: darkMode ? 'text-white' : 'text-gray-800'
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('job', id); // Using the id from route params
    formData.append('user', user?._id);
    formData.append('score', `${score} / ${quizData.length}`);
    formData.append('motivation', motivation);
    formData.append('files', videoFile);

    try {
      const response = await axiosInstance.post('/api/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });
      
      if (response.status === 201 || response.status === 200) {
        await Swal.fire({
          title: 'Success!',
          text: `Your application for ${job?.title} has been submitted`,
          icon: 'success',
          confirmButtonText: 'View Applications',
          background: darkMode ? 'bg-gray-800' : 'bg-white',
          color: darkMode ? 'text-white' : 'text-gray-800'
        });
        navigate('/dashboard/apply');
      }
    } catch (err) {
      Swal.fire({
        title: 'Submission Error',
        text: err.response?.data?.message || 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        background: darkMode ? 'bg-gray-800' : 'bg-white',
        color: darkMode ? 'text-white' : 'text-gray-800'
      });
    } finally {
      setLoading(false);
    }
  };

  // UI Components with your color scheme
  const ProgressBar = ({ value }) => (
    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
      <div 
        className="h-full rounded-full bg-[#EF9273]" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  const SectionHeader = ({ icon, title, required = false }) => (
    <div className="flex items-center mb-4">
      <div className={`p-2 rounded-lg mr-3 ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
        {React.cloneElement(icon, { className: 'text-xl text-[#C35029]' })}
      </div>
      <h2 className={`text-xl font-semibold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        {title}
        {required && <span className="text-red-500 ml-2 text-sm">* Required</span>}
      </h2>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FEF9F8] text-gray-800'}`}>
      {/* Application Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <FaBook className="mr-3 text-[#C35029]" />
              {job?.title || 'Job Application'}
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Complete your application by following these steps
            </p>
          </div>
          <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
            <span className="font-medium">Score: </span>
            <span className="text-[#C35029]">{score}/{quizData.length}</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Application Progress</span>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{Math.round(progress)}%</span>
          </div>
          <ProgressBar value={progress} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quiz Section */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <SectionHeader icon={<RiQuestionAnswerFill />} title="Assessment Questions" />
              
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Question {currentQuestionIndex + 1} of {quizData.length}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
                        {Math.round(((currentQuestionIndex + 1) / quizData.length) * 100)}% Complete
                      </span>
                    </div>
                    <ProgressBar value={((currentQuestionIndex + 1) / quizData.length) * 100} />
                  </div>

                  <div className="space-y-6">
                    <p className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {quizData[currentQuestionIndex]?.question}
                    </p>
                    
                    <div className="space-y-3">
                      {quizData[currentQuestionIndex]?.options?.map((option, index) => (
                        <label 
                          key={index} 
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                            selectedOption === option
                              ? 'ring-2 ring-[#C35029] bg-[#EF9273]/10'
                              : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#FEF9F8]'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`
                          }`}
                        >
                          <input
                            type="radio"
                            value={option}
                            checked={selectedOption === option}
                            onChange={handleOptionChange}
                            className={`h-5 w-5 text-[#C35029] focus:ring-0`}
                          />
                          <span className={`ml-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        currentQuestionIndex === 0
                          ? `${darkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-400'} cursor-not-allowed`
                          : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#FEF9F8] hover:bg-gray-100'}`
                      }`}
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedOption}
                      className={`flex items-center px-4 py-2 rounded-lg text-white ${
                        !selectedOption
                          ? 'bg-[#EF9273] cursor-not-allowed'
                          : 'bg-[#C35029] hover:bg-[#EF9273]'
                      }`}
                    >
                      {currentQuestionIndex === quizData.length - 1 ? 'Complete Assessment' : 'Next Question'}
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className={`p-4 rounded-full mb-4 ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
                    <FaCheck className="text-3xl text-[#C35029]" />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Assessment Complete!</h2>
                  <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your score: {score}/{quizData.length}</p>
                  <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2.5 mb-6`}>
                    <div 
                      className="bg-[#EF9273] h-2.5 rounded-full" 
                      style={{ width: `${(score / quizData.length) * 100}%` }}
                    ></div>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-3 rounded-lg bg-[#C35029] hover:bg-[#EF9273] text-white text-lg font-medium transition-colors"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Motivation Section */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <SectionHeader icon={<MdOutlineDescription />} title="Motivation Letter" required />
              
              <div className="mb-4">
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tell us why you're the perfect candidate for this position (in {job?.language || 'the required language'}):
                </p>
                <textarea
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  className={`w-full h-64 p-4 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600 focus:border-[#C35029]' : 'bg-white border-gray-300 focus:border-[#C35029]'
                  } focus:ring-2 focus:ring-[#EF9273]/50 resize-none`}
                  placeholder="I'm excited to apply for this position because..."
                />
                <div className={`flex justify-between mt-2 text-xs ${
                  motivation.length > 1800 ? 'text-red-500' : (darkMode ? 'text-gray-400' : 'text-gray-500')
                }`}>
                  <span>{motivation.length}/2000 characters</span>
                  <span>{2000 - motivation.length} remaining</span>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Tips for a great motivation letter:</h3>
                <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>Keep it concise (200-500 words ideal)</li>
                  <li>Highlight relevant experience</li>
                  <li>Show passion for the language</li>
                  <li>Proofread for errors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-6">
              <SectionHeader icon={<MdVideoLibrary />} title="Video Introduction" required />
              
              <div className="mb-4">
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Record a 1-2 minute video introducing yourself in {job?.language || 'the required language'}:
                </p>
                
                <div
                  {...getRootProps()}
                  className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg ${
                    isDragActive
                      ? `${darkMode ? 'border-[#C35029] bg-[#EF9273]/10' : 'border-[#C35029] bg-[#FEF9F8]'}`
                      : `${darkMode ? 'border-gray-700 hover:border-[#C35029]' : 'border-gray-300 hover:border-[#C35029]'}`
                  } transition-all cursor-pointer`}
                >
                  <input {...getInputProps()} />
                  {videoFile ? (
                    <div className="text-center">
                      <div className="relative inline-block">
                        <MdVideoLibrary className="text-5xl text-[#C35029] mb-3" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); setVideoFile(null); }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                      <p className={`font-medium truncate max-w-full ${darkMode ? 'text-white' : 'text-gray-800'}`}>{videoFile.name}</p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <button 
                        className={`mt-4 px-4 py-2 rounded-lg ${
                          darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-[#FEF9F8] hover:bg-gray-100'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Change Video
                      </button>
                    </div>
                  ) : (
                    <>
                      <MdVideoLibrary className={`text-5xl mb-3 ${
                        isDragActive ? 'text-[#C35029]' : (darkMode ? 'text-gray-500' : 'text-gray-400')
                      }`} />
                      <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {isDragActive ? 'Drop your video here' : 'Drag & drop video here'}
                      </p>
                      <p className={`text-sm mb-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        or click to browse files<br />
                        <span className="text-xs">(MP4, MOV, or AVI - Max 50MB)</span>
                      </p>
                      <button 
                        className={`px-4 py-2 rounded-lg bg-[#C35029] hover:bg-[#EF9273] text-white`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Select Video File
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-[#FEF9F8]'}`}>
                <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Video Guidelines:</h3>
                <ul className={`text-sm space-y-2 list-disc list-inside ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>Speak clearly in {job?.language || 'the required language'}</li>
                  <li>Dress professionally</li>
                  <li>Good lighting and audio quality</li>
                  <li>1-2 minutes in length</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Submission Section */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={submitExam}
            disabled={loading || !motivation || !videoFile || !isSubmitted}
            className={`px-8 py-3 rounded-lg font-medium flex items-center ${
              loading || !motivation || !videoFile || !isSubmitted
                ? `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
                : 'bg-[#C35029] hover:bg-[#EF9273] text-white shadow-lg'
            } transition-all`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;