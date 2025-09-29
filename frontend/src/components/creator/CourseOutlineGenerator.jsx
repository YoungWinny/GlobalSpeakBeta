import { useState } from 'react';
import { FiLoader, FiEdit2, FiSave } from 'react-icons/fi';
import { axiosInstance } from '../../utils/axiosInstance';

export default function CourseOutlineGenerator({ courseData, setCourseData }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [outline, setOutline] = useState(courseData.outline || '');

  const handleGenerateOutline = async () => {
    setIsGenerating(true);
    try {
      const response = await axiosInstance.post('/api/content/ai/generate', {
        courseId: courseData._id, // Make sure this is the actual course ID
        contentType: 'outline'
      });

      if (response.data.success) {
        const generatedOutline = response.data.generatedContent;
        setOutline(generatedOutline);
        
        // Update the course with the generated outline
        const updateResponse = await axiosInstance.patch(`/api/courses/${courseData._id}`, {
          outline: generatedOutline
        });
        
        setCourseData(updateResponse.data);
        
        if (response.data.usingMock) {
          console.log('Using mock data - AI service not configured');
        }
      } else {
        throw new Error(response.data.message || 'Failed to generate outline');
      }
    } catch (error) {
      console.error('Outline generation failed:', error);
      alert(`Failed to generate outline: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveOutline = async () => {
    setIsSaving(true);
    try {
      // Update the course with the new outline
      const response = await axiosInstance.patch(`/api/courses/${courseData._id}`, {
        outline: outline
      });
      
      // Update local state with the updated course data
      setCourseData(response.data);
      alert('Outline saved successfully!');
    } catch (error) {
      console.error('Failed to save outline:', error);
      alert('Failed to save outline: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold text-[#C35029] mb-4">Course Outline</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800">Course: {courseData.title}</h3>
          <p className="text-sm text-blue-600 mt-1">Course ID: {courseData._id}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Course Outline</label>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={handleGenerateOutline}
              disabled={isGenerating}
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
            
            <button 
              onClick={handleSaveOutline}
              disabled={isSaving || !outline}
              className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Outline
                </>
              )}
            </button>
          </div>
          
          {outline && (
            <div className="mt-4">
              <textarea
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                rows={12}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029] focus:border-[#C35029] font-mono text-sm"
                placeholder="Course outline will appear here..."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}