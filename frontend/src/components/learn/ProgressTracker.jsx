export default function ProgressTracker() {
  const [progress, setProgress] = useState(0);

  // Calculate progress (example)
  const calculateProgress = () => {
    // Actual implementation would fetch user progress
    return 65; // Example value
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, []);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">Course Progress</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-indigo-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}