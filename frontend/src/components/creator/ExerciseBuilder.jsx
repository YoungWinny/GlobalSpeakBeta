// // components/creator/ExerciseBuilder.jsx
// import { useState } from 'react';
// import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2, FiGlobe, FiMic } from 'react-icons/fi';

// export default function ExerciseBuilder() {
//   const [exercises, setExercises] = useState([]);
//   const [currentExercise, setCurrentExercise] = useState({
//     type: 'translation', // Default for language professionals
//     question: '',
//     sourceText: '',
//     targetLanguage: '',
//     options: [{ text: '', isCorrect: false }],
//     explanation: ''
//   });
//   const [isGenerating, setIsGenerating] = useState(false);

//   const exerciseTypes = [
//     { id: 'translation', label: 'Translation', icon: <FiGlobe /> },
//     { id: 'transcription', label: 'Transcription', icon: <FiMic /> },
//     { id: 'mcq', label: 'Multiple Choice', icon: '🔠' },
//     { id: 'fill-blank', label: 'Fill in Blank', icon: '📝' },
//   ];

//   const handleAddExercise = () => {
//     if (!currentExercise.question) {
//       alert('Please provide an exercise prompt');
//       return;
//     }
    
//     setExercises(prev => [...prev, currentExercise]);
//     setCurrentExercise({
//       type: 'translation',
//       question: '',
//       sourceText: '',
//       targetLanguage: '',
//       options: [{ text: '', isCorrect: false }],
//       explanation: ''
//     });
//   };

//   const handleGenerateExercise = async () => {
//     setIsGenerating(true);
//     try {
//       // Simulate API call to AI service
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock response based on exercise type
//       let mockExercise;
      
//       if (currentExercise.type === 'translation') {
//         mockExercise = {
//           ...currentExercise,
//           question: `Translate the following text to ${currentExercise.targetLanguage || 'Spanish'}:`,
//           sourceText: "This is a sample text for translation practice.",
//           explanation: "Pay attention to verb conjugations and noun-adjective agreement."
//         };
//       } else if (currentExercise.type === 'transcription') {
//         mockExercise = {
//           ...currentExercise,
//           question: "Transcribe the following audio clip:",
//           sourceText: "[Audio file would be attached here]",
//           explanation: "Focus on accurately capturing all spoken words and punctuation."
//         };
//       } else {
//         mockExercise = {
//           ...currentExercise,
//           question: `Generated ${currentExercise.type} question`,
//           options: [
//             { text: 'Correct answer', isCorrect: true },
//             { text: 'Incorrect option 1', isCorrect: false },
//             { text: 'Incorrect option 2', isCorrect: false }
//           ],
//           explanation: 'This is an AI-generated explanation for the correct answer.'
//         };
//       }
      
//       setCurrentExercise(mockExercise);
//     } catch (error) {
//       console.error('Exercise generation failed:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2, FiGlobe, FiMic } from 'react-icons/fi';

export default function ExerciseBuilder() {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    type: 'translation',
    question: '',
    sourceText: '',
    targetLanguage: '',
    options: [{ text: '', isCorrect: false }],
    explanation: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateExercise = async () => {
    if (!currentExercise.question && exercises.length === 0) {
      alert('Please provide some context or add at least one exercise first');
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/content/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          courseId: 'current-course-id', // You'll need to pass the actual course ID
          contentType: 'exercises',
          topic: currentExercise.question || exercises.map(e => e.question).join('\n'),
          options: {
            questionType: currentExercise.type,
            count: 3
          }
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (Array.isArray(data.generatedContent)) {
          // Handle array of questions
          setCurrentExercise(data.generatedContent[0]);
        } else if (data.generatedContent.type) {
          // Handle single question
          setCurrentExercise(data.generatedContent);
        }
        
        if (data.usingMock) {
          console.log('Using mock exercise data');
        }
      } else {
        throw new Error(data.message || 'Failed to generate exercise');
      }
    } catch (error) {
      console.error('Exercise generation failed:', error);
      alert('Failed to generate exercise: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#C35029]">Exercise Builder</h2>
        <p className="text-gray-500 text-sm mt-1">Create practice activities for {currentExercise.type}</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
            <div className="flex flex-wrap gap-2">
              {exerciseTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setCurrentExercise(prev => ({ 
                    ...prev, 
                    type: type.id,
                    options: type.id === 'mcq' ? prev.options : []
                  }))}
                  className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                    currentExercise.type === type.id
                      ? 'bg-[#C35029] text-white border-[#C35029]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          
          {(currentExercise.type === 'translation' || currentExercise.type === 'transcription') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {currentExercise.type === 'translation' ? 'Source Text' : 'Audio Description'}
              </label>
              <textarea
                value={currentExercise.sourceText}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, sourceText: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={3}
                placeholder={currentExercise.type === 'translation' ? 'Enter text to be translated...' : 'Describe the audio content...'}
              />
            </div>
          )}
          
          {currentExercise.type === 'translation' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Target Language</label>
              <input
                type="text"
                value={currentExercise.targetLanguage}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, targetLanguage: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                placeholder="e.g., Spanish, French, etc."
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            <textarea
              value={currentExercise.question}
              onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
              rows={2}
              placeholder="Provide clear instructions for this exercise..."
            />
          </div>
          
          {currentExercise.type === 'mcq' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options</label>
              {currentExercise.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newOptions = [...currentExercise.options];
                      newOptions[index].isCorrect = !newOptions[index].isCorrect;
                      setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                    }}
                    className={`flex-shrink-0 h-5 w-5 rounded flex items-center justify-center ${
                      option.isCorrect ? 'bg-green-500 text-white' : 'border border-gray-300'
                    }`}
                  >
                    {option.isCorrect && <FiCheck size={14} />}
                  </button>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...currentExercise.options];
                      newOptions[index].text = e.target.value;
                      setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                    }}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                    placeholder={`Option ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const newOptions = [...currentExercise.options];
                        newOptions.splice(index, 1);
                        setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                      }}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => {
                  setCurrentExercise(prev => ({
                    ...prev,
                    options: [...prev.options, { text: '', isCorrect: false }]
                  }));
                }}
                className="flex items-center text-sm text-[#C35029] hover:text-[#a04020] mt-1"
              >
                <FiPlus size={16} className="mr-1" /> Add Option
              </button>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Explanation (optional)</label>
            <textarea
              value={currentExercise.explanation}
              onChange={(e) => setCurrentExercise(prev => ({ ...prev, explanation: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
              rows={2}
              placeholder="Add explanation for correct answer..."
            />
          </div>
        </div>
        
        <div className="flex flex-wrap justify-between gap-3 pt-2">
          <button
            onClick={handleGenerateExercise}
            disabled={isGenerating}
            className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <FiAward className="mr-2" /> AI Suggest Exercise
              </>
            )}
          </button>
          
          <button
            onClick={handleAddExercise}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
          >
            <FiPlus className="mr-2" /> Add Exercise
          </button>
        </div>
      </div>
      
      {exercises.length > 0 && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="text-lg font-medium text-[#C35029] mb-3">
            Added Exercises <span className="text-gray-600">({exercises.length})</span>
          </h3>
          <div className="space-y-3">
            {exercises.map((ex, idx) => (
              <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#ef9273] text-white rounded-full capitalize">
                      {ex.type.replace('-', ' ')}
                    </span>
                    <p className="mt-1 text-gray-800 font-medium">{ex.question}</p>
                    
                    {ex.sourceText && (
                      <div className="mt-2 p-2 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">{ex.sourceText}</p>
                      </div>
                    )}
                    
                    {ex.options?.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {ex.options.map((opt, i) => (
                          <li key={i} className={`flex items-center ${opt.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                            <span className="inline-block w-5 mr-1">
                              {opt.isCorrect ? <FiCheck size={16} /> : <span className="opacity-0">•</span>}
                            </span>
                            {opt.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {ex.explanation && (
                      <div className="mt-2 p-2 bg-[#f8e1d8] text-[#C35029] text-sm rounded">
                        <p className="font-medium">Explanation:</p>
                        <p>{ex.explanation}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const newExercises = [...exercises];
                      newExercises.splice(idx, 1);
                      setExercises(newExercises);
                    }}
                    className="text-red-400 hover:text-red-600 p-1"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}