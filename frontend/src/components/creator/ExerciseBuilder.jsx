// import { useState, useEffect } from 'react';
// import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2, FiGlobe, FiMic, FiSave } from 'react-icons/fi';
// import Swal from 'sweetalert2';
// import { axiosInstance } from '../../utils/axiosInstance';

// const exerciseTypes = [
//   { id: 'translation', label: 'Translation', icon: <FiGlobe /> },
//   { id: 'transcription', label: 'Transcription', icon: <FiMic /> },
//   { id: 'mcq', label: 'Multiple Choice', icon: '🔠' },
//   { id: 'fill-blank', label: 'Fill in Blank', icon: '📝' },
// ];

// export default function ExerciseBuilder({ courseData }) {
//   const [exercises, setExercises] = useState([]);
//   const [currentExercise, setCurrentExercise] = useState({
//     type: 'mcq',
//     question: '',
//     options: [{ text: '', isCorrect: false }],
//     points: 1,
//     explanation: ''
//   });
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     fetchExercises();
//   }, [courseData._id]);

//   const fetchExercises = async () => {
//     try {
//       const response = await axiosInstance.get(`/api/content/course/${courseData._id}`);
//       const courseExercises = response.data.filter(item => item.type === 'exercise');
//       setExercises(courseExercises);
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//     }
//   };

//   const handleGenerateExercise = async () => {
//     setIsGenerating(true);
//     try {
//       const response = await axiosInstance.post('/api/content/ai/generate', {
//         courseId: courseData._id,
//         contentType: 'exercises',
//         topic: currentExercise.question || 'Language exercise',
//         options: {
//           questionType: currentExercise.type,
//           count: 3
//         }
//       });
      
//       if (response.data.success) {
//         const generatedContent = response.data.generatedContent;
        
//         if (Array.isArray(generatedContent) && generatedContent.length > 0) {
//           const exercise = generatedContent[0];
//           setCurrentExercise({
//             ...exercise,
//             options: exercise.options || [{ text: '', isCorrect: false }]
//           });
          
//           Swal.fire({
//             icon: 'success',
//             title: 'Exercise generated!',
//             text: 'AI has created an exercise for you',
//             timer: 2000,
//             showConfirmButton: false
//           });
//         }
//       } else {
//         throw new Error(response.data.message || 'Failed to generate exercise');
//       }
//     } catch (error) {
//       console.error('Exercise generation failed:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to generate exercise',
//         text: error.response?.data?.message || error.message
//       });
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleAddExercise = async () => {
//     if (!currentExercise.question.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing question',
//         text: 'Please provide exercise instructions'
//       });
//       return;
//     }

//     if (currentExercise.type === 'mcq' && currentExercise.options.length < 2) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Not enough options',
//         text: 'Please add at least 2 options for multiple choice'
//       });
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const exerciseData = {
//         course: courseData._id,
//         title: `Exercise: ${currentExercise.type}`,
//         type: 'exercise',
//         content: JSON.stringify(currentExercise),
//         order: exercises.length + 1,
//         questions: [currentExercise]
//       };

//       const response = await axiosInstance.post('/api/content', exerciseData);
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Exercise saved!',
//         text: 'Your exercise has been saved successfully',
//         timer: 2000,
//         showConfirmButton: false
//       });
      
//       // Refresh exercises list
//       fetchExercises();
      
//       // Reset form
//       setCurrentExercise({
//         type: 'mcq',
//         question: '',
//         options: [{ text: '', isCorrect: false }],
//         points: 1,
//         explanation: ''
//       });
//     } catch (error) {
//       console.error('Failed to save exercise:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to save exercise',
//         text: error.response?.data?.message || error.message
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleAddOption = () => {
//     setCurrentExercise(prev => ({
//       ...prev,
//       options: [...prev.options, { text: '', isCorrect: false }]
//     }));
//   };

//   const handleRemoveOption = (index) => {
//     if (currentExercise.options.length > 1) {
//       const newOptions = [...currentExercise.options];
//       newOptions.splice(index, 1);
//       setCurrentExercise(prev => ({ ...prev, options: newOptions }));
//     }
//   };

//   const handleOptionChange = (index, field, value) => {
//     const newOptions = [...currentExercise.options];
//     newOptions[index][field] = value;
//     setCurrentExercise(prev => ({ ...prev, options: newOptions }));
//   };

//   const handleDeleteExercise = async (exerciseId) => {
//     const result = await Swal.fire({
//       title: 'Are you sure?',
//       text: "This action cannot be undone!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     });

//     if (result.isConfirmed) {
//       try {
//         await axiosInstance.delete(`/api/content/${exerciseId}`);
//         Swal.fire('Deleted!', 'Exercise has been deleted.', 'success');
//         fetchExercises();
//       } catch (error) {
//         console.error('Failed to delete exercise:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Failed to delete exercise',
//           text: error.response?.data?.message || error.message
//         });
//       }
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Existing Exercises */}
//       {exercises.length > 0 && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Exercises ({exercises.length})</h3>
//           <div className="space-y-3">
//             {exercises.map((exercise, index) => (
//               <div key={exercise._id} className="flex items-center justify-between p-3 border rounded-lg">
//                 <div>
//                   <h4 className="font-medium">{exercise.title}</h4>
//                   <p className="text-sm text-gray-600">
//                     Type: {JSON.parse(exercise.content)?.type} • Order: {exercise.order}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteExercise(exercise._id)}
//                   className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Exercise Builder */}
//       <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
//         <div className="p-6 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-[#C35029]">Exercise Builder</h2>
//           <p className="text-gray-500 text-sm mt-1">Create practice activities for {courseData.title}</p>
//         </div>
        
//         <div className="p-6 space-y-6">
//           <div className="space-y-4">
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
//               <div className="flex flex-wrap gap-2">
//                 {exerciseTypes.map(type => (
//                   <button
//                     key={type.id}
//                     onClick={() => setCurrentExercise(prev => ({ 
//                       ...prev, 
//                       type: type.id,
//                       options: type.id === 'mcq' ? prev.options : []
//                     }))}
//                     className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
//                       currentExercise.type === type.id
//                         ? 'bg-[#C35029] text-white border-[#C35029]'
//                         : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
//                     }`}
//                   >
//                     {type.icon}
//                     {type.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Question *</label>
//               <textarea
//                 value={currentExercise.question}
//                 onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
//                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
//                 rows={3}
//                 placeholder="Enter your question here..."
//               />
//             </div>
            
//             {currentExercise.type === 'mcq' && (
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Options</label>
//                 {currentExercise.options.map((option, index) => (
//                   <div key={index} className="flex items-center gap-2">
//                     <button
//                       onClick={() => {
//                         const newOptions = currentExercise.options.map((opt, i) => ({
//                           ...opt,
//                           isCorrect: i === index
//                         }));
//                         setCurrentExercise(prev => ({ ...prev, options: newOptions }));
//                       }}
//                       className={`flex-shrink-0 h-5 w-5 rounded flex items-center justify-center ${
//                         option.isCorrect ? 'bg-green-500 text-white' : 'border border-gray-300'
//                       }`}
//                     >
//                       {option.isCorrect && <FiCheck size={14} />}
//                     </button>
//                     <input
//                       type="text"
//                       value={option.text}
//                       onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
//                       className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
//                       placeholder={`Option ${index + 1}`}
//                     />
//                     <button
//                       onClick={() => handleRemoveOption(index)}
//                       className="text-red-400 hover:text-red-600 p-1"
//                       disabled={currentExercise.options.length <= 1}
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   onClick={handleAddOption}
//                   className="flex items-center text-sm text-[#C35029] hover:text-[#a04020] mt-1"
//                 >
//                   <FiPlus size={16} className="mr-1" /> Add Option
//                 </button>
//               </div>
//             )}
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={currentExercise.points}
//                   onChange={(e) => setCurrentExercise(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
//                   className="w-full p-2 border border-gray-200 rounded-lg"
//                 />
//               </div>
//             </div>
            
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">Explanation (optional)</label>
//               <textarea
//                 value={currentExercise.explanation}
//                 onChange={(e) => setCurrentExercise(prev => ({ ...prev, explanation: e.target.value }))}
//                 className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
//                 rows={2}
//                 placeholder="Add explanation for correct answer..."
//               />
//             </div>
//           </div>
          
//           <div className="flex flex-wrap justify-between gap-3 pt-2">
//             <button
//               onClick={handleGenerateExercise}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isGenerating ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FiAward className="mr-2" /> AI Suggest Exercise
//                 </>
//               )}
//             </button>
            
//             <button
//               onClick={handleAddExercise}
//               disabled={isSaving || !currentExercise.question.trim()}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isSaving ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <FiSave className="mr-2" /> Save Exercise
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiAward, FiEdit2, FiGlobe, FiMic, FiSave, FiVolume2, FiType } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../utils/axiosInstance';

const exerciseTypes = [
  { id: 'translation', label: 'Translation', icon: <FiGlobe /> },
  { id: 'transcription', label: 'Transcription', icon: <FiMic /> },
  { id: 'mcq', label: 'Multiple Choice', icon: '🔠' },
  { id: 'fill-blank', label: 'Fill in Blank', icon: '📝' },
];

export default function ExerciseBuilder({ courseData }) {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    type: 'mcq',
    question: '',
    sourceText: '',
    targetLanguage: courseData?.targetLanguage || '',
    options: [{ text: '', isCorrect: false }],
    correctAnswer: '',
    points: 1,
    explanation: '',
    audioPrompt: '',
    difficulty: 'beginner'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'existing'

  useEffect(() => {
    if (courseData?._id) {
      fetchExercises();
    }
  }, [courseData?._id]);

  const fetchExercises = async () => {
    try {
      const response = await axiosInstance.get(`/api/content/course/${courseData._id}`);
      const courseExercises = response.data.filter(item => item.type === 'exercise');
      setExercises(courseExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error loading exercises',
        text: 'Failed to load existing exercises'
      });
    }
  };

  const handleGenerateExercise = async () => {
    if (!currentExercise.question.trim() && currentExercise.type !== 'transcription') {
      Swal.fire({
        icon: 'warning',
        title: 'Missing context',
        text: 'Please provide some context or a topic for the AI to generate exercises'
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axiosInstance.post('/api/content/ai/generate', {
        courseId: courseData._id,
        contentType: 'exercises',
        topic: currentExercise.question || 'Language exercise',
        options: {
          questionType: currentExercise.type,
          count: 1,
          difficulty: currentExercise.difficulty,
          language: courseData.language
        }
      });
      
      if (response.data.success) {
        const generatedContent = response.data.generatedContent;
        
        if (Array.isArray(generatedContent) && generatedContent.length > 0) {
          const exercise = generatedContent[0];
          setCurrentExercise(prev => ({
            ...prev,
            question: exercise.questionText || exercise.question || prev.question,
            options: exercise.options || prev.options,
            correctAnswer: exercise.correctAnswer || prev.correctAnswer,
            explanation: exercise.explanation || prev.explanation,
            sourceText: exercise.sourceText || prev.sourceText
          }));
          
          Swal.fire({
            icon: 'success',
            title: 'Exercise generated!',
            text: 'AI has created an exercise for you',
            timer: 2000,
            showConfirmButton: false
          });
        } else if (typeof generatedContent === 'string') {
          // Handle string response for translation/transcription
          setCurrentExercise(prev => ({
            ...prev,
            sourceText: generatedContent
          }));
        }
      } else {
        throw new Error(response.data.message || 'Failed to generate exercise');
      }
    } catch (error) {
      console.error('Exercise generation failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to generate exercise',
        text: error.response?.data?.message || error.message || 'Using mock data for demonstration'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddExercise = async () => {
    // Validation based on exercise type
    if (!currentExercise.question.trim() && currentExercise.type !== 'transcription') {
      Swal.fire({
        icon: 'warning',
        title: 'Missing question',
        text: 'Please provide exercise instructions'
      });
      return;
    }

    if (currentExercise.type === 'mcq') {
      const hasCorrectOption = currentExercise.options.some(opt => opt.isCorrect);
      if (!hasCorrectOption) {
        Swal.fire({
          icon: 'warning',
          title: 'No correct option',
          text: 'Please mark one option as correct'
        });
        return;
      }
      if (currentExercise.options.length < 2) {
        Swal.fire({
          icon: 'warning',
          title: 'Not enough options',
          text: 'Please add at least 2 options for multiple choice'
        });
        return;
      }
    }

    if (currentExercise.type === 'fill-blank' && !currentExercise.correctAnswer.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing answer',
        text: 'Please provide the correct answer for the blank'
      });
      return;
    }

    if (currentExercise.type === 'translation' && !currentExercise.sourceText.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing source text',
        text: 'Please provide text to translate'
      });
      return;
    }

    setIsSaving(true);
    try {
      const exerciseData = {
        courseID: courseData._id,
        title: `${currentExercise.type.charAt(0).toUpperCase() + currentExercise.type.slice(1)} Exercise`,
        type: 'exercise',
        content: JSON.stringify(currentExercise),
        order: exercises.length + 1,
        questions: [currentExercise],
        difficulty: currentExercise.difficulty,
        points: currentExercise.points
      };

      const response = await axiosInstance.post('/api/content', exerciseData);
      
      Swal.fire({
        icon: 'success',
        title: 'Exercise saved!',
        text: 'Your exercise has been saved successfully',
        timer: 2000,
        showConfirmButton: false
      });
      
      // Refresh exercises list
      fetchExercises();
      
      // Reset form
      setCurrentExercise({
        type: 'mcq',
        question: '',
        sourceText: '',
        targetLanguage: courseData?.targetLanguage || '',
        options: [{ text: '', isCorrect: false }],
        correctAnswer: '',
        points: 1,
        explanation: '',
        audioPrompt: '',
        difficulty: 'beginner'
      });
    } catch (error) {
      console.error('Failed to save exercise:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to save exercise',
        text: error.response?.data?.message || error.message
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddOption = () => {
    setCurrentExercise(prev => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }]
    }));
  };

  const handleRemoveOption = (index) => {
    if (currentExercise.options.length > 1) {
      const newOptions = [...currentExercise.options];
      newOptions.splice(index, 1);
      setCurrentExercise(prev => ({ ...prev, options: newOptions }));
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...currentExercise.options];
    newOptions[index][field] = value;
    setCurrentExercise(prev => ({ ...prev, options: newOptions }));
  };

  const handleDeleteExercise = async (exerciseId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/api/content/${exerciseId}`);
        Swal.fire('Deleted!', 'Exercise has been deleted.', 'success');
        fetchExercises();
      } catch (error) {
        console.error('Failed to delete exercise:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete exercise',
          text: error.response?.data?.message || error.message
        });
      }
    }
  };

  const renderExerciseForm = () => {
    switch (currentExercise.type) {
      case 'translation':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Source Text *</label>
              <textarea
                value={currentExercise.sourceText}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, sourceText: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={3}
                placeholder="Enter text to be translated..."
              />
            </div>
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
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Instructions *</label>
              <textarea
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={2}
                placeholder="e.g., Translate the text to Spanish..."
              />
            </div>
          </div>
        );

      case 'transcription':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Audio Description</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiVolume2 className="text-gray-600" />
                <input
                  type="text"
                  value={currentExercise.audioPrompt}
                  onChange={(e) => setCurrentExercise(prev => ({ ...prev, audioPrompt: e.target.value }))}
                  className="flex-1 p-2 border border-gray-200 rounded focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                  placeholder="Describe the audio content or upload an audio file..."
                />
                <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded text-sm">
                  Upload Audio
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Instructions *</label>
              <textarea
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={2}
                placeholder="e.g., Transcribe the audio clip below..."
              />
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sentence with Blank *</label>
              <textarea
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={2}
                placeholder="e.g., The capital of France is ______."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Correct Answer *</label>
              <input
                type="text"
                value={currentExercise.correctAnswer}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, correctAnswer: e.target.value }))}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                placeholder="Enter the correct answer..."
              />
            </div>
          </div>
        );

      case 'mcq':
      default:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Question *</label>
              <textarea
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                rows={3}
                placeholder="Enter your question here..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Options *</label>
              {currentExercise.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newOptions = currentExercise.options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index
                      }));
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
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-400 hover:text-red-600 p-1"
                    disabled={currentExercise.options.length <= 1}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="flex items-center text-sm text-[#C35029] hover:text-[#a04020] mt-1"
              >
                <FiPlus size={16} className="mr-1" /> Add Option
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'create'
              ? 'border-b-2 border-[#C35029] text-[#C35029]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Create Exercise
        </button>
        <button
          onClick={() => setActiveTab('existing')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'existing'
              ? 'border-b-2 border-[#C35029] text-[#C35029]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Existing Exercises ({exercises.length})
        </button>
      </div>

      {/* Existing Exercises */}
      {activeTab === 'existing' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Exercises</h3>
          {exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiType size={48} className="mx-auto mb-4 text-gray-300" />
              <p>No exercises created yet</p>
              <p className="text-sm">Create your first exercise using the "Create Exercise" tab</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise) => {
                const exerciseContent = JSON.parse(exercise.content || '{}');
                return (
                  <div key={exercise._id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs font-medium bg-[#ef9273] text-white rounded-full capitalize">
                          {exerciseContent.type}
                        </span>
                        <span className="text-sm text-gray-500">• {exerciseContent.points || 1} points</span>
                      </div>
                      <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                      <p className="text-sm text-gray-600 truncate">
                        {exerciseContent.question || exerciseContent.sourceText || 'No description'}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteExercise(exercise._id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Exercise Builder */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#C35029]">Create New Exercise</h2>
            <p className="text-gray-500 text-sm mt-1">Build exercises for {courseData?.title}</p>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Exercise Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {exerciseTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => setCurrentExercise(prev => ({ 
                          ...prev, 
                          type: type.id,
                          options: type.id === 'mcq' ? prev.options : []
                        }))}
                        className={`p-3 rounded-lg border transition-colors flex flex-col items-center gap-1 ${
                          currentExercise.type === type.id
                            ? 'bg-[#C35029] text-white border-[#C35029]'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg">{type.icon}</span>
                        <span className="text-xs font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
                  <select
                    value={currentExercise.difficulty}
                    onChange={(e) => setCurrentExercise(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Points</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={currentExercise.points}
                    onChange={(e) => setCurrentExercise(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {renderExerciseForm()}
                
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
            </div>
            
            <div className="flex flex-wrap justify-between gap-3 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
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
                      <FiAward className="mr-2" /> AI Generate
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setCurrentExercise({
                      type: 'mcq',
                      question: '',
                      sourceText: '',
                      targetLanguage: courseData?.targetLanguage || '',
                      options: [{ text: '', isCorrect: false }],
                      correctAnswer: '',
                      points: 1,
                      explanation: '',
                      audioPrompt: '',
                      difficulty: 'beginner'
                    });
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors flex items-center"
                >
                  <FiTrash2 className="mr-2" /> Clear Form
                </button>
              </div>
              
              <button
                onClick={handleAddExercise}
                disabled={isSaving}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" /> Save Exercise
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}