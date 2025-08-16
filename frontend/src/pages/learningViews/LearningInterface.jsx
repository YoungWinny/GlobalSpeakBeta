// LearningInterface.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LessonView,
  ExerciseView,
  AssessmentView,
  ProgressTracker
} from '../../components/learn';
export default function LearningInterface() {
  const { courseId, section, itemId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [activeTab, setActiveTab] = useState('lessons');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Fetch course data
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
    };
    
    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed h-full z-10`}>
        <div className="p-4">
          <h2 className="text-xl font-bold text-indigo-800">{course.title}</h2>
          <p className="text-sm text-gray-600">{course.level} • {course.language}</p>
          
          <div className="mt-6">
            <ProgressTracker progress={progress} />
            
            <nav className="mt-6">
              <button 
                onClick={() => setActiveTab('lessons')}
                className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'lessons' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
              >
                Lessons
              </button>
              <button 
                onClick={() => setActiveTab('exercises')}
                className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'exercises' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
              >
                Exercises
              </button>
              <button 
                onClick={() => setActiveTab('assessments')}
                className={`w-full text-left p-2 rounded-lg mb-1 ${activeTab === 'assessments' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
              >
                Assessments
              </button>
              <button 
                onClick={() => setActiveTab('certificate')}
                className={`w-full text-left p-2 rounded-lg ${activeTab === 'certificate' ? 'bg-indigo-100 text-indigo-800' : 'hover:bg-gray-100'}`}
              >
                Certificate
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6 max-w-4xl mx-auto">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mb-4 bg-indigo-600 text-white p-2 rounded-lg"
          >
            {isSidebarOpen ? '◄ Hide Menu' : '► Show Menu'}
          </button>
          
          {activeTab === 'lessons' && <LessonView course={course} />}
          {activeTab === 'exercises' && <ExerciseView course={course} />}
          {activeTab === 'assessments' && <AssessmentView course={course} />}
          {activeTab === 'certificate' && <CertificateView course={course} />}
        </div>
      </div>
    </div>
  );
}