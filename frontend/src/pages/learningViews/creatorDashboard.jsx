// import { useState, useEffect } from 'react';
// import { CourseList, CourseOutlineGenerator, LessonEditor, ExerciseBuilder, AssessmentComposer } from '../../components/creator';
// import { axiosInstance } from '../../utils/axiosInstance';

// export default function CreatorDashboard() {
//   const [activeTab, setActiveTab] = useState('list');
//   const [savedCourse, setSavedCourse] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [user, setUser] = useState(null);

//   // Get user from session storage on component mount
//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
//     setUser(userData);
//   }, []);

//   const getTabs = () => {
//     if (!savedCourse) {
//       return [
//         { id: 'list', label: 'My Courses', icon: '📚' }
//       ];
//     }
    
//     return [
//       { id: 'list', label: 'My Courses', icon: '📚' },
//       { id: 'course', label: 'Outline', icon: '📋' },
//       { id: 'lessons', label: 'Lessons', icon: '📖' },
//       { id: 'exercises', label: 'Exercises', icon: '💪' },
//       { id: 'assessments', label: 'Tests', icon: '📝' }
//     ];
//   };

//   const tabs = getTabs();

//   const handleCreateCourse = async (courseData) => {
//     if (!courseData.title || !courseData.description) {
//       alert('Please enter both course title and description');
//       return;
//     }

//     if (!user || !user._id) {
//       alert('User information not found. Please log in again.');
//       return;
//     }

//     setIsCreating(true);
//     try {
//       // Add user ID directly to the request body
//       const response = await axiosInstance.post('/api/courses', {
//         ...courseData,
//         userId: user._id, // Add user ID directly to the request
//         duration: 0,
//         price: 0
//       });
      
//       setSavedCourse(response.data);
//       setActiveTab('course');
//       alert('Course created successfully!');
//     } catch (error) {
//       console.error('Failed to create course:', error);
//       alert('Failed to create course: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleSelectCourse = (course) => {
//     setSavedCourse(course);
//     setActiveTab('course');
//   };

//   const handleBackToList = () => {
//     setSavedCourse(null);
//     setActiveTab('list');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C35029] to-orange-600 bg-clip-text text-transparent mb-1">
//                 LexiRise Creator Studio
//               </h1>
//               <p className="text-gray-600 font-medium">
//                 {savedCourse ? `Editing: ${savedCourse.title}` : `Welcome, ${user?.fullName || user?.name || 'Creator'}`}
//               </p>
//             </div>
            
//             {savedCourse && (
//               <button
//                 onClick={handleBackToList}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
//               >
//                 ← Back to Courses
//               </button>
//             )}
//           </div>
          
//           {/* Tab navigation - only show when relevant */}
//           {tabs.length > 1 && (
//             <nav className="flex space-x-2 mt-6 overflow-x-auto pb-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap min-w-[120px] justify-center ${
//                     activeTab === tab.id 
//                       ? 'bg-[#C35029] text-white shadow-lg' 
//                       : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300'
//                   }`}
//                 >
//                   <span className="mr-2 text-lg">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           )}
//         </header>

//         <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-md min-h-[500px]">
//           {activeTab === 'list' && (
//             <CourseList 
//               onSelectCourse={handleSelectCourse}
//               onCreateCourse={handleCreateCourse}
//               isCreating={isCreating}
//             />
//           )}
          
//           {activeTab === 'course' && savedCourse && (
//             <CourseOutlineGenerator 
//               courseData={savedCourse} 
//               setCourseData={setSavedCourse} 
//             />
//           )}
          
//           {activeTab === 'lessons' && savedCourse && <LessonEditor courseData={savedCourse} />}
//           {activeTab === 'exercises' && savedCourse && <ExerciseBuilder courseData={savedCourse} />}
//           {activeTab === 'assessments' && savedCourse && <AssessmentComposer courseData={savedCourse} />}
//         </main>
//       </div>
//     </div>
//   );
// }












// import { useState, useEffect } from 'react';
// import { CourseList, CourseOutlineGenerator, LessonEditor, ExerciseBuilder, AssessmentComposer } from '../../components/creator';
// import { axiosInstance } from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// export default function CreatorDashboard() {
//   const [activeTab, setActiveTab] = useState('list');
//   const [savedCourse, setSavedCourse] = useState(null);
//   const [isCreating, setIsCreating] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
//     setUser(userData);
//   }, []);

//   const getTabs = () => {
//     if (!savedCourse) {
//       return [
//         { id: 'list', label: 'My Courses', icon: '📚' }
//       ];
//     }
    
//     return [
//       { id: 'list', label: 'My Courses', icon: '📚' },
//       { id: 'course', label: 'Outline', icon: '📋' },
//       { id: 'lessons', label: 'Lessons', icon: '📖' },
//       { id: 'exercises', label: 'Exercises', icon: '💪' },
//       { id: 'assessments', label: 'Tests', icon: '📝' }
//     ];
//   };

//   const tabs = getTabs();

//   const handleCreateCourse = async (courseData) => {
//     if (!courseData.title || !courseData.description) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing fields',
//         text: 'Please enter both course title and description'
//       });
//       return;
//     }

//     if (!user || !user._id) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication required',
//         text: 'Please log in again'
//       });
//       return;
//     }

//     setIsCreating(true);
//     try {
//       const response = await axiosInstance.post('/api/courses', {
//         ...courseData,
//         userId: user._id,
//         duration: 0,
//         price: 0
//       });
      
//       setSavedCourse(response.data);
//       setActiveTab('course');
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Course created!',
//         text: 'Your course has been created successfully',
//         timer: 2000,
//         showConfirmButton: false
//       });
//     } catch (error) {
//       console.error('Failed to create course:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to create course',
//         text: error.response?.data?.message || error.message
//       });
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   const handleSelectCourse = (course) => {
//     setSavedCourse(course);
//     setActiveTab('course');
//   };

//   const handleBackToList = () => {
//     setSavedCourse(null);
//     setActiveTab('list');
//   };

//   const handleUpdateCourse = (updatedCourse) => {
//     setSavedCourse(updatedCourse);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50">
//           <div className="flex justify-between items-center mb-4">
//             <div>
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C35029] to-orange-600 bg-clip-text text-transparent mb-1">
//                 LexiRise Creator Studio
//               </h1>
//               <p className="text-gray-600 font-medium">
//                 {savedCourse ? `Editing: ${savedCourse.title}` : `Welcome, ${user?.fullName || user?.name || 'Creator'}`}
//               </p>
//             </div>
            
//             {savedCourse && (
//               <button
//                 onClick={handleBackToList}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
//               >
//                 ← Back to Courses
//               </button>
//             )}
//           </div>
          
//           {tabs.length > 1 && (
//             <nav className="flex space-x-2 mt-6 overflow-x-auto pb-2">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap min-w-[120px] justify-center ${
//                     activeTab === tab.id 
//                       ? 'bg-[#C35029] text-white shadow-lg' 
//                       : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300'
//                   }`}
//                 >
//                   <span className="mr-2 text-lg">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           )}
//         </header>

//         <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-md min-h-[500px]">
//           {activeTab === 'list' && (
//             <CourseList 
//               onSelectCourse={handleSelectCourse}
//               onCreateCourse={handleCreateCourse}
//               isCreating={isCreating}
//             />
//           )}
          
//           {activeTab === 'course' && savedCourse && (
//             <CourseOutlineGenerator 
//               courseData={savedCourse} 
//               setCourseData={handleUpdateCourse} 
//             />
//           )}
          
//           {activeTab === 'lessons' && savedCourse && (
//             <LessonEditor courseData={savedCourse} />
//           )}
          
//           {activeTab === 'exercises' && savedCourse && (
//             <ExerciseBuilder courseData={savedCourse} />
//           )}
          
//           {activeTab === 'assessments' && savedCourse && (
//             <AssessmentComposer courseData={savedCourse} />
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCheck, FiAward, FiSave, FiVolume2, FiType } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../utils/axiosInstance';

const exerciseTypes = [
  { id: 'translation', label: 'Translation', icon: '🌐' },
  { id: 'transcription', label: 'Transcription', icon: '🎤' },
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
  const [activeTab, setActiveTab] = useState('create');

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
    }
  };

  const handleGenerateExercise = async () => {
    if (!currentExercise.question.trim() && currentExercise.type !== 'transcription') {
      Swal.fire('Warning', 'Please provide some context for the AI', 'warning');
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
          Swal.fire('Success', 'Exercise generated!', 'success');
        }
      }
    } catch (error) {
      console.error('Exercise generation failed:', error);
      Swal.fire('Error', 'Failed to generate exercise', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddExercise = async () => {
    // Validation
    if (!currentExercise.question.trim() && currentExercise.type !== 'transcription') {
      Swal.fire('Warning', 'Please provide exercise instructions', 'warning');
      return;
    }

    if (currentExercise.type === 'mcq') {
      const hasCorrectOption = currentExercise.options.some(opt => opt.isCorrect);
      if (!hasCorrectOption) {
        Swal.fire('Warning', 'Please mark one option as correct', 'warning');
        return;
      }
    }

    setIsSaving(true);
    try {
      const exerciseData = {
        courseID: courseData._id,
        title: `${currentExercise.type} Exercise`,
        type: 'exercise',
        content: JSON.stringify(currentExercise),
        order: exercises.length + 1,
        questions: [currentExercise],
        difficulty: currentExercise.difficulty,
        points: currentExercise.points
      };

      await axiosInstance.post('/api/content', exerciseData);
      Swal.fire('Success', 'Exercise saved!', 'success');
      fetchExercises();
      resetForm();
    } catch (error) {
      console.error('Failed to save exercise:', error);
      Swal.fire('Error', 'Failed to save exercise', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
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
        Swal.fire('Error', 'Failed to delete exercise', 'error');
      }
    }
  };

  const renderExerciseForm = () => {
    switch (currentExercise.type) {
      case 'translation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source Text *</label>
              <textarea
                value={currentExercise.sourceText}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, sourceText: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                rows={3}
                placeholder="Enter text to be translated..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
              <input
                type="text"
                value={currentExercise.targetLanguage}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, targetLanguage: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="e.g., Spanish, French, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
              <input
                type="text"
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="e.g., Translate the text to Spanish..."
              />
            </div>
          </div>
        );

      case 'transcription':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audio Description</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentExercise.audioPrompt}
                  onChange={(e) => setCurrentExercise(prev => ({ ...prev, audioPrompt: e.target.value }))}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  placeholder="Describe the audio content..."
                />
                <button className="px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                  Upload
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instructions *</label>
              <input
                type="text"
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="e.g., Transcribe the audio clip..."
              />
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sentence with Blank *</label>
              <input
                type="text"
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="e.g., The capital of France is ______."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer *</label>
              <input
                type="text"
                value={currentExercise.correctAnswer}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, correctAnswer: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                placeholder="Enter the correct answer..."
              />
            </div>
          </div>
        );

      case 'mcq':
      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
              <textarea
                value={currentExercise.question}
                onChange={(e) => setCurrentExercise(prev => ({ ...prev, question: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                rows={3}
                placeholder="Enter your question here..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
              {currentExercise.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => {
                      const newOptions = currentExercise.options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index
                      }));
                      setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                    }}
                    className={`h-6 w-6 rounded border-2 flex items-center justify-center ${
                      option.isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
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
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => {
                      if (currentExercise.options.length > 1) {
                        const newOptions = currentExercise.options.filter((_, i) => i !== index);
                        setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                      }
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  setCurrentExercise(prev => ({
                    ...prev,
                    options: [...prev.options, { text: '', isCorrect: false }]
                  }));
                }}
                className="flex items-center gap-2 text-[#C35029] hover:text-[#a04020]"
              >
                <FiPlus size={16} />
                Add Option
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Simple Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-6 py-3 font-medium border-b-2 ${
            activeTab === 'create' 
              ? 'border-[#C35029] text-[#C35029]' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Create Exercise
        </button>
        <button
          onClick={() => setActiveTab('existing')}
          className={`px-6 py-3 font-medium border-b-2 ${
            activeTab === 'existing' 
              ? 'border-[#C35029] text-[#C35029]' 
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Existing Exercises ({exercises.length})
        </button>
      </div>

      {/* Existing Exercises */}
      {activeTab === 'existing' && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">Existing Exercises</h3>
          {exercises.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiType size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No exercises created yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise) => {
                const content = JSON.parse(exercise.content || '{}');
                return (
                  <div key={exercise._id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs bg-[#C35029] text-white rounded">
                          {content.type}
                        </span>
                        <span className="text-sm text-gray-500">{content.points} points</span>
                      </div>
                      <p className="font-medium">{content.question || content.sourceText}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteExercise(exercise._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
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

      {/* Create Exercise */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-6">Create New Exercise</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Exercise Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {exerciseTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setCurrentExercise(prev => ({ 
                        ...prev, 
                        type: type.id,
                        options: type.id === 'mcq' ? prev.options : []
                      }))}
                      className={`p-4 border-2 rounded-lg text-center ${
                        currentExercise.type === type.id
                          ? 'border-[#C35029] bg-[#f8e1d8]'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={currentExercise.difficulty}
                    onChange={(e) => setCurrentExercise(prev => ({ ...prev, difficulty: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Points</label>
                  <input
                    type="number"
                    min="1"
                    value={currentExercise.points}
                    onChange={(e) => setCurrentExercise(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {renderExerciseForm()}
              
              <div>
                <label className="block text-sm font-medium mb-2">Explanation</label>
                <textarea
                  value={currentExercise.explanation}
                  onChange={(e) => setCurrentExercise(prev => ({ ...prev, explanation: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Add explanation for correct answer..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t">
            <button
              onClick={handleGenerateExercise}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020] disabled:opacity-50"
            >
              <FiAward size={18} />
              {isGenerating ? 'Generating...' : 'AI Generate'}
            </button>
            
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Clear
            </button>
            
            <button
              onClick={handleAddExercise}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 ml-auto"
            >
              <FiSave size={18} />
              {isSaving ? 'Saving...' : 'Save Exercise'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}