// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   LessonView,
//   ExerciseView,
//   AssessmentView,
//   ProgressTracker,
// } from '../../components/learn';

// export default function LearningInterface() {
//   const { courseId, section, itemId } = useParams();
//   const [course, setCourse] = useState(null);
//   const [progress, setProgress] = useState({});
//   const [activeTab, setActiveTab] = useState('lessons');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [streak, setStreak] = useState(0);

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         // Fetch course data
//         const courseResponse = await fetch(`/api/courses/${courseId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const courseData = await courseResponse.json();
//         setCourse(courseData);
        
//         // Fetch user progress
//         const progressResponse = await fetch(`/api/user/progress/${courseId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const progressData = await progressResponse.json();
//         setProgress(progressData);
        
//         // Fetch user streak
//         const streakResponse = await fetch('/api/user/streak', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const streakData = await streakResponse.json();
//         setStreak(streakData.streak || 0);
//       } catch (error) {
//         console.error('Error fetching course data:', error);
//       }
//     };
    
//     fetchCourseData();
//   }, [courseId]);

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className={`w-64 bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed h-full z-10`}>
//         <div className="p-4">
//           <h2 className="text-xl font-bold text-[#C35029]">{course.title}</h2>
//           <p className="text-sm text-gray-600">{course.level} • {course.language}</p>
          
//           <div className="mt-6">
//             <ProgressTracker progress={progress} />
            
//             <nav className="mt-6">
//               <button 
//                 onClick={() => setActiveTab('lessons')}
//                 className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'lessons' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100'}`}
//               >
//                 Lessons
//               </button>
//               <button 
//                 onClick={() => setActiveTab('exercises')}
//                 className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'exercises' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100'}`}
//               >
//                 Exercises
//               </button>
//               <button 
//                 onClick={() => setActiveTab('assessments')}
//                 className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'assessments' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100'}`}
//               >
//                 Assessments
//               </button>
//               <button 
//                 onClick={() => setActiveTab('certificate')}
//                 className={`w-full text-left p-2 rounded-lg ${activeTab === 'certificate' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100'}`}
//               >
//                 Certificate
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
      
//       {/* Main Content */}
//       <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
//         <div className="p-6 max-w-4xl mx-auto">
//           <button 
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="mb-4 bg-[#C35029] text-white p-2 rounded-lg"
//           >
//             {isSidebarOpen ? '◄ Hide Menu' : '► Show Menu'}
//           </button>
          
//           {activeTab === 'lessons' && <LessonView course={course} />}
//           {activeTab === 'exercises' && <ExerciseView course={course} />}
//           {activeTab === 'assessments' && <AssessmentView course={course} />}
//           {activeTab === 'certificate' && <CertificateView course={course} />}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LessonView,
  ExerciseView,
  AssessmentView,
  ProgressTracker,
  CourseCatalog
} from '../../components/learn';
import { axiosInstance } from '../../utils/axiosInstance';

export default function LearningInterface() {
  const { courseId, section, itemId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [activeTab, setActiveTab] = useState('catalog'); // Start with catalog view
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user progress and streak
        const [progressResponse, streakResponse] = await Promise.all([
          courseId ? axiosInstance.get(`/api/user/progress/${courseId}`) : Promise.resolve({}),
          axiosInstance.get('/api/user/streak')
        ]);
        
        if (progressResponse.data) setProgress(progressResponse.data);
        if (streakResponse.data) setStreak(streakResponse.data.streak || 0);
        
        // If a specific course is selected, fetch its data
        if (courseId) {
          const courseResponse = await axiosInstance.get(`/api/courses/${courseId}`);
          setCourse(courseResponse.data);
          setActiveTab('lessons'); // Switch to course view
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [courseId]);

  const handleEnrollCourse = async (courseId) => {
    try {
      await axiosInstance.post(`/api/courses/${courseId}/enroll`);
      alert('Successfully enrolled in the course!');
      // Refresh the page or update state as needed
      window.location.reload();
    } catch (error) {
      alert('Failed to enroll: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed h-full z-10`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#C35029]">LexiRise Learner</h2>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <div className="bg-[#f8e1d8] text-[#C35029] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center">
              <span>🔥 {streak} day streak</span>
            </div>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`w-full text-left p-3 rounded-lg flex items-center ${
                activeTab === 'catalog' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-3">📚</span>
              Course Catalog
            </button>
            
            {course && (
              <>
                <div className="text-xs text-gray-500 uppercase font-medium mt-4 mb-2 px-3">Current Course</div>
                <div className="px-3 py-2 bg-gray-50 rounded-lg mb-2">
                  <h3 className="font-medium truncate">{course.title}</h3>
                  <p className="text-sm text-gray-600">{course.level} • {course.language}</p>
                </div>
                
                <button 
                  onClick={() => setActiveTab('lessons')}
                  className={`w-full text-left p-3 rounded-lg flex items-center ${
                    activeTab === 'lessons' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3">📖</span>
                  Lessons
                </button>
                
                <button 
                  onClick={() => setActiveTab('exercises')}
                  className={`w-full text-left p-3 rounded-lg flex items-center ${
                    activeTab === 'exercises' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3">💪</span>
                  Exercises
                </button>
                
                <button 
                  onClick={() => setActiveTab('assessments')}
                  className={`w-full text-left p-3 rounded-lg flex items-center ${
                    activeTab === 'assessments' ? 'bg-[#f8e1d8] text-[#C35029]' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="mr-3">📝</span>
                  Assessments
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 bg-[#C35029] text-white p-2 rounded-lg"
          >
            {isSidebarOpen ? '◄ Hide Menu' : '► Show Menu'}
          </button>
          
          {activeTab === 'catalog' && (
            <CourseCatalog onEnrollCourse={handleEnrollCourse} />
          )}
          
          {activeTab === 'lessons' && course && <LessonView course={course} />}
          {activeTab === 'exercises' && course && <ExerciseView course={course} />}
          {activeTab === 'assessments' && course && <AssessmentView course={course} />}
        </div>
      </div>
    </div>
  );
}