// components/learn/LessonView.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism } from 'react-syntax-highlighter';
import { FiCheck, FiVolume2, FiBookmark } from 'react-icons/fi';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function LessonView({ course }) {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}`);
        const data = await response.json();
        setLesson(data);
        
        const progressResponse = await fetch(`/api/progress/check-lesson/${lessonId}`);
        const progressData = await progressResponse.json();
        setCompleted(progressData.completed);

        const bookmarkResponse = await fetch(`/api/user/bookmarks/${lessonId}`);
        const bookmarkData = await bookmarkResponse.json();
        setBookmarked(bookmarkData.bookmarked);
      } catch (error) {
        console.error('Error fetching lesson data:', error);
      }
    };
    
    fetchLesson();
  }, [lessonId]);

  const markComplete = async () => {
    try {
      await fetch(`/api/progress/complete-lesson/${lessonId}`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setCompleted(true);
      
      // Award XP for completion
      await fetch('/api/user/xp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10, reason: 'Lesson completion' })
      });
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await fetch(`/api/user/bookmarks/${lessonId}`, {
        method: bookmarked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        setBookmarked(!bookmarked);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const playAudio = (audioUrl) => {
    // Implementation for audio playback
    const audio = new Audio(audioUrl);
    audio.play();
    setAudioPlaying(true);
    audio.onended = () => setAudioPlaying(false);
  };

  if (!lesson) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C35029]"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <span className="px-3 py-1 bg-[#ef9273] text-white text-sm font-medium rounded-full">
              {lesson.difficulty || 'Beginner'}
            </span>
            <span className="mx-3 text-gray-400">•</span>
            <span className="text-gray-600">
              {lesson.duration || '15'} min
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{lesson.title}</h2>
          <p className="text-gray-600 mt-1">{lesson.description}</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-full ${bookmarked ? 'bg-[#f8e1d8] text-[#C35029]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            <FiBookmark className={`${bookmarked ? 'fill-current' : ''}`} />
          </button>
          
          {!completed ? (
            <button
              onClick={markComplete}
              className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020] flex items-center"
            >
              <FiCheck className="mr-2" />
              Mark Complete
            </button>
          ) : (
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg flex items-center">
              <FiCheck className="mr-2" />
              Completed
            </span>
          )}
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 ${activeTab === 'content' ? 'border-b-2 border-[#C35029] text-[#C35029] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
        >
          Lesson Content
        </button>
        {lesson.examples && lesson.examples.length > 0 && (
          <button
            onClick={() => setActiveTab('examples')}
            className={`px-4 py-2 ${activeTab === 'examples' ? 'border-b-2 border-[#C35029] text-[#C35029] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Examples ({lesson.examples.length})
          </button>
        )}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <button
            onClick={() => setActiveTab('vocabulary')}
            className={`px-4 py-2 ${activeTab === 'vocabulary' ? 'border-b-2 border-[#C35029] text-[#C35029] font-medium' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Vocabulary ({lesson.vocabulary.length})
          </button>
        )}
      </div>
      
      {/* Lesson Content */}
      {activeTab === 'content' && (
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <Prism
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </Prism>
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
      )}
      
      {/* Examples Tab */}
      {activeTab === 'examples' && lesson.examples && (
        <div className="space-y-4">
          {lesson.examples.map((example, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 bg-[#C35029] text-white rounded-full flex items-center justify-center mr-3">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-2">Example {idx + 1}</div>
                  <div className="p-3 bg-white border rounded mb-2">
                    {example.text}
                  </div>
                  {example.audio && (
                    <button
                      onClick={() => playAudio(example.audio)}
                      className="flex items-center text-sm text-[#C35029] hover:text-[#a04020] mb-2"
                      disabled={audioPlaying}
                    >
                      <FiVolume2 className="mr-1" />
                      {audioPlaying ? 'Playing...' : 'Listen to pronunciation'}
                    </button>
                  )}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Explanation:</span> {example.explanation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Vocabulary Tab */}
      {activeTab === 'vocabulary' && lesson.vocabulary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((word, idx) => (
            <div key={idx} className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{word.original}</h4>
                  <p className="text-gray-600">{word.translation}</p>
                </div>
                {word.audio && (
                  <button
                    onClick={() => playAudio(word.audio)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    disabled={audioPlaying}
                  >
                    <FiVolume2 />
                  </button>
                )}
              </div>
              {word.example && (
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <span className="font-medium">Example: </span>
                  {word.example}
                </div>
              )}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-1">📝</span>
                {word.partOfSpeech}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Media Resources */}
      {lesson.media && lesson.media.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900">Media Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.media.map((item, idx) => (
              <div key={idx} className="border rounded-lg overflow-hidden bg-white">
                {item.type === 'image' && (
                  <div>
                    <img 
                      src={item.url} 
                      alt={item.caption || ''} 
                      className="w-full h-48 object-cover"
                    />
                    {item.caption && (
                      <div className="p-3 text-sm text-gray-600">
                        {item.caption}
                      </div>
                    )}
                  </div>
                )}
                {item.type === 'video' && (
                  <div>
                    <video controls className="w-full">
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {item.caption && (
                      <div className="p-3 text-sm text-gray-600">
                        {item.caption}
                      </div>
                    )}
                  </div>
                )}
                {item.type === 'audio' && (
                  <div className="p-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => playAudio(item.url)}
                        className="p-3 bg-[#C35029] text-white rounded-full mr-3 hover:bg-[#a04020]"
                        disabled={audioPlaying}
                      >
                        <FiVolume2 size={20} />
                      </button>
                      <div>
                        <p className="font-medium">Audio Resource</p>
                        {item.caption && (
                          <p className="text-sm text-gray-600">{item.caption}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Lesson Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
          Previous Lesson
        </button>
        <button className="px-4 py-2 bg-[#C35029] text-white rounded-lg hover:bg-[#a04020]">
          Practice Exercises →
        </button>
      </div>
    </div>
  );
}