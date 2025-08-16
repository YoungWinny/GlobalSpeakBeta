// LessonView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';

export default function LessonView({ course }) {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // 'content' or 'examples'

  useEffect(() => {
    // Fetch lesson data
    const fetchLesson = async () => {
      const response = await fetch(`/api/lessons/${lessonId}`);
      const data = await response.json();
      setLesson(data);
      
      // Check if completed
      const progressResponse = await fetch(`/api/progress/check-lesson/${lessonId}`);
      const progressData = await progressResponse.json();
      setCompleted(progressData.completed);
    };
    
    fetchLesson();
  }, [lessonId]);

  const markComplete = async () => {
    try {
      await fetch(`/api/progress/complete-lesson/${lessonId}`, { method: 'POST' });
      setCompleted(true);
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  if (!lesson) return <div>Loading lesson...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
        {!completed ? (
          <button
            onClick={markComplete}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Mark as Complete
          </button>
        ) : (
          <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
            ✓ Completed
          </span>
        )}
      </div>
      
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 ${activeTab === 'content' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
        >
          Lesson Content
        </button>
        {lesson.examples.length > 0 && (
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-4 py-2 ${activeTab === 'examples' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}
          >
            Examples ({lesson.examples.length})
          </button>
        )}
      </div>
      
      {activeTab === 'content' ? (
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    children={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {lesson.content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="space-y-4">
          {lesson.examples.map((example, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="font-medium mb-2">Example {idx + 1}:</div>
              <div className="p-3 bg-white border rounded mb-2">
                {example.text}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Explanation:</span> {example.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {lesson.media.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Media Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.media.map((item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden">
                {item.type === 'image' && (
                  <img 
                    src={item.url} 
                    alt={item.caption || ''} 
                    className="w-full h-auto"
                  />
                )}
                {item.type === 'video' && (
                  <video controls className="w-full">
                    <source src={item.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {item.type === 'audio' && (
                  <div className="p-4">
                    <audio controls className="w-full">
                      <source src={item.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {item.caption && (
                  <div className="p-2 text-sm text-gray-600">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}