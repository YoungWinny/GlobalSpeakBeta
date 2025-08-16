// import { useState } from 'react';
// import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2 } from 'react-icons/fi';

// export default function ExerciseBuilder() {
//   const [exercises, setExercises] = useState([]);
//   const [currentExercise, setCurrentExercise] = useState({
//     type: 'mcq',
//     question: '',
//     options: [{ text: '', isCorrect: false }],
//     explanation: ''
//   });
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleAddOption = () => {
//     setCurrentExercise(prev => ({
//       ...prev,
//       options: [...prev.options, { text: '', isCorrect: false }]
//     }));
//   };

//   const handleOptionChange = (index, field, value) => {
//     const newOptions = [...currentExercise.options];
//     newOptions[index][field] = value;
//     setCurrentExercise(prev => ({ ...prev, options: newOptions }));
//   };

//   const handleAddExercise = () => {
//     if (!currentExercise.question || 
//         (currentExercise.type === 'mcq' && currentExercise.options.filter(o => o.isCorrect).length === 0)) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     setExercises(prev => [...prev, currentExercise]);
//     setCurrentExercise({
//       type: 'mcq',
//       question: '',
//       options: [{ text: '', isCorrect: false }],
//       explanation: ''
//     });
//   };

//   const handleGenerateExercise = async () => {
//     if (!currentExercise.question && exercises.length === 0) {
//       alert('Please provide some context or add at least one exercise first');
//       return;
//     }
    
//     setIsGenerating(true);
//     try {
//       const context = exercises.length > 0 
//         ? exercises.map(e => e.question).join('\n') 
//         : currentExercise.question;
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock response
//       const mockExercise = {
//         type: currentExercise.type,
//         question: `Generated ${currentExercise.type} question about "${context.substring(0, 30)}..."`,
//         options: currentExercise.type === 'mcq' ? [
//           { text: 'Correct answer', isCorrect: true },
//           { text: 'Incorrect option 1', isCorrect: false },
//           { text: 'Incorrect option 2', isCorrect: false }
//         ] : [],
//         explanation: 'This is an AI-generated explanation for the correct answer.'
//       };
      
//       setCurrentExercise(mockExercise);
//     } catch (error) {
//       console.error('Exercise generation failed:', error);
//       alert('Failed to generate exercise. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleGenerateDistractors = async () => {
//     if (!currentExercise.question || currentExercise.type !== 'mcq') return;
    
//     setIsGenerating(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Mock response
//       const newOptions = [
//         ...currentExercise.options,
//         { text: 'New distractor 1', isCorrect: false },
//         { text: 'New distractor 2', isCorrect: false }
//       ];
      
//       setCurrentExercise(prev => ({
//         ...prev,
//         options: newOptions
//       }));
//     } catch (error) {
//       console.error('Distractor generation failed:', error);
//       alert('Failed to generate distractors. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-100">
//       <div className="p-6 border-b border-gray-100">
//         <h2 className="text-xl font-semibold text-gray-800">Exercise Builder</h2>
//         <p className="text-gray-500 text-sm mt-1">Create interactive learning activities</p>
//       </div>
      
//       <div className="p-6 space-y-6">
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
//             <div className="flex flex-wrap gap-2">
//               {['mcq', 'fill-blank', 'translation', 'matching'].map(type => (
//                 <button
//                   key={type}
//                   onClick={() => setCurrentExercise(prev => ({ 
//                     ...prev, 
//                     type,
//                     options: type === 'mcq' ? prev.options : []
//                   }))}
//                   className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
//                     currentExercise.type === type
//                       ? 'bg-indigo-600 text-white border-indigo-600'
//                       : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//                   }`}
//                 >
//                   {type.replace('-', ' ')}
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Question/Prompt</label>
//             <textarea
//               value={currentExercise.question}
//               onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               rows={3}
//               placeholder="Enter your exercise prompt..."
//             />
//           </div>
          
//           {currentExercise.type === 'mcq' && (
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Options</label>
//               {currentExercise.options.map((option, index) => (
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
//                         const newOptions = [...currentExercise.options];
//                         newOptions.splice(index, 1);
//                         setCurrentExercise(prev => ({ ...prev, options: newOptions }));
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
//                 className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mt-1"
//               >
//                 <FiPlus size={16} className="mr-1" /> Add Option
//               </button>
//             </div>
//           )}
          
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">Explanation (optional)</label>
//             <textarea
//               value={currentExercise.explanation}
//               onChange={(e) => setCurrentExercise(prev => ({ ...prev, explanation: e.target.value }))}
//               className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//               rows={2}
//               placeholder="Add explanation for correct answer..."
//             />
//           </div>
//         </div>
        
//         <div className="flex flex-wrap justify-between gap-3 pt-2">
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={handleGenerateExercise}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isGenerating ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FiAward className="mr-2" /> AI Suggest Exercise
//                 </>
//               )}
//             </button>
            
//             {currentExercise.type === 'mcq' && currentExercise.question && (
//               <button
//                 onClick={handleGenerateDistractors}
//                 className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors flex items-center"
//               >
//                 <FiEdit2 className="mr-2" /> AI Suggest Distractors
//               </button>
//             )}
//           </div>
          
//           <button
//             onClick={handleAddExercise}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center"
//           >
//             <FiPlus className="mr-2" /> Add Exercise
//           </button>
//         </div>
//       </div>
      
//       {exercises.length > 0 && (
//         <div className="border-t border-gray-100 p-6">
//           <h3 className="text-lg font-medium text-gray-800 mb-3">
//             Added Exercises <span className="text-indigo-600">({exercises.length})</span>
//           </h3>
//           <div className="space-y-3">
//             {exercises.map((ex, idx) => (
//               <div key={idx} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <span className="inline-block px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full capitalize">
//                       {ex.type.replace('-', ' ')}
//                     </span>
//                     <p className="mt-1 text-gray-800">{ex.question}</p>
//                     {ex.options?.length > 0 && (
//                       <ul className="mt-2 space-y-1">
//                         {ex.options.map((opt, i) => (
//                           <li key={i} className={`flex items-center ${opt.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
//                             <span className="inline-block w-5 mr-1">
//                               {opt.isCorrect ? <FiCheck size={16} /> : <span className="opacity-0">•</span>}
//                             </span>
//                             {opt.text}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                     {ex.explanation && (
//                       <div className="mt-2 p-2 bg-blue-50 text-blue-700 text-sm rounded">
//                         <p className="font-medium">Explanation:</p>
//                         <p>{ex.explanation}</p>
//                       </div>
//                     )}
//                   </div>
//                   <button
//                     onClick={() => {
//                       const newExercises = [...exercises];
//                       newExercises.splice(idx, 1);
//                       setExercises(newExercises);
//                     }}
//                     className="text-red-400 hover:text-red-600 p-1"
//                   >
//                     <FiTrash2 size={18} />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }























import { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2 } from 'react-icons/fi';

export default function ExerciseBuilder() {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    type: 'mcq',
    question: '',
    options: [{ text: '', isCorrect: false }],
    explanation: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddOption = () => {
    setCurrentExercise(prev => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }]
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...currentExercise.options];
    newOptions[index][field] = value;
    setCurrentExercise(prev => ({ ...prev, options: newOptions }));
  };

  const handleAddExercise = () => {
    if (!currentExercise.question || 
        (currentExercise.type === 'mcq' && currentExercise.options.filter(o => o.isCorrect).length === 0)) {
      alert('Please fill all required fields');
      return;
    }
    
    setExercises(prev => [...prev, currentExercise]);
    setCurrentExercise({
      type: 'mcq',
      question: '',
      options: [{ text: '', isCorrect: false }],
      explanation: ''
    });
  };

  const handleGenerateExercise = async () => {
    if (!currentExercise.question && exercises.length === 0) {
      alert('Please provide some context or add at least one exercise first');
      return;
    }
    
    setIsGenerating(true);
    try {
      const context = exercises.length > 0 
        ? exercises.map(e => e.question).join('\n') 
        : currentExercise.question;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response
      const mockExercise = {
        type: currentExercise.type,
        question: `Generated ${currentExercise.type} question about "${context.substring(0, 30)}..."`,
        options: currentExercise.type === 'mcq' ? [
          { text: 'Correct answer', isCorrect: true },
          { text: 'Incorrect option 1', isCorrect: false },
          { text: 'Incorrect option 2', isCorrect: false }
        ] : [],
        explanation: 'This is an AI-generated explanation for the correct answer.'
      };
      
      setCurrentExercise(mockExercise);
    } catch (error) {
      console.error('Exercise generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateDistractors = async () => {
    if (!currentExercise.question || currentExercise.type !== 'mcq') return;
    
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const newOptions = [
        ...currentExercise.options,
        { text: 'New distractor 1', isCorrect: false },
        { text: 'New distractor 2', isCorrect: false }
      ];
      
      setCurrentExercise(prev => ({
        ...prev,
        options: newOptions
      }));
    } catch (error) {
      console.error('Distractor generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-[#C35029]">Exercise Builder</h2>
        <p className="text-gray-500 text-sm mt-1">Create interactive learning activities</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
            <div className="flex flex-wrap gap-2">
              {['mcq', 'fill-blank', 'translation', 'matching'].map(type => (
                <button
                  key={type}
                  onClick={() => setCurrentExercise(prev => ({ 
                    ...prev, 
                    type,
                    options: type === 'mcq' ? prev.options : []
                  }))}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    currentExercise.type === type
                      ? 'bg-[#C35029] text-white border-[#C35029]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Question/Prompt</label>
            <textarea
              value={currentExercise.question}
              onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
              rows={3}
              placeholder="Enter your exercise prompt..."
            />
          </div>
          
          {currentExercise.type === 'mcq' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options</label>
              {currentExercise.options.map((option, index) => (
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
                onClick={handleAddOption}
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
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleGenerateExercise}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <FiAward className="mr-2" /> AI Suggest Exercise
                </>
              )}
            </button>
            
            {currentExercise.type === 'mcq' && currentExercise.question && (
              <button
                onClick={handleGenerateDistractors}
                className="px-4 py-2 bg-[#ef9273] hover:bg-[#e07d5a] text-white rounded-lg transition-colors flex items-center"
              >
                <FiEdit2 className="mr-2" /> AI Suggest Distractors
              </button>
            )}
          </div>
          
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
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-[#ef9273] text-white rounded-full capitalize">
                      {ex.type.replace('-', ' ')}
                    </span>
                    <p className="mt-1 text-gray-800">{ex.question}</p>
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