import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/axiosInstance';

export default function CourseCatalog({ onEnrollCourse }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get('/api/courses');
        setCourses(response.data.courses || response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Course Catalog</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gradient-to-r from-[#C35029] to-[#ef9273] flex items-center justify-center">
              <span className="text-white text-4xl font-bold">
                {course.language.substring(0, 2).toUpperCase()}
              </span>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#f8e1d8] text-[#C35029] px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="text-gray-500 text-sm">{course.language}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-[#C35029]">Free</span>
                <button
                  onClick={() => onEnrollCourse(course._id)}
                  className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search terms or check back later for new courses.</p>
        </div>
      )}
    </div>
  );
}