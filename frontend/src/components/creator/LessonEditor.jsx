// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
// import { FiMaximize2, FiMinimize2, FiEdit2, FiType, FiPlus } from 'react-icons/fi';

// export default function LessonEditor({ courseData }) {
//   const [content, setContent] = useState('');
//   const [viewMode, setViewMode] = useState('edit');
//   const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
//   const [aiAction, setAiAction] = useState(null);

//   // ... (keep existing handler functions)

//   return (
//     <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-100">
//       <div className="p-4 border-b border-gray-100 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">Lesson Editor</h2>
//           <p className="text-sm text-gray-500">Editing: {courseData.title || 'Untitled Course'}</p>
//         </div>
        
//         <div className="flex gap-2">
//           <button
//             onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
//             className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1 transition-colors"
//           >
//             {viewMode === 'edit' ? (
//               <>
//                 <FiMaximize2 size={16} /> Preview
//               </>
//             ) : (
//               <>
//                 <FiEdit2 size={16} /> Edit
//               </>
//             )}
//           </button>
//           <button
//             onClick={() => setIsAIAssistOpen(!isAIAssistOpen)}
//             className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-1 transition-colors"
//           >
//             <FiPlus size={16} /> AI Assist
//           </button>
//         </div>
//       </div>
      
//       {isAIAssistOpen && (
//         <div className="p-4 bg-indigo-50 border-b border-indigo-100">
//           <h3 className="font-medium text-indigo-800 mb-2">AI Assistance</h3>
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => handleAIAction('expand')}
//               disabled={aiAction === 'expand'}
//               className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-sm text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50 flex items-center gap-1"
//             >
//               {aiAction === 'expand' ? (
//                 <svg className="animate-spin h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 <FiType size={14} />
//               )}
//               {aiAction === 'expand' ? 'Expanding...' : 'Expand'}
//             </button>
//             <button
//               onClick={() => handleAIAction('simplify')}
//               disabled={aiAction === 'simplify'}
//               className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-sm text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50 flex items-center gap-1"
//             >
//               {aiAction === 'simplify' ? (
//                 <svg className="animate-spin h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : null}
//               {aiAction === 'simplify' ? 'Simplifying...' : 'Simplify'}
//             </button>
//             <button
//               onClick={() => handleAIAction('examples')}
//               disabled={aiAction === 'examples'}
//               className="px-3 py-1 bg-white border border-indigo-200 rounded-lg text-sm text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50 flex items-center gap-1"
//             >
//               {aiAction === 'examples' ? (
//                 <svg className="animate-spin h-4 w-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : null}
//               {aiAction === 'examples' ? 'Generating...' : 'Add Examples'}
//             </button>
//           </div>
//         </div>
//       )}
      
//       <div className="p-4">
//         {viewMode === 'edit' ? (
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 font-mono text-gray-700"
//             placeholder="Write your lesson content in Markdown..."
//           />
//         ) : (
//           <div className="prose max-w-none p-4 border border-gray-200 rounded-lg">
//             <ReactMarkdown
//               components={{
//                 code({node, inline, className, children, ...props}) {
//                   const match = /language-(\w+)/.exec(className || '');
//                   return !inline && match ? (
//                     <SyntaxHighlighter
//                       language={match[1]}
//                       children={String(children).replace(/\n$/, '')}
//                       {...props}
//                     />
//                   ) : (
//                     <code className={className} {...props}>
//                       {children}
//                     </code>
//                   );
//                 }
//               }}
//             >
//               {content || '*Nothing to preview yet*'}
//             </ReactMarkdown>
//           </div>
//         )}
//       </div>
      
//       <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
//         <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
//           Save Draft
//         </button>
//         <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
//           Publish Lesson
//         </button>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { FiMaximize2, FiMinimize2, FiEdit2, FiType, FiPlus } from 'react-icons/fi';

export default function LessonEditor({ courseData }) {
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('edit');
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
  const [aiAction, setAiAction] = useState(null);

  const handleAIAction = async (action) => {
    if (!content) return;
    
    setAiAction(action);
    try {
      let endpoint = '';
      let payload = { text: content };
      
      switch(action) {
        case 'expand':
          endpoint = '/api/ai/expand';
          payload.prompt = "Expand these bullet points into detailed explanations";
          break;
        case 'simplify':
          endpoint = '/api/ai/simplify';
          break;
        case 'examples':
          endpoint = '/api/ai/examples';
          payload.prompt = "Generate 3 relevant examples";
          break;
        default:
          return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on action
      let result = content;
      switch(action) {
        case 'expand':
          result = content + "\n\nExpanded explanation with more details...";
          break;
        case 'simplify':
          result = "Simplified version:\n" + content.split('\n')[0];
          break;
        case 'examples':
          result = content + "\n\nExamples:\n1. First example\n2. Second example\n3. Third example";
          break;
      }
      
      setContent(result);
    } catch (error) {
      console.error(`AI ${action} failed:`, error);
    } finally {
      setAiAction(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#C35029]">Lesson Editor</h2>
          <p className="text-gray-500 text-sm mt-1">Editing: {courseData.title || 'Untitled Course'}</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-1 transition-colors"
          >
            {viewMode === 'edit' ? (
              <>
                <FiMaximize2 size={16} /> Preview
              </>
            ) : (
              <>
                <FiEdit2 size={16} /> Edit
              </>
            )}
          </button>
          <button
            onClick={() => setIsAIAssistOpen(!isAIAssistOpen)}
            className="px-3 py-1.5 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg flex items-center gap-1 transition-colors"
          >
            <FiPlus size={16} /> AI Assist
          </button>
        </div>
      </div>
      
      {isAIAssistOpen && (
        <div className="p-4 border-b border-[#ef9273] bg-[#f8e1d8]">
          <h3 className="font-medium text-[#C35029] mb-2">AI Assistance</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAIAction('expand')}
              disabled={aiAction === 'expand'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {aiAction === 'expand' ? (
                <svg className="animate-spin h-4 w-4 text-[#C35029]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiType size={14} />
              )}
              {aiAction === 'expand' ? 'Expanding...' : 'Expand'}
            </button>
            <button
              onClick={() => handleAIAction('simplify')}
              disabled={aiAction === 'simplify'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {aiAction === 'simplify' ? (
                <svg className="animate-spin h-4 w-4 text-[#C35029]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {aiAction === 'simplify' ? 'Simplifying...' : 'Simplify'}
            </button>
            <button
              onClick={() => handleAIAction('examples')}
              disabled={aiAction === 'examples'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {aiAction === 'examples' ? (
                <svg className="animate-spin h-4 w-4 text-[#C35029]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {aiAction === 'examples' ? 'Generating...' : 'Add Examples'}
            </button>
          </div>
        </div>
      )}
      
      <div className="p-4">
        {viewMode === 'edit' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029] font-mono text-gray-700"
            placeholder="Write your lesson content in Markdown..."
          />
        ) : (
          <div className="prose max-w-none p-4 border border-gray-200 rounded-lg">
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
              {content || '*Nothing to preview yet*'}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
        <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
          Save Draft
        </button>
        <button className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors">
          Publish Lesson
        </button>
      </div>
    </div>
  );
}