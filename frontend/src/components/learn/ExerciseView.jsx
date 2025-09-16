// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// export default function ExerciseView({ course }) {
//   const { courseId } = useParams();
//   const [exercises, setExercises] = useState([]);
//   const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [feedback, setFeedback] = useState({});
//   const [showResults, setShowResults] = useState(false);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       try {
//         const response = await fetch(`/api/courses/${courseId}/exercises`);
//         const data = await response.json();
//         setExercises(data);
//       } catch (error) {
//         console.error('Failed to fetch exercises:', error);
//       }
//     };
//     fetchExercises();
//   }, [courseId]);

//   const currentExercise = exercises[currentExerciseIndex];

//   const handleAnswerSubmit = () => {
//     if (!currentExercise) return;

//     // Simple client-side checking (for MCQ/fill-in-the-blank)
//     const newFeedback = {};
//     let isCorrect = false;

//     if (currentExercise.type === 'mcq') {
//       const correctOption = currentExercise.options.find(opt => opt.isCorrect);
//       isCorrect = userAnswers[currentExercise.id] === correctOption?.text;
//       newFeedback[currentExercise.id] = {
//         isCorrect,
//         explanation: isCorrect 
//           ? 'Correct! ' + currentExercise.explanation
//           : 'Incorrect. ' + currentExercise.explanation
//       };
//     } else if (currentExercise.type === 'fill-blank') {
//       isCorrect = userAnswers[currentExercise.id]?.toLowerCase() === 
//                  currentExercise.answer.toLowerCase();
//       newFeedback[currentExercise.id] = {
//         isCorrect,
//         explanation: isCorrect 
//           ? 'Correct!'
//           : `The correct answer is: ${currentExercise.answer}`
//       };
//     }

//     setFeedback(prev => ({ ...prev, ...newFeedback }));
//     setShowResults(true);
//   };

//   const handleNextExercise = () => {
//     setShowResults(false);
//     setCurrentExerciseIndex(prev => (prev + 1) % exercises.length);
//   };

//   const handleAnswerChange = (exerciseId, value) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [exerciseId]: value
//     }));
//   };

//   if (exercises.length === 0) {
//     return (
//       <div className="bg-white p-6 rounded-lg shadow text-center">
//         <p className="text-gray-600">No exercises available for this course yet.</p>
//       </div>
//     );
//   }

//   if (!currentExercise) return <div>Loading exercise...</div>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-bold text-gray-800">Practice Exercises</h2>
//         <div className="text-gray-600">
//           Exercise {currentExerciseIndex + 1} of {exercises.length}
//         </div>
//       </div>

//       <div className="mb-8">
//         <h3 className="text-lg font-medium mb-4 flex items-start">
//           <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mr-3">
//             {currentExerciseIndex + 1}
//           </span>
//           <span dangerouslySetInnerHTML={{ __html: formatExerciseText(currentExercise.text) }} />
//         </h3>

//         {currentExercise.type === 'mcq' && (
//           <div className="ml-10 space-y-3">
//             {currentExercise.options.map((option, i) => (
//               <label key={i} className="flex items-center space-x-3">
//                 <input
//                   type="radio"
//                   name={`exercise-${currentExercise.id}`}
//                   checked={userAnswers[currentExercise.id] === option.text}
//                   onChange={() => handleAnswerChange(currentExercise.id, option.text)}
//                   className="h-4 w-4 text-indigo-600"
//                   disabled={showResults}
//                 />
//                 <span>{option.text}</span>
//               </label>
//             ))}
//           </div>
//         )}

//         {currentExercise.type === 'fill-blank' && (
//           <div className="ml-10">
//             <input
//               type="text"
//               value={userAnswers[currentExercise.id] || ''}
//               onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
//               className="w-full p-2 border rounded"
//               disabled={showResults}
//             />
//           </div>
//         )}

//         {currentExercise.type === 'translation' && (
//           <div className="ml-10 space-y-4">
//             <div className="p-3 bg-gray-50 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-500 mb-1">Original Text</h4>
//               <p>{currentExercise.sourceText}</p>
//             </div>
//             <textarea
//               value={userAnswers[currentExercise.id] || ''}
//               onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               rows={4}
//               placeholder="Write your translation here..."
//               disabled={showResults}
//             />
//           </div>
//         )}
//       </div>

//       {showResults && feedback[currentExercise.id] && (
//         <div className={`p-4 rounded-lg mb-6 ${
//           feedback[currentExercise.id].isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
//         }`}>
//           <p className="font-medium">
//             {feedback[currentExercise.id].isCorrect ? '✓ Correct' : '✗ Incorrect'}
//           </p>
//           {feedback[currentExercise.id].explanation && (
//             <p className="mt-1">{feedback[currentExercise.id].explanation}</p>
//           )}
//         </div>
//       )}

//       <div className="flex justify-between">
//         <button
//           onClick={() => setCurrentExerciseIndex(prev => (prev - 1 + exercises.length) % exercises.length)}
//           disabled={currentExerciseIndex === 0}
//           className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
//         >
//           Previous
//         </button>

//         {!showResults ? (
//           <button
//             onClick={handleAnswerSubmit}
//             disabled={!userAnswers[currentExercise.id]}
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
//           >
//             Check Answer
//           </button>
//         ) : (
//           <button
//             onClick={handleNextExercise}
//             className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
//           >
//             Next Exercise
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper function to format exercise text (e.g., highlight blanks)
// function formatExerciseText(text) {
//   return text.replace(/_{3,}/g, match => 
//     `<span class="border-b-2 border-gray-400 mx-1">${' '.repeat(match.length)}</span>`
//   );
// }



















// components/learn/ExerciseView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheck, FiX, FiVolume2, FiHelpCircle } from 'react-icons/fi';

export default function ExerciseView({ course }) {
  const { courseId, exerciseId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [hintVisible, setHintVisible] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}/exercises`);
        const data = await response.json();
        setExercises(data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };
    fetchExercises();
  }, [courseId]);

  const currentExercise = exercises[currentExerciseIndex];

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
    setAudioPlaying(true);
    audio.onended = () => setAudioPlaying(false);
  };

  const handleAnswerSubmit = async () => {
    if (!currentExercise) return;

    const newFeedback = {};
    let isCorrect = false;
    let pointsEarned = 0;

    if (currentExercise.type === 'mcq') {
      const correctOption = currentExercise.options.find(opt => opt.isCorrect);
      isCorrect = userAnswers[currentExercise.id] === correctOption?.id;
      newFeedback[currentExercise.id] = {
        isCorrect,
        explanation: isCorrect 
          ? 'Correct! ' + (currentExercise.explanation || 'Well done!')
          : 'Incorrect. ' + (currentExercise.explanation || `The correct answer is: ${correctOption?.text}`)
      };
      pointsEarned = isCorrect ? currentExercise.points || 5 : 0;
    } 
    else if (currentExercise.type === 'fill-blank') {
      isCorrect = userAnswers[currentExercise.id]?.toLowerCase().trim() === 
                 currentExercise.answer.toLowerCase().trim();
      newFeedback[currentExercise.id] = {
        isCorrect,
        explanation: isCorrect 
          ? 'Correct!'
          : `The correct answer is: ${currentExercise.answer}`
      };
      pointsEarned = isCorrect ? currentExercise.points || 10 : 0;
    }
    else if (currentExercise.type === 'translation') {
      // For translation exercises, we might need more complex checking
      // This is a simplified version
      isCorrect = userAnswers[currentExercise.id]?.length > 10; // Simple length check
      newFeedback[currentExercise.id] = {
        isCorrect,
        explanation: 'Translation exercises are reviewed for accuracy. Good attempt!'
      };
      pointsEarned = 15; // Base points for attempting translation
    }

    setFeedback(prev => ({ ...prev, ...newFeedback }));
    setShowResults(true);

    if (isCorrect) {
      setScore(prev => prev + pointsEarned);
      
      // Send progress to backend
      try {
        await fetch('/api/progress/exercise', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            exerciseId: currentExercise.id,
            correct: isCorrect,
            points: pointsEarned
          })
        });
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  };

  const handleNextExercise = () => {
    setShowResults(false);
    setHintVisible(false);
    setCurrentExerciseIndex(prev => (prev + 1) % exercises.length);
  };

  const handleAnswerChange = (exerciseId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [exerciseId]: value
    }));
  };

  if (exercises.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="text-gray-400 mb-4 text-6xl">💪</div>
        <p className="text-gray-600">No exercises available for this course yet.</p>
      </div>
    );
  }

  if (!currentExercise) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Progress Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Practice Exercises</h2>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#C35029] h-2 rounded-full" 
                style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2">
              {currentExerciseIndex + 1} of {exercises.length}
            </span>
          </div>
        </div>
        <div className="bg-[#f8e1d8] text-[#C35029] px-3 py-1 rounded-full font-medium">
          {score} XP
        </div>
      </div>

      {/* Exercise Content */}
      <div className="mb-8">
        <div className="flex items-start mb-4">
          <span className="bg-[#C35029] text-white px-3 py-1 rounded-full text-sm mr-3">
            {currentExercise.type.replace('-', ' ')}
          </span>
          {currentExercise.hint && (
            <button
              onClick={() => setHintVisible(!hintVisible)}
              className="flex items-center text-sm text-gray-500 hover:text-[#C35029]"
            >
              <FiHelpCircle className="mr-1" />
              Hint
            </button>
          )}
        </div>

        {hintVisible && currentExercise.hint && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <p className="text-sm text-yellow-800">{currentExercise.hint}</p>
          </div>
        )}

        <h3 className="text-lg font-medium mb-4 flex items-start">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mr-3">
            {currentExerciseIndex + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: formatExerciseText(currentExercise.question) }} />
        </h3>

        {currentExercise.audio && (
          <button
            onClick={() => playAudio(currentExercise.audio)}
            className="flex items-center text-[#C35029] hover:text-[#a04020] mb-4"
            disabled={audioPlaying}
          >
            <FiVolume2 className="mr-2" />
            {audioPlaying ? 'Playing...' : 'Listen'}
          </button>
        )}

        {currentExercise.type === 'mcq' && (
          <div className="ml-10 space-y-3">
            {currentExercise.options.map((option, i) => (
              <label key={i} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name={`exercise-${currentExercise.id}`}
                  checked={userAnswers[currentExercise.id] === option.id}
                  onChange={() => handleAnswerChange(currentExercise.id, option.id)}
                  className="h-5 w-5 text-[#C35029]"
                  disabled={showResults}
                />
                <span className="flex-1">{option.text}</span>
              </label>
            ))}
          </div>
        )}

        {currentExercise.type === 'fill-blank' && (
          <div className="ml-10">
            <input
              type="text"
              value={userAnswers[currentExercise.id] || ''}
              onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
              disabled={showResults}
              placeholder="Type your answer here..."
            />
          </div>
        )}

        {currentExercise.type === 'translation' && (
          <div className="ml-10 space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Translate this text:</h4>
              <p className="font-medium">{currentExercise.sourceText}</p>
            </div>
            <textarea
              value={userAnswers[currentExercise.id] || ''}
              onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
              rows={4}
              placeholder="Write your translation here..."
              disabled={showResults}
            />
          </div>
        )}
      </div>

      {/* Feedback */}
      {showResults && feedback[currentExercise.id] && (
        <div className={`p-4 rounded-lg mb-6 ${
          feedback[currentExercise.id].isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            {feedback[currentExercise.id].isCorrect ? (
              <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={20} />
            ) : (
              <FiX className="text-red-500 mt-0.5 mr-2 flex-shrink-0" size={20} />
            )}
            <div>
              <p className={`font-medium ${feedback[currentExercise.id].isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {feedback[currentExercise.id].isCorrect ? 'Correct!' : 'Incorrect'}
              </p>
              {feedback[currentExercise.id].explanation && (
                <p className={`mt-1 ${feedback[currentExercise.id].isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                  {feedback[currentExercise.id].explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
          disabled={currentExerciseIndex === 0}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {!showResults ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={!userAnswers[currentExercise.id] && currentExercise.type !== 'translation'}
            className="px-6 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNextExercise}
            className="px-6 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]"
          >
            {currentExerciseIndex < exercises.length - 1 ? 'Next Exercise' : 'Finish Practice'}
          </button>
        )}
      </div>

      {/* XP Animation */}
      {showResults && feedback[currentExercise.id]?.isCorrect && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
          <div className="text-4xl text-[#C35029] font-bold">+{currentExercise.points || 5} XP!</div>
        </div>
      )}
    </div>
  );
}

// Helper function to format exercise text (e.g., highlight blanks)
function formatExerciseText(text) {
  return text.replace(/_{3,}/g, match => 
    `<span class="inline-block border-b-2 border-gray-400 mx-1 px-8">${' '.repeat(match.length)}</span>`
  );
}