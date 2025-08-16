import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ExerciseView({ course }) {
  const { courseId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showResults, setShowResults] = useState(false);

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

  const handleAnswerSubmit = () => {
    if (!currentExercise) return;

    // Simple client-side checking (for MCQ/fill-in-the-blank)
    const newFeedback = {};
    let isCorrect = false;

    if (currentExercise.type === 'mcq') {
      const correctOption = currentExercise.options.find(opt => opt.isCorrect);
      isCorrect = userAnswers[currentExercise.id] === correctOption?.text;
      newFeedback[currentExercise.id] = {
        isCorrect,
        explanation: isCorrect 
          ? 'Correct! ' + currentExercise.explanation
          : 'Incorrect. ' + currentExercise.explanation
      };
    } else if (currentExercise.type === 'fill-blank') {
      isCorrect = userAnswers[currentExercise.id]?.toLowerCase() === 
                 currentExercise.answer.toLowerCase();
      newFeedback[currentExercise.id] = {
        isCorrect,
        explanation: isCorrect 
          ? 'Correct!'
          : `The correct answer is: ${currentExercise.answer}`
      };
    }

    setFeedback(prev => ({ ...prev, ...newFeedback }));
    setShowResults(true);
  };

  const handleNextExercise = () => {
    setShowResults(false);
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
        <p className="text-gray-600">No exercises available for this course yet.</p>
      </div>
    );
  }

  if (!currentExercise) return <div>Loading exercise...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Practice Exercises</h2>
        <div className="text-gray-600">
          Exercise {currentExerciseIndex + 1} of {exercises.length}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 flex items-start">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full mr-3">
            {currentExerciseIndex + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: formatExerciseText(currentExercise.text) }} />
        </h3>

        {currentExercise.type === 'mcq' && (
          <div className="ml-10 space-y-3">
            {currentExercise.options.map((option, i) => (
              <label key={i} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`exercise-${currentExercise.id}`}
                  checked={userAnswers[currentExercise.id] === option.text}
                  onChange={() => handleAnswerChange(currentExercise.id, option.text)}
                  className="h-4 w-4 text-indigo-600"
                  disabled={showResults}
                />
                <span>{option.text}</span>
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
              className="w-full p-2 border rounded"
              disabled={showResults}
            />
          </div>
        )}

        {currentExercise.type === 'translation' && (
          <div className="ml-10 space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Original Text</h4>
              <p>{currentExercise.sourceText}</p>
            </div>
            <textarea
              value={userAnswers[currentExercise.id] || ''}
              onChange={(e) => handleAnswerChange(currentExercise.id, e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={4}
              placeholder="Write your translation here..."
              disabled={showResults}
            />
          </div>
        )}
      </div>

      {showResults && feedback[currentExercise.id] && (
        <div className={`p-4 rounded-lg mb-6 ${
          feedback[currentExercise.id].isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <p className="font-medium">
            {feedback[currentExercise.id].isCorrect ? '✓ Correct' : '✗ Incorrect'}
          </p>
          {feedback[currentExercise.id].explanation && (
            <p className="mt-1">{feedback[currentExercise.id].explanation}</p>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentExerciseIndex(prev => (prev - 1 + exercises.length) % exercises.length)}
          disabled={currentExerciseIndex === 0}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        {!showResults ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={!userAnswers[currentExercise.id]}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNextExercise}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Next Exercise
          </button>
        )}
      </div>
    </div>
  );
}

// Helper function to format exercise text (e.g., highlight blanks)
function formatExerciseText(text) {
  return text.replace(/_{3,}/g, match => 
    `<span class="border-b-2 border-gray-400 mx-1">${' '.repeat(match.length)}</span>`
  );
}



















