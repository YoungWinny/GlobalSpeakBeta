// import { useState, useEffect, useRef } from 'react';
// import { FiSend, FiMessageSquare } from 'react-icons/fi';

// export default function AIAssistantSidebar() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;
    
//     const userMessage = { role: 'user', content: input };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsLoading(true);
    
//     try {
//       let endpoint = '/api/ai/assist';
//       let payload = { message: input };

//       if (input.toLowerCase().includes('outline')) {
//         endpoint = '/api/ai/generate-outline';
//         payload = { prompt: input };
//       } else if (input.toLowerCase().includes('question') || input.toLowerCase().includes('exercise')) {
//         endpoint = '/api/ai/generate-questions';
//         payload = { context: input };
//       } else if (input.toLowerCase().includes('simplify')) {
//         endpoint = '/api/ai/simplify-text';
//         payload = { context: input };
//       }

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Network response was not ok');
      
//       const data = await response.json();
//       const aiResponse = {
//         role: 'assistant',
//         content: data.outline || data.questions || data.simplified_text || data.response || "I've processed your request."
//       };
      
//       setMessages(prev => [...prev, aiResponse]);
//     } catch (error) {
//       console.error('AI Assistant error:', error);
//       setMessages(prev => [...prev, { 
//         role: 'assistant', 
//         content: 'Sorry, I encountered an error. Please try again.' 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-200 bg-[#C35029] text-white">
//         <div className="flex items-center">
//           <FiMessageSquare className="mr-2" />
//           <h2 className="font-semibold">AI Assistant</h2>
//         </div>
//         <p className="text-[#ef9273] text-xs mt-1">Always available to help</p>
//       </div>
      
//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 h-full flex flex-col justify-center items-center">
//             <FiMessageSquare size={24} className="mb-3 text-gray-300" />
//             <p className="mb-4 text-sm">How can I help with your course today?</p>
//             <div className="grid grid-cols-1 gap-2 w-full">
//               <button 
//                 onClick={() => setInput("Generate course outline about Spanish basics")}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-700 transition-colors"
//               >
//                 Outline Help
//               </button>
//               <button 
//                 onClick={() => setInput("Create 3 exercises about verb conjugation")}
//                 className="text-xs bg-gray-100 hover:bg-gray-200 p-2 rounded-lg text-gray-700 transition-colors"
//               >
//                 Create Exercises
//               </button>
//             </div>
//           </div>
//         ) : (
//           messages.map((msg, idx) => (
//             <div 
//               key={idx} 
//               className={`p-3 rounded-lg max-w-full text-sm ${
//                 msg.role === 'user' 
//                   ? 'bg-[#C35029] text-white ml-auto rounded-br-none' 
//                   : 'bg-gray-100 text-gray-800 mr-auto rounded-bl-none'
//               }`}
//             >
//               {msg.content}
//             </div>
//           ))
//         )}
//         {isLoading && (
//           <div className="p-3 rounded-lg max-w-full bg-gray-100 text-gray-800 mr-auto rounded-bl-none text-sm">
//             <div className="flex items-center gap-2">
//               <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Thinking...
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
      
//       {/* Input Area */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="relative">
//           <textarea
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029] text-sm min-h-[44px] max-h-32 resize-none"
//             placeholder="Type your question..."
//             disabled={isLoading}
//             rows={1}
//           />
//           <button 
//             onClick={handleSend}
//             disabled={isLoading || !input.trim()}
//             className="absolute right-2 bottom-2 text-[#C35029] hover:text-[#a04020] disabled:text-gray-400"
//           >
//             <FiSend size={18} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState, useEffect, useRef } from 'react';
import { FiSend, FiMessageSquare, FiZap, FiHelpCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function AIAssistantSidebar() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response (replace with your API call)
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: "Here’s a suggested course outline for your topic. Let me know if you'd like me to refine it further!"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const quickPrompts = [
    { icon: '📝', text: 'Generate course outline' },
    { icon: '💡', text: 'Create 3 exercises' },
    { icon: '🔍', text: 'Simplify this text' },
    { icon: '🎯', text: 'Suggest assessment questions' }
  ];

  return (
    <div className={`h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${isMinimized ? 'w-16' : 'w-64'}`}>
      {/* Header - Collapsible */}
      <div 
        className="flex items-center justify-between p-3 bg-gradient-to-r from-[#C35029] to-[#e05e3a] text-white cursor-pointer hover:brightness-110 transition-all"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        {!isMinimized ? (
          <>
            <div className="flex items-center">
              <FiMessageSquare className="mr-2 text-lg" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <FiChevronLeft className="text-[#ffb4a0]" />
          </>
        ) : (
          <FiMessageSquare className="mx-auto text-lg" />
        )}
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-[#C35029] rounded-full flex items-center justify-center text-white text-xl">
                    <FiHelpCircle />
                  </div>
                  <span className="absolute -top-1 -right-1 bg-white text-[#C35029] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-[#C35029]">
                    AI
                  </span>
                </div>
                <p className="text-gray-600 mb-4">How can I help with your course today?</p>
                <div className="grid grid-cols-1 gap-2 w-full">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(prompt.text)}
                      className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 text-sm transition-all hover:shadow-sm"
                    >
                      <span className="mr-2">{prompt.icon}</span>
                      <span className="truncate">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg max-w-[90%] text-sm transition-all duration-200 ${
                    msg.role === 'user'
                      ? 'bg-[#C35029] text-white ml-auto rounded-br-none shadow-md'
                      : 'bg-gray-50 text-gray-800 mr-auto rounded-bl-none border border-gray-200'
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}
            {isLoading && (
              <div className="p-3 bg-gray-50 rounded-lg max-w-[90%] mr-auto text-sm flex items-center gap-2 animate-pulse">
                <div className="w-2 h-2 bg-[#C35029] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#C35029] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[#C35029] rounded-full animate-bounce delay-200"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C35029]/50 focus:border-[#C35029] text-sm transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-all ${
                  isLoading || !input.trim()
                    ? 'text-gray-400'
                    : 'text-[#C35029] hover:bg-[#C35029]/10'
                }`}
              >
                <FiSend size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized View */}
      {isMinimized && (
        <div className="flex-1 flex flex-col items-center justify-center p-2">
          <button
            onClick={() => setIsMinimized(false)}
            className="p-2 text-gray-500 hover:text-[#C35029] rounded-full hover:bg-gray-100 transition-all"
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}