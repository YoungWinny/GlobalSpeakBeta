import { useState } from 'react';
import { CourseOutlineGenerator, LessonEditor, ExerciseBuilder, AssessmentComposer } from '../../components/creator';

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('course');
  const [courseData, setCourseData] = useState({
    title: '',
    language: 'English',
    level: 'Beginner',
    description: ''
  });

  // Modern tab labels with icons
  const tabs = [
    { id: 'course', label: 'Course', icon: '📚' },
    { id: 'lessons', label: 'Lessons', icon: '✍️' },
    { id: 'exercises', label: 'Exercises', icon: '💪' },
    { id: 'assessments', label: 'Assessments', icon: '📝' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        {/* Futuristic header with glass morphism */}
        <header className="mb-8 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm border border-gray-200/50">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C35029] to-orange-600 bg-clip-text text-transparent mb-1">
                GlobalSpeak Creator
              </h1>
              <p className="text-gray-600 font-medium">Design immersive language experiences</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-[#C35029] hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Save Draft
              </button>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all">
                <span className="text-lg">⚙️</span>
              </button>
            </div>
          </div>
          
          {/* Innovative tab navigation */}
          <nav className="flex space-x-3 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-[#C35029] text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200/70 hover:border-gray-300'
                }`}
              >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Futuristic content area with subtle neumorphism */}
        <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm overflow-hidden border border-gray-200/50 p-6 transition-all duration-300 hover:shadow-md">
          {activeTab === 'course' && (
            <CourseOutlineGenerator 
              courseData={courseData} 
              setCourseData={setCourseData} 
            />
          )}
          
          {activeTab === 'lessons' && <LessonEditor courseData={courseData} />}
          {activeTab === 'exercises' && <ExerciseBuilder />}
          {activeTab === 'assessments' && <AssessmentComposer />}
        </main>

        {/* Futuristic floating action button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#C35029] hover:bg-orange-700 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 text-2xl">
          ➕
        </button>
      </div>
    </div>
  );
}