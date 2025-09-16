// import { useState } from 'react';
// import { CourseOutlineGenerator, LessonEditor, ExerciseBuilder, AssessmentComposer, CreateCourseModal } from '../../components/creator';

// import LexiRiseLogo from '../../assets/images/LexiRise.png';

// export default function CreatorDashboard() {
//   const [activeTab, setActiveTab] = useState('courses');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [courses, setCourses] = useState([]);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

//   const tabs = [
//     { id: 'courses', label: 'My Courses', icon: '📚' },
//     { id: 'course', label: 'Course Setup', icon: '⚙️' },
//     { id: 'lessons', label: 'Lessons', icon: '✍️' },
//     { id: 'exercises', label: 'Exercises', icon: '💪' },
//     { id: 'assessments', label: 'Assessments', icon: '📝' }
//   ];

//   // Load user's courses
//   const loadCourses = async () => {
//     try {
//       const response = await axiosInstance.get('/api/courses/my-courses');
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Failed to load courses:', error);
//     }
//   };

//   const handleCourseCreated = (newCourse) => {
//     setCourses(prev => [...prev, newCourse]);
//     setSelectedCourse(newCourse);
//     setActiveTab('course');
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setActiveTab('course');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <header className="mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center">
//               <img src={LexiRiseLogo} alt="LexiRise" className="h-10 mr-3" />
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C35029] to-orange-600 bg-clip-text text-transparent mb-1">
//                   LexiRise Creator Studio
//                 </h1>
//                 <p className="text-gray-600 font-medium">Build courses for language professionals</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button 
//                 onClick={() => setIsCreateModalOpen(true)}
//                 className="px-4 py-2 bg-[#C35029] hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 + New Course
//               </button>
//             </div>
//           </div>
          
//           {/* Tab navigation */}
//           <nav className="flex space-x-3 mt-6 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
//                   activeTab === tab.id 
//                     ? 'bg-[#C35029] text-white shadow-lg' 
//                     : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300'
//                 }`}
//               >
//                 <span className="mr-2 text-lg">{tab.icon}</span>
//                 {tab.label}
//               </button>
//             ))}
//           </nav>
//         </header>

//         {/* Content area */}
//         <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-md">
//           {activeTab === 'courses' && (
//             <div>
//               <h2 className="text-xl font-semibold text-[#C35029] mb-4">My Courses</h2>
//               {courses.length === 0 ? (
//                 <div className="text-center py-12">
//                   <div className="text-6xl mb-4">📚</div>
//                   <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
//                   <button 
//                     onClick={() => setIsCreateModalOpen(true)}
//                     className="px-6 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]"
//                   >
//                     Create Your First Course
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {courses.map(course => (
//                     <div 
//                       key={course._id} 
//                       className="border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
//                       onClick={() => handleCourseSelect(course)}
//                     >
//                       <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
//                       <p className="text-gray-600 text-sm mb-2">{course.language} • {course.level}</p>
//                       <div className="flex justify-between items-center">
//                         <span className={`px-2 py-1 rounded-full text-xs ${
//                           course.status === 'published' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-yellow-100 text-yellow-800'
//                         }`}>
//                           {course.status}
//                         </span>
//                         <span className="text-sm text-gray-500">{course.duration}h</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
          
//           {activeTab === 'course' && selectedCourse && (
//             <CourseOutlineGenerator 
//               courseData={selectedCourse} 
//               setCourseData={setSelectedCourse}
//             />
//           )}
          
//           {activeTab === 'lessons' && selectedCourse && <LessonEditor courseData={selectedCourse} />}
//           {activeTab === 'exercises' && selectedCourse && <ExerciseBuilder courseData={selectedCourse} />}
//           {activeTab === 'assessments' && selectedCourse && <AssessmentComposer courseData={selectedCourse} />}
//         </main>

//         {/* Create Course Modal */}
//         <CreateCourseModal 
//           isOpen={isCreateModalOpen}
//           onClose={() => setIsCreateModalOpen(false)}
//           onCourseCreated={handleCourseCreated}
//         />
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { CourseOutlineGenerator, LessonEditor, ExerciseBuilder, AssessmentComposer } from '../../components/creator';
import { axiosInstance } from '../../utils/axiosInstance';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('create');
  const [courseData, setCourseData] = useState({
    title: '',
    language: 'English',
    level: 'Beginner',
    specialization: 'translation',
    description: ''
  });
  const [savedCourse, setSavedCourse] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  // Modern tab labels with icons
  const tabs = [
    { id: 'create', label: 'Create Course', icon: '🚀' },
    { id: 'course', label: 'Course Setup', icon: '📚', disabled: !savedCourse },
    { id: 'lessons', label: 'Lessons', icon: '✍️', disabled: !savedCourse },
    { id: 'exercises', label: 'Exercises', icon: '💪', disabled: !savedCourse },
    { id: 'assessments', label: 'Assessments', icon: '📝', disabled: !savedCourse }
  ];

  const handleCreateCourse = async () => {
  if (!courseData.title || !courseData.description) {
    alert('Please enter both course title and description');
    return;
  }

  setIsCreating(true);
  try {
    console.log('Creating course with data:', courseData);
    
    const response = await axiosInstance.post('/api/courses', {
      title: courseData.title,
      description: courseData.description,
      language: courseData.language,
      level: courseData.level,
      specialization: courseData.specialization,
      duration: 0, // Default duration
      price: 0     // Default price
    });
    
    console.log('Course created successfully:', response.data);
    
    setSavedCourse(response.data);
    setActiveTab('course');
    alert('Course created successfully!');
  } catch (error) {
    console.error('Failed to create course:', error);
    
    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors.join(', ');
      alert(`Validation errors: ${errorMessages}`);
    } else if (error.response?.data?.message) {
      alert('Failed to create course: ' + error.response.data.message);
    } else {
      alert('Failed to create course: ' + error.message);
    }
  } finally {
    setIsCreating(false);
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Futuristic header with glass morphism */}
        <header className="mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C35029] to-orange-600 bg-clip-text text-transparent mb-1">
                LexiRise Creator Studio
              </h1>
              <p className="text-gray-600 font-medium">
                {savedCourse ? `Editing: ${savedCourse.title}` : 'Create new language courses'}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {savedCourse && (
                <button className="px-4 py-2 bg-[#C35029] hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                  Save Draft
                </button>
              )}
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
          
          {/* Innovative tab navigation */}
          <nav className="flex space-x-3 mt-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-[#C35029] text-white shadow-lg' 
                    : tab.disabled
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Futuristic content area */}
        <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-md">
          {activeTab === 'create' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#C35029]">Create New Course</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                    placeholder="e.g., Spanish for Beginners"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Language</label>
                  <select
                    value={courseData.language}
                    onChange={(e) => setCourseData({...courseData, language: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                    <option value="Italian">Italian</option>
                    <option value="Portuguese">Portuguese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={courseData.level}
                    onChange={(e) => setCourseData({...courseData, level: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                  <select
                    value={courseData.specialization}
                    onChange={(e) => setCourseData({...courseData, specialization: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  >
                    <option value="translation">Translation</option>
                    <option value="transcription">Transcription</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
                  placeholder="Describe what students will learn in this course..."
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleCreateCourse}
                  disabled={isCreating || !courseData.title}
                  className="px-6 py-3 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isCreating ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'course' && savedCourse && (
            <CourseOutlineGenerator 
              courseData={savedCourse} 
              setCourseData={setSavedCourse} 
            />
          )}
          
          {activeTab === 'lessons' && savedCourse && <LessonEditor courseData={savedCourse} />}
          {activeTab === 'exercises' && savedCourse && <ExerciseBuilder courseData={savedCourse} />}
          {activeTab === 'assessments' && savedCourse && <AssessmentComposer courseData={savedCourse} />}
        </main>
      </div>
    </div>
  );
}