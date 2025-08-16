// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// export default function AssessmentView({ course }) {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [assessments, setAssessments] = useState([]);
//   const [activeAssessment, setActiveAssessment] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [score, setScore] = useState(null);

//   useEffect(() => {
//     const fetchAssessments = async () => {
//       try {
//         const response = await fetch(`/api/courses/${courseId}/assessments`);
//         const data = await response.json();
//         setAssessments(data);
//       } catch (error) {
//         console.error('Failed to fetch assessments:', error);
//       }
//     };
//     fetchAssessments();
//   }, [courseId]);

//   const startAssessment = (assessment) => {
//     setActiveAssessment(assessment);
//     setTimeLeft(assessment.timeLimit * 60); // Convert to seconds
//     setIsSubmitted(false);
//     setScore(null);
//     setUserAnswers({});
//   };

//   useEffect(() => {
//     let timer;
//     if (activeAssessment && timeLeft > 0 && !isSubmitted) {
//       timer = setInterval(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && activeAssessment) {
//       handleSubmit();
//     }
//     return () => clearInterval(timer);
//   }, [activeAssessment, timeLeft, isSubmitted]);

//   const handleAnswerChange = (questionId, answer) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const handleSubmit = () => {
//     if (isSubmitted) return;
    
//     // Calculate score
//     let correct = 0;
//     activeAssessment.questions.forEach(question => {
//       if (question.type === 'mcq') {
//         const correctOption = question.options.find(opt => opt.isCorrect);
//         if (userAnswers[question.id] === correctOption?.text) {
//           correct += question.points;
//         }
//       }
//       // Essay/short answer questions would need manual grading
//     });

//     const totalPossible = activeAssessment.questions.reduce(
//       (sum, question) => sum + question.points, 0
//     );
//     const percentage = Math.round((correct / totalPossible) * 100);
    
//     setScore({
//       correct,
//       total: totalPossible,
//       percentage,
//       passed: percentage >= activeAssessment.passingScore
//     });
//     setIsSubmitted(true);
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   if (!activeAssessment) {
//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold text-gray-800">Course Assessments</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {assessments.map(assessment => (
//             <div key={assessment.id} className="bg-white p-6 rounded-lg shadow">
//               <h3 className="text-xl font-semibold mb-2">{assessment.title}</h3>
//               <div className="text-sm text-gray-600 mb-4">
//                 <p>{assessment.questions.length} questions</p>
//                 <p>Time limit: {assessment.timeLimit} minutes</p>
//                 <p>Passing score: {assessment.passingScore}%</p>
//               </div>
//               <button
//                 onClick={() => startAssessment(assessment)}
//                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//               >
//                 Start Assessment
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">{activeAssessment.title}</h2>
//         <div className={`text-lg font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
//           Time left: {formatTime(timeLeft)}
//         </div>
//       </div>

//       {!isSubmitted ? (
//         <div className="space-y-8">
//           {activeAssessment.questions.map((question, index) => (
//             <div key={question.id} className="border-b pb-6 last:border-b-0">
//               <div className="flex items-start mb-4">
//                 <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mr-3">
//                   {index + 1}
//                 </span>
//                 <h3 className="text-lg font-medium flex-1">
//                   {question.text} 
//                   <span className="text-sm text-gray-500 ml-2">({question.points} point{question.points !== 1 ? 's' : ''})</span>
//                 </h3>
//               </div>

//               {question.type === 'mcq' ? (
//                 <div className="ml-10 space-y-2">
//                   {question.options.map((option, i) => (
//                     <label key={i} className="flex items-center space-x-3">
//                       <input
//                         type="radio"
//                         name={`question-${question.id}`}
//                         checked={userAnswers[question.id] === option.text}
//                         onChange={() => handleAnswerChange(question.id, option.text)}
//                         className="h-4 w-4 text-indigo-600"
//                       />
//                       <span>{option.text}</span>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="ml-10">
//                   <textarea
//                     value={userAnswers[question.id] || ''}
//                     onChange={(e) => handleAnswerChange(question.id, e.target.value)}
//                     className="w-full p-3 border rounded-lg"
//                     rows={question.type === 'essay' ? 4 : 2}
//                     placeholder={question.type === 'essay' ? 'Write your essay answer here...' : 'Enter your answer...'}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}

//           <div className="flex justify-end mt-8">
//             <button
//               onClick={handleSubmit}
//               className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//             >
//               Submit Assessment
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
//             score.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
//           }`}>
//             <span className="text-2xl font-bold">{score.percentage}%</span>
//           </div>
//           <h3 className="text-xl font-bold mb-2">
//             {score.passed ? 'Congratulations!' : 'Assessment Failed'}
//           </h3>
//           <p className="text-gray-600 mb-6">
//             You scored {score.correct} out of {score.total} points.
//             {score.passed ? ' You have passed this assessment.' : ` You needed ${activeAssessment.passingScore}% to pass.`}
//           </p>
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => setActiveAssessment(null)}
//               className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300"
//             >
//               Back to Assessments
//             </button>
//             {!score.passed && (
//               <button
//                 onClick={() => startAssessment(activeAssessment)}
//                 className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//               >
//                 Try Again
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

export default function AssessmentComposer() {
  const [assessment, setAssessment] = useState({
    title: '',
    questions: [],
    passingScore: 70,
    timeLimit: 30
  });

  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'mcq',
    options: [{ text: '', isCorrect: false }],
    points: 1
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // ... (keep existing useEffect and handler functions)

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Assessment Title</label>
            <input
              type="text"
              value={assessment.title}
              onChange={(e) => setAssessment({...assessment, title: e.target.value})}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              placeholder="Final Exam"
            />
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Passing Score (%)</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={assessment.passingScore}
                onChange={(e) => setAssessment({...assessment, passingScore: e.target.value})}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <span className="absolute right-3 top-2 text-gray-400">%</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Time Limit (minutes)</label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={assessment.timeLimit}
                onChange={(e) => setAssessment({...assessment, timeLimit: e.target.value})}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              />
              <span className="absolute right-3 top-2 text-gray-400">min</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Question</h3>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Question Type</label>
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value, options: e.target.value === 'mcq' ? newQuestion.options : []})}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="essay">Essay</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Question Text</label>
            <textarea
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              rows={3}
              placeholder="Enter your question here..."
            />
          </div>
          
          {newQuestion.type === 'mcq' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options</label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => handleOptionChange(index, 'isCorrect', !option.isCorrect)}
                    className={`flex-shrink-0 h-5 w-5 rounded flex items-center justify-center ${
                      option.isCorrect ? 'bg-green-500 text-white' : 'border border-gray-300'
                    }`}
                  >
                    {option.isCorrect && <FiCheck size={14} />}
                  </button>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    placeholder={`Option ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const updatedOptions = [...newQuestion.options];
                        updatedOptions.splice(index, 1);
                        setNewQuestion({...newQuestion, options: updatedOptions});
                      }}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mt-2"
              >
                <FiPlus size={16} className="mr-1" /> Add Option
              </button>
            </div>
          )}
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Points</label>
            <input
              type="number"
              min="1"
              value={newQuestion.points}
              onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 1})}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              Add Question
            </button>
            
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'AI Suggest Questions'}
            </button>
          </div>
        </div>
      </div>
      
      {assessment.questions.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Assessment Questions <span className="text-indigo-600">({assessment.questions.length})</span>
            </h3>
            <button
              onClick={handlePublishAssessment}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Publish Assessment
            </button>
          </div>
          
          <div className="space-y-3">
            {assessment.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {question.text} <span className="text-indigo-600">({question.points} point{question.points !== 1 ? 's' : ''})</span>
                  </div>
                  <button
                    onClick={() => {
                      const updatedQuestions = [...assessment.questions];
                      updatedQuestions.splice(qIndex, 1);
                      setAssessment({...assessment, questions: updatedQuestions});
                    }}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                
                {question.type === 'mcq' && question.options?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex} className={`flex items-center ${option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                        <span className="inline-block w-5 mr-1">
                          {option.isCorrect ? <FiCheck size={16} /> : <span className="opacity-0">•</span>}
                        </span>
                        {option.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}