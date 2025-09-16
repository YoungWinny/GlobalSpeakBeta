// export default function ProgressTracker() {
//   const [progress, setProgress] = useState(0);

//   // Calculate progress (example)
//   const calculateProgress = () => {
//     // Actual implementation would fetch user progress
//     return 65; // Example value
//   };

//   useEffect(() => {
//     setProgress(calculateProgress());
//   }, []);

//   return (
//     <div className="mb-6">
//       <div className="flex justify-between mb-1">
//         <span className="text-sm font-medium">Course Progress</span>
//         <span className="text-sm">{progress}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2.5">
//         <div 
//           className="bg-indigo-600 h-2.5 rounded-full" 
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// }
















// components/learn/ProgressTracker.jsx
import { useState, useEffect } from 'react';
import { FiAward, FiTrendingUp, FiCalendar } from 'react-icons/fi';

export default function ProgressTracker({ progress, course }) {
  const [streak, setStreak] = useState(0);
  const [weeklyProgress, setWeeklyProgress] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const streakResponse = await fetch('/api/user/streak');
        const streakData = await streakResponse.json();
        setStreak(streakData.streak || 0);
        
        const weeklyResponse = await fetch('/api/user/weekly-progress');
        const weeklyData = await weeklyResponse.json();
        setWeeklyProgress(weeklyData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };
    
    fetchProgressData();
  }, []);

  const calculateOverallProgress = () => {
    if (!progress || !course) return 0;
    
    const totalItems = (course.lessons?.length || 0) + (course.exercises?.length || 0);
    if (totalItems === 0) return 0;
    
    const completedItems = (progress.completedLessons?.length || 0) + (progress.completedExercises?.length || 0);
    return Math.round((completedItems / totalItems) * 100);
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="bg-white rounded-lg shadow-xs p-4 border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-3">Your Progress</h3>
      
      {/* Overall Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Course Completion</span>
          <span className="text-gray-900 font-medium">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-[#C35029] h-2 rounded-full transition-all duration-500" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Streak */}
      <div className="flex items-center mb-4 p-2 bg-orange-50 rounded-lg">
        <div className="bg-orange-100 p-2 rounded-full mr-3">
          <FiTrendingUp className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{streak} day streak</p>
          <p className="text-xs text-gray-600">Keep learning to maintain your streak!</p>
        </div>
      </div>
      
      {/* Weekly Progress */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <FiCalendar className="mr-1" />
          <span>This week</span>
        </div>
        <div className="flex justify-between">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-2 h-8 rounded-t-lg ${
                  day.xp > 0 ? 'bg-[#ef9273]' : 'bg-gray-200'
                }`}
                style={{ height: `${Math.min(day.xp / 50 * 32, 32)}px` }}
              ></div>
              <span className="text-xs mt-1 text-gray-600">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* XP Summary */}
      <div className="p-2 bg-[#f8e1d8] rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-[#C35029]">Total XP</span>
          <span className="text-lg font-bold text-[#C35029] flex items-center">
            <FiAward className="mr-1" />
            {progress.xp || 0}
          </span>
        </div>
      </div>
      
      {/* Lesson-specific progress if available */}
      {progress.completedLessons && progress.completedLessons.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-900 mb-2">Completed Lessons</p>
          <div className="space-y-1">
            {progress.completedLessons.slice(0, 3).map(lesson => (
              <div key={lesson._id} className="flex items-center text-sm">
                <FiCheck className="text-green-500 mr-2" size={16} />
                <span className="truncate">{lesson.title}</span>
              </div>
            ))}
            {progress.completedLessons.length > 3 && (
              <p className="text-xs text-gray-600 mt-1">
                +{progress.completedLessons.length - 3} more lessons
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}