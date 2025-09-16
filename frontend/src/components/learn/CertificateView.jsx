// components/learn/CertificateView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload, FiShare2, FiAward } from 'react-icons/fi';

export default function CertificateView({ course, progress }) {
  const { courseId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(`/api/certificate/${courseId}`);
        const data = await response.json();
        setCertificate(data);
      } catch (error) {
        console.error('Error fetching certificate:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCertificate();
  }, [courseId]);

  const downloadCertificate = () => {
    // Implementation for certificate download
    console.log('Downloading certificate...');
  };

  const shareCertificate = () => {
    // Implementation for sharing certificate
    if (navigator.share) {
      navigator.share({
        title: `I earned a certificate for ${course.title} on LexiRise!`,
        text: `Check out my certificate for completing ${course.title} on LexiRise.`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Certificate link copied to clipboard!'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <div className="text-gray-400 mb-4 text-6xl">📜</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Certificate Not Available</h3>
        <p className="text-gray-600">
          You haven't earned a certificate for this course yet. Complete the course assessment to earn your certificate.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xs overflow-hidden">
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-[#C35029] to-[#ef9273] p-4 text-white">
        <h2 className="text-xl font-bold">Course Certificate</h2>
        <p className="text-sm opacity-90">Congratulations on completing this course!</p>
      </div>
      
      {/* Certificate Content */}
      <div className="p-6">
        <div className="border-2 border-[#C35029] rounded-lg p-8 text-center bg-white shadow-lg">
          <div className="mb-6">
            <div className="bg-[#f8e1d8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAward className="text-[#C35029]" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Certificate of Completion</h3>
            <p className="text-gray-600">This certifies that</p>
            <p className="text-xl font-medium text-[#C35029] my-2">John Doe</p>
            <p className="text-gray-600">has successfully completed the course</p>
            <h4 className="text-xl font-bold text-gray-900 mt-2">{course.title}</h4>
            <p className="text-gray-600 mt-1">{course.language} • {course.level}</p>
          </div>
          
          <div className="flex justify-center space-x-6 my-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C35029]">{certificate.score}%</p>
              <p className="text-sm text-gray-600">Final Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#C35029]">{certificate.completedDate}</p>
              <p className="text-sm text-gray-600">Date Completed</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-center">
              <div className="text-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium">Sarah Johnson</p>
                <p className="text-xs text-gray-600">Course Instructor</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Certificate Actions */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={downloadCertificate}
            className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020] flex items-center"
          >
            <FiDownload className="mr-2" />
            Download PDF
          </button>
          <button
            onClick={shareCertificate}
            className="px-4 py-2 bg-white border border-[#C35029] text-[#C35029] rounded-lg hover:bg-[#f8e1d8] flex items-center"
          >
            <FiShare2 className="mr-2" />
            Share
          </button>
        </div>
        
        {/* Add to LinkedIn Profile */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Add to your professional profile</h4>
          <p className="text-sm text-gray-600 mb-3">
            Share your achievement on LinkedIn to showcase your skills to recruiters.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            Add to LinkedIn Profile
          </button>
        </div>
      </div>
    </div>
  );
}