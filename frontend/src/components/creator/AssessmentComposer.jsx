// import { useState, useEffect } from 'react';
// import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
// import { axiosInstance } from '../../utils/axiosInstance';

// export default function AssessmentComposer({ courseData }) {
//   const [assessment, setAssessment] = useState({
//     title: '',
//     questions: [],
//     passingScore: 70,
//     timeLimit: 30 // minutes
//   });
//   const [newQuestion, setNewQuestion] = useState({
//     text: '',
//     type: 'mcq',
//     options: [{ text: '', isCorrect: false }],
//     points: 1
//   });
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const loadAssessment = async () => {
//       try {
//         // Try to load existing assessment for this course
//         const response = await axiosInstance.get(`/api/content/course/${courseData._id}`);
//         const content = response.data;
//         const assessmentContent = content.find(item => item.type === 'assessment');
        
//         if (assessmentContent) {
//           setAssessment(JSON.parse(assessmentContent.content));
//         }
//       } catch (error) {
//         console.log('No existing assessment found');
//       }
//     };
    
//     loadAssessment();
//   }, [courseData._id]);

//   const handleAddQuestion = () => {
//     if (!newQuestion.text.trim()) return;
    
//     setAssessment(prev => ({
//       ...prev,
//       questions: [...prev.questions, newQuestion]
//     }));
    
//     // Reset new question form
//     setNewQuestion({
//       text: '',
//       type: 'mcq',
//       options: [{ text: '', isCorrect: false }],
//       points: 1
//     });
//   };

//   const handleGenerateQuestions = async () => {
//     if (!assessment.title) {
//       alert('Please set an assessment title first');
//       return;
//     }
    
//     setIsGenerating(true);
//     try {
//       const response = await axiosInstance.post('/api/content/ai/generate', {
//         courseId: courseData._id,
//         contentType: 'exercises',
//         topic: assessment.title,
//         options: {
//           questionType: 'mcq',
//           count: 5
//         }
//       });
      
//       if (response.data.success) {
//         const generatedQuestions = response.data.generatedContent;
        
//         if (Array.isArray(generatedQuestions)) {
//           setAssessment(prev => ({
//             ...prev,
//             questions: [...prev.questions, ...generatedQuestions]
//           }));
//         }
//       } else {
//         throw new Error(response.data.message || 'Failed to generate questions');
//       }
//     } catch (error) {
//       console.error('Question generation failed:', error);
//       alert('Failed to generate questions: ' + error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleAddOption = () => {
//     setNewQuestion(prev => ({
//       ...prev,
//       options: [...prev.options, { text: '', isCorrect: false }]
//     }));
//   };

//   const handleOptionChange = (index, field, value) => {
//     const updatedOptions = [...newQuestion.options];
//     updatedOptions[index][field] = value;
//     setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
//   };

//   const handleSaveAssessment = async () => {
//     if (assessment.questions.length === 0) {
//       alert('Please add at least one question');
//       return;
//     }
    
//     if (!assessment.title.trim()) {
//       alert('Please provide an assessment title');
//       return;
//     }

//     setIsSaving(true);
//     try {
//       const assessmentData = {
//         course: courseData._id,
//         title: assessment.title,
//         type: 'assessment',
//         content: JSON.stringify(assessment),
//         order: 999 // Assessments typically come last
//       };

//       await axiosInstance.post('/api/content', assessmentData);
//       alert('Assessment saved successfully!');
//     } catch (error) {
//       console.error('Failed to save assessment:', error);
//       alert('Failed to save assessment: ' + (error.response?.data?.message || error.message));
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Assessment Setup</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium mb-1">Assessment Title *</label>
//             <input
//               type="text"
//               value={assessment.title}
//               onChange={(e) => setAssessment({...assessment, title: e.target.value})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//               placeholder="Final Exam"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
//             <input
//               type="number"
//               min="0"
//               max="100"
//               value={assessment.passingScore}
//               onChange={(e) => setAssessment({...assessment, passingScore: e.target.value})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
//             <input
//               type="number"
//               min="1"
//               value={assessment.timeLimit}
//               onChange={(e) => setAssessment({...assessment, timeLimit: e.target.value})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//             />
//           </div>
//         </div>
//       </div>
      
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-lg font-medium mb-4">Add New Question</h3>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Question Type</label>
//             <select
//               value={newQuestion.type}
//               onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value, options: e.target.value === 'mcq' ? newQuestion.options : []})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//             >
//               <option value="mcq">Multiple Choice</option>
//               <option value="essay">Essay</option>
//               <option value="short-answer">Short Answer</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Question Text *</label>
//             <textarea
//               value={newQuestion.text}
//               onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//               rows={3}
//               placeholder="Enter your question here..."
//             />
//           </div>
          
//           {newQuestion.type === 'mcq' && (
//             <div>
//               <label className="block text-sm font-medium mb-2">Options</label>
//               {newQuestion.options.map((option, index) => (
//                 <div key={index} className="flex items-center mb-2">
//                   <input
//                     type="checkbox"
//                     checked={option.isCorrect}
//                     onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
//                     className="h-5 w-5 text-[#C35029] focus:ring-[#C35029]"
//                   />
//                   <input
//                     type="text"
//                     value={option.text}
//                     onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
//                     className="ml-2 flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//                     placeholder={`Option ${index + 1}`}
//                   />
//                   {index > 0 && (
//                     <button
//                       onClick={() => {
//                         const updatedOptions = [...newQuestion.options];
//                         updatedOptions.splice(index, 1);
//                         setNewQuestion({...newQuestion, options: updatedOptions});
//                       }}
//                       className="ml-2 text-red-500 p-1 hover:text-red-700"
//                     >
//                       <FiTrash2 size={18} />
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <button
//                 onClick={handleAddOption}
//                 className="mt-2 text-sm text-[#C35029] hover:text-[#a04020] flex items-center"
//               >
//                 <FiPlus size={16} className="mr-1" /> Add Option
//               </button>
//             </div>
//           )}
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Points</label>
//             <input
//               type="number"
//               min="1"
//               value={newQuestion.points}
//               onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 1})}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
//             />
//           </div>
          
//           <div className="flex justify-between pt-2">
//             <button
//               onClick={handleAddQuestion}
//               disabled={!newQuestion.text.trim()}
//               className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50"
//             >
//               Add Question
//             </button>
            
//             <button
//               onClick={handleGenerateQuestions}
//               disabled={isGenerating}
//               className="px-4 py-2 bg-[#f8e1d8] hover:bg-[#ef9273] text-[#C35029] rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isGenerating ? 'Generating...' : 'AI Suggest Questions'}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {assessment.questions.length > 0 && (
//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium">Assessment Questions ({assessment.questions.length})</h3>
//             <button
//               onClick={handleSaveAssessment}
//               disabled={isSaving}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
//             >
//               {isSaving ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <FiSave className="mr-2" /> Save Assessment
//                 </>
//               )}
//             </button>
//           </div>
          
//           <div className="space-y-4">
//             {assessment.questions.map((question, qIndex) => (
//               <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
//                 <div className="flex justify-between items-start">
//                   <div className="font-medium">
//                     {question.text} ({question.points} point{question.points !== 1 ? 's' : ''})
//                   </div>
//                   <button
//                     onClick={() => {
//                       const updatedQuestions = [...assessment.questions];
//                       updatedQuestions.splice(qIndex, 1);
//                       setAssessment({...assessment, questions: updatedQuestions});
//                     }}
//                     className="text-red-500 hover:text-red-700 p-1"
//                   >
//                     <FiTrash2 size={18} />
//                   </button>
//                 </div>
                
//                 {question.type === 'mcq' && question.options?.length > 0 && (
//                   <ul className="mt-2 ml-6 list-disc">
//                     {question.options.map((option, oIndex) => (
//                       <li key={oIndex} className={option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}>
//                         {option.text} {option.isCorrect && '(Correct)'}
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



















import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { axiosInstance } from '../../utils/axiosInstance';

export default function AssessmentComposer({ courseData, refreshContent }) {
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
  const [isSaving, setIsSaving] = useState(false);
  const [existingAssessment, setExistingAssessment] = useState(null);

  useEffect(() => {
    loadAssessment();
  }, [courseData._id]);

  const loadAssessment = async () => {
    try {
      const response = await axiosInstance.get(`/api/content/course/${courseData._id}`);
      if (response.data.success) {
        const assessmentContent = response.data.content.find(item => item.type === 'assessment');
        if (assessmentContent) {
          setExistingAssessment(assessmentContent);
          setAssessment(assessmentContent.content || {
            title: assessmentContent.title,
            questions: assessmentContent.questions || [],
            passingScore: assessmentContent.passingScore || 70,
            timeLimit: assessmentContent.timeLimit || 30
          });
        }
      }
    } catch (error) {
      console.log('No existing assessment found');
    }
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Question',
        text: 'Please enter question text',
        confirmButtonColor: '#C35029'
      });
      return;
    }
    
    setAssessment(prev => ({
      ...prev,
      questions: [...prev.questions, { ...newQuestion, id: Date.now().toString() }]
    }));
    
    setNewQuestion({
      text: '',
      type: 'mcq',
      options: [{ text: '', isCorrect: false }],
      points: 1
    });
  };

  const handleGenerateQuestions = async () => {
    if (!assessment.title) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Title',
        text: 'Please set an assessment title first',
        confirmButtonColor: '#C35029'
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post('/api/content/ai/generate', {
        courseId: courseData._id,
        contentType: 'exercises',
        topic: assessment.title,
        options: {
          questionType: 'mcq',
          count: 5
        }
      });
      
      if (response.data.success) {
        const generatedQuestions = response.data.generatedContent;
        
        if (Array.isArray(generatedQuestions)) {
          setAssessment(prev => ({
            ...prev,
            questions: [...prev.questions, ...generatedQuestions.map((q, i) => ({
              ...q,
              id: `gen-${Date.now()}-${i}`
            }))]
          }));
          
          Swal.fire({
            icon: 'success',
            title: 'Questions Generated!',
            text: 'AI has suggested questions for your assessment.',
            confirmButtonColor: '#C35029',
            timer: 2000
          });
        }
      } else {
        throw new Error(response.data.message || 'Failed to generate questions');
      }
    } catch (error) {
      console.error('Question generation failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Generation Failed',
        text: 'Failed to generate questions: ' + error.message,
        confirmButtonColor: '#C35029'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }]
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index][field] = value;
    
    // If setting isCorrect to true, ensure only one option is correct
    if (field === 'isCorrect' && value === true) {
      updatedOptions.forEach((opt, i) => {
        if (i !== index) opt.isCorrect = false;
      });
    }
    
    setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleSaveAssessment = async () => {
    if (assessment.questions.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Questions',
        text: 'Please add at least one question',
        confirmButtonColor: '#C35029'
      });
      return;
    }
    
    if (!assessment.title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Title',
        text: 'Please provide an assessment title',
        confirmButtonColor: '#C35029'
      });
      return;
    }

    setIsSaving(true);
    try {
      const assessmentData = {
        course: courseData._id,
        title: assessment.title,
        type: 'assessment',
        content: assessment,
        questions: assessment.questions,
        passingScore: assessment.passingScore,
        timeLimit: assessment.timeLimit,
        order: 999
      };

      let response;
      if (existingAssessment) {
        response = await axiosInstance.put(`/api/content/${existingAssessment._id}`, assessmentData);
      } else {
        response = await axiosInstance.post('/api/content', assessmentData);
      }
      
      if (response.data.success) {
        refreshContent();
        await Swal.fire({
          icon: 'success',
          title: 'Saved!',
          text: 'Assessment saved successfully!',
          confirmButtonColor: '#C35029',
          timer: 2000
        });
      } else {
        throw new Error(response.data.message || 'Failed to save assessment');
      }
    } catch (error) {
      console.error('Failed to save assessment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Save Failed',
        text: 'Failed to save assessment: ' + (error.response?.data?.message || error.message),
        confirmButtonColor: '#C35029'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveQuestion = (index) => {
    setAssessment(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-[#C35029] mb-4">Assessment Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Assessment Title *</label>
            <input
              type="text"
              value={assessment.title}
              onChange={(e) => setAssessment({...assessment, title: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
              placeholder="Final Exam"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={assessment.passingScore}
              onChange={(e) => setAssessment({...assessment, passingScore: parseInt(e.target.value) || 70})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
            <input
              type="number"
              min="1"
              value={assessment.timeLimit}
              onChange={(e) => setAssessment({...assessment, timeLimit: parseInt(e.target.value) || 30})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h3 className="text-lg font-medium text-[#C35029] mb-4">Add New Question</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question Type</label>
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({
                ...newQuestion, 
                type: e.target.value, 
                options: e.target.value === 'mcq' ? newQuestion.options : []
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="fill-blank">Fill in the Blank</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Question Text *</label>
            <textarea
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
              rows={3}
              placeholder="Enter your question here..."
            />
          </div>
          
          {newQuestion.type === 'mcq' && (
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                    className="h-5 w-5 text-[#C35029] focus:ring-[#C35029]"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="ml-2 flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                    placeholder={`Option ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const updatedOptions = [...newQuestion.options];
                        updatedOptions.splice(index, 1);
                        setNewQuestion({...newQuestion, options: updatedOptions});
                      }}
                      className="ml-2 text-red-500 p-1 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="mt-2 text-sm text-[#C35029] hover:text-[#a04020] flex items-center transition-colors"
              >
                <FiPlus size={16} className="mr-1" /> Add Option
              </button>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Points</label>
            <input
              type="number"
              min="1"
              value={newQuestion.points}
              onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 1})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <button
              onClick={handleAddQuestion}
              disabled={!newQuestion.text.trim()}
              className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors disabled:opacity-50"
            >
              Add Question
            </button>
            
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#f8e1d8] hover:bg-[#ef9273] text-[#C35029] rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isGenerating ? 'Generating...' : 'AI Suggest Questions'}
            </button>
          </div>
        </div>
      </div>
      
      {assessment.questions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-[#C35029]">
              Assessment Questions ({assessment.questions.length})
            </h3>
            <button
              onClick={handleSaveAssessment}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Assessment
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            {assessment.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-medium flex-1">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm mr-2">
                      Q{qIndex + 1}
                    </span>
                    {question.text} 
                    <span className="ml-2 text-sm text-gray-500">({question.points} point{question.points !== 1 ? 's' : ''})</span>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(qIndex)}
                    className="text-red-500 hover:text-red-700 p-1 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
                
                {question.type === 'mcq' && question.options?.length > 0 && (
                  <ul className="mt-2 ml-6 space-y-1">
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex} className={option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}>
                        • {option.text} {option.isCorrect && '✓'}
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