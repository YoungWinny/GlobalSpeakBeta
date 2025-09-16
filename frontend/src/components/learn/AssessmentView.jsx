// import { useState, useEffect } from 'react';
// import { FiPlus, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

// export default function AssessmentComposer() {
//   const [assessment, setAssessment] = useState({
//     title: '',
//     questions: [],
//     passingScore: 70,
//     timeLimit: 30
//   });

//   const [newQuestion, setNewQuestion] = useState({
//     text: '',
//     type: 'mcq',
//     options: [{ text: '', isCorrect: false }],
//     points: 1
//   });

//   const [isGenerating, setIsGenerating] = useState(false);

//   // ... (keep existing useEffect and handler functions)

//   return (
//     <div className="space-y-6 p-6">
//       <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment Setup</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Assessment Title</label>
//             <input
//               type="text"
//               value={assessment.title}
//               onChange={(e) => setAssessment({...assessment, title: e.target.value})}
//               className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               placeholder="Final Exam"
//             />
//           </div>
          
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Passing Score (%)</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={assessment.passingScore}
//                 onChange={(e) => setAssessment({...assessment, passingScore: e.target.value})}
//                 className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               />
//               <span className="absolute right-3 top-2 text-gray-400">%</span>
//             </div>
//           </div>
          
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 min="1"
//                 value={assessment.timeLimit}
//                 onChange={(e) => setAssessment({...assessment, timeLimit: e.target.value})}
//                 className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               />
//               <span className="absolute right-3 top-2 text-gray-400">min</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
//         <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Question</h3>
        
//         <div className="space-y-4">
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Question Type</label>
//             <select
//               value={newQuestion.type}
//               onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value, options: e.target.value === 'mcq' ? newQuestion.options : []})}
//               className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             >
//               <option value="mcq">Multiple Choice</option>
//               <option value="essay">Essay</option>
//               <option value="short-answer">Short Answer</option>
//             </select>
//           </div>
          
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Question Text</label>
//             <textarea
//               value={newQuestion.text}
//               onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
//               className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               rows={3}
//               placeholder="Enter your question here..."
//             />
//           </div>
          
//           {newQuestion.type === 'mcq' && (
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Options</label>
//               {newQuestion.options.map((option, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <button
//                     onClick={() => handleOptionChange(index, 'isCorrect', !option.isCorrect)}
//                     className={`flex-shrink-0 h-5 w-5 rounded flex items-center justify-center ${
//                       option.isCorrect ? 'bg-green-500 text-white' : 'border border-gray-300'
//                     }`}
//                   >
//                     {option.isCorrect && <FiCheck size={14} />}
//                   </button>
//                   <input
//                     type="text"
//                     value={option.text}
//                     onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
//                     className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//                     placeholder={`Option ${index + 1}`}
//                   />
//                   {index > 0 && (
//                     <button
//                       onClick={() => {
//                         const updatedOptions = [...newQuestion.options];
//                         updatedOptions.splice(index, 1);
//                         setNewQuestion({...newQuestion, options: updatedOptions});
//                       }}
//                       className="text-red-400 hover:text-red-600 p-1"
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 onClick={handleAddOption}
//                 className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mt-2"
//               >
//                 <FiPlus size={16} className="mr-1" /> Add Option
//               </button>
//             </div>
//           )}
          
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-gray-700">Points</label>
//             <input
//               type="number"
//               min="1"
//               value={newQuestion.points}
//               onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 1})}
//               className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             />
//           </div>
          
//           <div className="flex justify-between pt-2">
//             <button
//               onClick={handleAddQuestion}
//               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
//             >
//               Add Question
//             </button>
            
//             <button
//               onClick={handleGenerateQuestions}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isGenerating ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </>
//               ) : 'AI Suggest Questions'}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {assessment.questions.length > 0 && (
//         <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-gray-800">
//               Assessment Questions <span className="text-indigo-600">({assessment.questions.length})</span>
//             </h3>
//             <button
//               onClick={handlePublishAssessment}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
//             >
//               Publish Assessment
//             </button>
//           </div>
          
//           <div className="space-y-3">
//             {assessment.questions.map((question, qIndex) => (
//               <div key={qIndex} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex justify-between">
//                   <div className="font-medium">
//                     {question.text} <span className="text-indigo-600">({question.points} point{question.points !== 1 ? 's' : ''})</span>
//                   </div>
//                   <button
//                     onClick={() => {
//                       const updatedQuestions = [...assessment.questions];
//                       updatedQuestions.splice(qIndex, 1);
//                       setAssessment({...assessment, questions: updatedQuestions});
//                     }}
//                     className="text-red-400 hover:text-red-600 p-1"
//                   >
//                     <FiTrash2 size={18} />
//                   </button>
//                 </div>
                
//                 {question.type === 'mcq' && question.options?.length > 0 && (
//                   <ul className="mt-2 space-y-1">
//                     {question.options.map((option, oIndex) => (
//                       <li key={oIndex} className={`flex items-center ${option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
//                         <span className="inline-block w-5 mr-1">
//                           {option.isCorrect ? <FiCheck size={16} /> : <span className="opacity-0">•</span>}
//                         </span>
//                         {option.text}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }













// components/learn/AssessmentView.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck, FiClock, FiAward } from 'react-icons/fi';

export default function AssessmentView({ course }) {
  const { courseId, assessmentId } = useParams();
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [assessmentFinished, setAssessmentFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/assessment`);
        const data = await response.json();
        setAssessment(data);
        setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
      } catch (error) {
        console.error('Failed to fetch assessment:', error);
      }
    };
    fetchAssessment();
  }, [courseId]);

  useEffect(() => {
    let timer;
    if (assessmentStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && assessmentStarted) {
      handleFinishAssessment();
    }
    return () => clearInterval(timer);
  }, [assessmentStarted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startAssessment = () => {
    setAssessmentStarted(true);
  };

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishAssessment = async () => {
    setAssessmentStarted(false);
    setAssessmentFinished(true);
    
    // Calculate score
    let correctAnswers = 0;
    assessment.questions.forEach(question => {
      if (question.type === 'mcq') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (userAnswers[question.id] === correctOption?.id) {
          correctAnswers++;
        }
      } else if (question.type === 'fill-blank') {
        if (userAnswers[question.id]?.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
          correctAnswers++;
        }
      }
      // Essay questions would need manual grading
    });
    
    const calculatedScore = Math.round((correctAnswers / assessment.questions.length) * 100);
    setScore(calculatedScore);
    
    // Save assessment results
    try {
      await fetch('/api/assessment/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          assessmentId,
          score: calculatedScore,
          answers: userAnswers,
          timeSpent: assessment.timeLimit * 60 - timeLeft
        })
      });
      
      // Award certificate if passed
      if (calculatedScore >= assessment.passingScore) {
        await fetch('/api/certificate/award', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId,
            score: calculatedScore
          })
        });
      }
    } catch (error) {
      console.error('Error saving assessment results:', error);
    }
  };

  const currentQuestion = assessment?.questions[currentQuestionIndex];

  if (!assessment) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
    </div>
  );

  if (!assessmentStarted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="text-center">
          <div className="bg-[#f8e1d8] text-[#C35029] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiAward size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{assessment.title}</h2>
          <p className="text-gray-600 mb-6">Final Assessment for {course.title}</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-3">Assessment Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <FiClock className="text-gray-500 mr-2" />
                <span>{assessment.timeLimit} minutes</span>
              </div>
              <div>
                <span className="font-medium">Questions:</span> {assessment.questions.length}
              </div>
              <div>
                <span className="font-medium">Passing Score:</span> {assessment.passingScore}%
              </div>
              <div>
                <span className="font-medium">Type:</span> {assessment.questions.some(q => q.type === 'essay') ? 'Graded' : 'Auto-graded'}
              </div>
            </div>
          </div>
          
          <button
            onClick={startAssessment}
            className="px-6 py-3 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020] font-medium"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (assessmentFinished) {
    const passed = score >= assessment.passingScore;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl mx-auto">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {passed ? (
              <FiCheck className="text-green-500" size={40} />
            ) : (
              <span className="text-red-500 text-3xl">✗</span>
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Assessment Complete'}
          </h2>
          
          <div className={`text-4xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {score}%
          </div>
          
          <p className="text-gray-600 mb-6">
            {passed 
              ? `You passed the assessment with a score of ${score}%!` 
              : `Your score is ${score}%. The passing score is ${assessment.passingScore}%.`}
          </p>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(`/learn/course/${courseId}`)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Back to Course
            </button>
            
            {passed ? (
              <button
                onClick={() => navigate(`/learn/course/${courseId}/certificate`)}
                className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]"
              >
                View Certificate
              </button>
            ) : (
              <button
                onClick={() => {
                  setAssessmentStarted(false);
                  setAssessmentFinished(false);
                  setUserAnswers({});
                  setCurrentQuestionIndex(0);
                  setTimeLeft(assessment.timeLimit * 60);
                }}
                className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      {/* Assessment Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{assessment.title}</h2>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {assessment.questions.length}</p>
        </div>
        
        <div className="flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full">
          <FiClock className="mr-1" />
          {formatTime(timeLeft)}
        </div>
      </div>
      
      {/* Current Question */}
      {currentQuestion && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">
            {currentQuestionIndex + 1}. {currentQuestion.text}
            {currentQuestion.points && (
              <span className="text-sm text-gray-500 ml-2">({currentQuestion.points} points)</span>
            )}
          </h3>
          
          {currentQuestion.type === 'mcq' && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, i) => (
                <label key={i} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    checked={userAnswers[currentQuestion.id] === option.id}
                    onChange={() => handleAnswerChange(currentQuestion.id, option.id)}
                    className="h-5 w-5 text-[#C35029]"
                  />
                  <span className="flex-1">{option.text}</span>
                </label>
              ))}
            </div>
          )}
          
          {currentQuestion.type === 'fill-blank' && (
            <div>
              <input
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="Type your answer here..."
              />
            </div>
          )}
          
          {currentQuestion.type === 'essay' && (
            <div>
              <textarea
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                rows={6}
                placeholder="Write your answer here..."
              />
            </div>
          )}
        </div>
      )}
      
      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-2">
          {currentQuestionIndex < assessment.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]"
            >
              Next Question
            </button>
          ) : (
            <button
              onClick={handleFinishAssessment}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Finish Assessment
            </button>
          )}
        </div>
      </div>
      
      {/* Question Progress */}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {assessment.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                index === currentQuestionIndex
                  ? 'bg-[#C35029] text-white'
                  : userAnswers[assessment.questions[index].id]
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}