// import { useState } from 'react';
// import { FiBook, FiGlobe, FiAward, FiEdit2, FiLoader } from 'react-icons/fi';

// export default function CourseOutlineGenerator({ courseData, setCourseData }) {
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [outline, setOutline] = useState('');

//   const handleGenerateOutline = async () => {
//     if (!courseData.title) return;
    
//     setIsGenerating(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock response
//       const mockOutline = `# ${courseData.title} Course Outline\n\n` +
//         `## Module 1: Introduction\n` +
//         `- Lesson 1: Basic Concepts\n` +
//         `- Lesson 2: Getting Started\n\n` +
//         `## Module 2: Core Skills\n` +
//         `- Lesson 3: Fundamental Techniques\n` +
//         `- Lesson 4: Practical Applications\n\n` +
//         `## Module 3: Advanced Topics\n` +
//         `- Lesson 5: Complex Scenarios\n` +
//         `- Lesson 6: Real-world Examples`;
      
//       setOutline(mockOutline);
//       setCourseData(prev => ({ ...prev, outline: mockOutline }));
//     } catch (error) {
//       console.error('Outline generation failed:', error);
//       alert('Failed to generate outline. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Setup</h2>
//       <p className="text-gray-500 mb-6">Configure your course foundation before adding content</p>
      
//       <div className="space-y-6">
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
//             <FiBook size={16} /> Course Title
//           </label>
//           <input
//             type="text"
//             value={courseData.title}
//             onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
//             className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             placeholder="e.g., Introduction to Spanish"
//           />
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
//               <FiGlobe size={16} /> Target Language
//             </label>
//             <select
//               value={courseData.language}
//               onChange={(e) => setCourseData({ ...courseData, language: e.target.value })}
//               className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             >
//               <option value="English">English</option>
//               <option value="Spanish">Spanish</option>
//               <option value="French">French</option>
//               <option value="German">German</option>
//               <option value="Japanese">Japanese</option>
//               <option value="Chinese">Chinese</option>
//             </select>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
//               <FiAward size={16} /> Level
//             </label>
//             <select
//               value={courseData.level}
//               onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
//               className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             value={courseData.description}
//             onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
//             rows={3}
//             className="mt-1 block w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//             placeholder="Briefly describe what students will learn..."
//           />
//         </div>
        
//         <div className="space-y-2">
//           <label className="block text-sm font-medium text-gray-700">Course Outline</label>
//           <div className="flex flex-wrap gap-2 mt-1">
//             <button
//               onClick={handleGenerateOutline}
//               disabled={isGenerating || !courseData.title}
//               className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
//             >
//               {isGenerating ? (
//                 <>
//                   <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </>
//               ) : (
//                 <>
//                   <FiLoader size={16} /> AI Suggest Outline
//                 </>
//               )}
//             </button>
//             <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2">
//               <FiEdit2 size={16} /> Manual Edit
//             </button>
//           </div>
//           {outline && (
//             <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200 whitespace-pre-line text-gray-700">
//               {outline}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }











import { useState, useEffect } from 'react';
import { FiBook, FiGlobe, FiAward, FiEdit2, FiLoader } from 'react-icons/fi';

export default function CourseOutlineGenerator({ courseData, setCourseData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [outline, setOutline] = useState('');

  const handleGenerateOutline = async () => {
    if (!courseData.title) return;
    
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockOutline = `# ${courseData.title} Course Outline\n\n` +
        `## Module 1: Introduction\n` +
        `- Lesson 1: Basic Concepts\n` +
        `- Lesson 2: Getting Started\n\n` +
        `## Module 2: Core Skills\n` +
        `- Lesson 3: Fundamental Techniques\n` +
        `- Lesson 4: Practical Applications\n\n` +
        `## Module 3: Advanced Topics\n` +
        `- Lesson 5: Complex Scenarios\n` +
        `- Lesson 6: Real-world Examples`;
      
      setOutline(mockOutline);
      setCourseData(prev => ({ ...prev, outline: mockOutline }));
    } catch (error) {
      console.error('Outline generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-[#C35029] mb-4">Course Setup</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            type="text"
            value={courseData.title}
            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
            placeholder="e.g., Introduction to Spanish"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Language</label>
            <select
              value={courseData.language}
              onChange={(e) => setCourseData({ ...courseData, language: e.target.value })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Level</label>
            <select
              value={courseData.level}
              onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={courseData.description}
            onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Course Outline</label>
          <div className="flex space-x-2 mt-1">
            <button
              onClick={handleGenerateOutline}
              disabled={isGenerating || !courseData.title}
              className="px-4 py-2 bg-[#C35029] text-white rounded-lg disabled:opacity-50 flex items-center"
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
                  <FiLoader className="mr-2" /> AI Suggest Outline
                </>
              )}
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">
              <FiEdit2 className="mr-2 inline" /> Manual Edit
            </button>
          </div>
          {outline && (
            <div className="mt-2 p-3 bg-gray-50 rounded-lg whitespace-pre-line">
              {outline}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}