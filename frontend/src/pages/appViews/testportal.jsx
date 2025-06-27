import React, { useState, useEffect } from 'react';

export const TestPortal = () => {
  const [timeLeft, setTimeLeft] = useState(3600); // Example: 1 hour in seconds
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  // Countdown Timer Logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time to HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Buttons at the top */}
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md">Translate Text</button>
          <button className="px-6 py-3 bg-gray-300 text-black rounded-md">Translate Files</button>
          <button className="px-6 py-3 bg-gray-300 text-black rounded-md">Write</button>
        </div>
      </div>

      {/* Translation Interface */}
      <div className="flex grow border rounded-md overflow-hidden h-[80vh]">
        {/* Source Text Area */}
        <div className="w-1/2 p-4 bg-gray-50 border-r">
          <textarea
            className="w-full h-full p-2 bg-white border border-gray-300 rounded-md resize-none"
            placeholder="Type to translate."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            style={{ fontSize: '1.2rem' }} // Make font bigger for better readability
          />
        </div>

        {/* Target Text Area and Timer */}
        <div className="w-1/2 p-4 relative">
          {/* Timer at the top right */}
          <div className="absolute top-4 right-4 text-lg font-bold text-red-500">
            {formatTime(timeLeft)}
          </div>

          <textarea
            className="w-full h-full p-2 bg-white border border-gray-300 rounded-md resize-none"
            placeholder="Your translation here."
            value={translatedText}
            onChange={(e) => setTranslatedText(e.target.value)}
            style={{ fontSize: '1.2rem' }} // Make font bigger for better readability
          />
        </div>
      </div>
    </div>
  );
};

export default TestPortal;
