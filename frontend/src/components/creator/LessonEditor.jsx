// // components/creator/LessonEditor.jsx
// import { useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import { FiMaximize2, FiMinimize2, FiEdit2, FiType, FiPlus, FiVideo, FiImage, FiMic } from 'react-icons/fi';

// export default function LessonEditor({ courseData }) {
//   const [content, setContent] = useState('');
//   const [viewMode, setViewMode] = useState('edit');
//   const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
//   const [aiAction, setAiAction] = useState(null);
//   const [mediaFiles, setMediaFiles] = useState([]);

//   const handleAIAction = async (action) => {
//     if (!content) return;
    
//     setAiAction(action);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       let result = content;
//       switch(action) {
//         case 'expand':
//           result = content + "\n\nExpanded explanation with more details...";
//           break;
//         case 'simplify':
//           result = "Simplified version:\n" + content.split('\n')[0];
//           break;
//         case 'examples':
//           result = content + "\n\nExamples:\n1. First example\n2. Second example\n3. Third example";
//           break;
//         case 'translate':
//           result = content + "\n\nTranslation: [AI-generated translation]";
//           break;
//         case 'transcribe':
//           result = content + "\n\nTranscription: [AI-generated transcription]";
//           break;
//       }
      
//       setContent(result);
//     } catch (error) {
//       console.error(`AI ${action} failed:`, error);
//     } finally {
//       setAiAction(null);
//     }
//   };

//   const handleMediaUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setMediaFiles(prev => [...prev, ...files]);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-[#C35029]">Lesson Editor</h2>
//           <p className="text-gray-500 text-sm mt-1">Editing: {courseData.title || 'Untitled Course'} - {courseData.targetLanguage}</p>
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
//             className="px-3 py-1.5 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg flex items-center gap-1 transition-colors"
//           >
//             <FiPlus size={16} /> AI Assist
//           </button>
//         </div>
//       </div>
      
//       {isAIAssistOpen && (
//         <div className="p-4 border-b border-[#ef9273] bg-[#f8e1d8]">
//           <h3 className="font-medium text-[#C35029] mb-2">AI Assistance for {courseData.specialization}</h3>
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => handleAIAction('expand')}
//               disabled={aiAction === 'expand'}
//               className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
//             >
//               {aiAction === 'expand' ? '⏳' : <FiType size={14} />}
//               {aiAction === 'expand' ? 'Expanding...' : 'Expand'}
//             </button>
//             <button
//               onClick={() => handleAIAction('simplify')}
//               disabled={aiAction === 'simplify'}
//               className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
//             >
//               {aiAction === 'simplify' ? '⏳' : null}
//               {aiAction === 'simplify' ? 'Simplifying...' : 'Simplify'}
//             </button>
//             <button
//               onClick={() => handleAIAction('examples')}
//               disabled={aiAction === 'examples'}
//               className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
//             >
//               {aiAction === 'examples' ? '⏳' : null}
//               {aiAction === 'examples' ? 'Generating...' : 'Add Examples'}
//             </button>
//             {courseData.specialization === 'translation' && (
//               <button
//                 onClick={() => handleAIAction('translate')}
//                 disabled={aiAction === 'translate'}
//                 className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
//               >
//                 {aiAction === 'translate' ? '⏳' : '🌐'}
//                 {aiAction === 'translate' ? 'Translating...' : 'Translate'}
//               </button>
//             )}
//             {courseData.specialization === 'transcription' && (
//               <button
//                 onClick={() => handleAIAction('transcribe')}
//                 disabled={aiAction === 'transcribe'}
//                 className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
//               >
//                 {aiAction === 'transcribe' ? '⏳' : <FiMic size={14} />}
//                 {aiAction === 'transcribe' ? 'Transcribing...' : 'Transcribe'}
//               </button>
//             )}
//           </div>
//         </div>
//       )}
      
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex gap-2 mb-3">
//           <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
//             <FiImage size={16} className="mr-1" />
//             Add Image
//             <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
//           </label>
//           <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
//             <FiVideo size={16} className="mr-1" />
//             Add Video
//             <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} />
//           </label>
//           <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
//             <FiMic size={16} className="mr-1" />
//             Add Audio
//             <input type="file" accept="audio/*" className="hidden" onChange={handleMediaUpload} />
//           </label>
//         </div>
        
//         {mediaFiles.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3">
//             {mediaFiles.map((file, index) => (
//               <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-lg text-sm">
//                 <span className="truncate max-w-xs">{file.name}</span>
//                 <button 
//                   onClick={() => setMediaFiles(prev => prev.filter((_, i) => i !== index))}
//                   className="ml-2 text-red-500"
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
//       <div className="p-4">
//         {viewMode === 'edit' ? (
//           <textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="w-full h-96 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ef9273] focus:border-[#C35029] font-mono text-gray-700"
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
      
//       <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
//         <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
//           Save Draft
//         </button>
//         <button className="px-4 py-2 bg-[#C35029] hover:bg-[#a04020] text-white rounded-lg transition-colors">
//           Publish Lesson
//         </button>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FiMaximize2, FiMinimize2, FiEdit2, FiType, FiPlus, FiVideo, FiImage, FiMic } from 'react-icons/fi';

export default function LessonEditor({ courseData }) {
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('edit');
  const [isAIAssistOpen, setIsAIAssistOpen] = useState(false);
  const [aiAction, setAiAction] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);

  
  const handleAIAction = async (action) => {
  if (!content) return;
  
  setAiAction(action);
  try {
    const response = await fetch('/api/content/ai/modify-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: content,
        action: action
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setContent(data.modifiedText);
    } else {
      throw new Error(data.message || 'Failed to modify text');
    }
  } catch (error) {
    console.error(`AI ${action} failed:`, error);
    alert(`Failed to ${action} text: ${error.message}`);
  } finally {
    setAiAction(null);
  }
};
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles(prev => [...prev, ...files]);
  };

  return (
    <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#C35029]">Lesson Editor</h2>
          <p className="text-gray-500 text-sm mt-1">Editing: {courseData.title || 'Untitled Course'} - {courseData.targetLanguage}</p>
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
          <h3 className="font-medium text-[#C35029] mb-2">AI Assistance for {courseData.specialization}</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleAIAction('expand')}
              disabled={aiAction === 'expand'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50 flex items-center gap-1"
            >
              {aiAction === 'expand' ? '⏳' : <FiType size={14} />}
              {aiAction === 'expand' ? 'Expanding...' : 'Expand'}
            </button>
            <button
              onClick={() => handleAIAction('simplify')}
              disabled={aiAction === 'simplify'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
            >
              {aiAction === 'simplify' ? '⏳' : null}
              {aiAction === 'simplify' ? 'Simplifying...' : 'Simplify'}
            </button>
            <button
              onClick={() => handleAIAction('examples')}
              disabled={aiAction === 'examples'}
              className="px-3 py-1 bg-white border border-[#ef9273] rounded-lg text-sm text-[#C35029] hover:bg-[#ef9273] hover:text-white transition-colors disabled:opacity-50"
            >
              {aiAction === 'examples' ? '⏳' : null}
              {aiAction === 'examples' ? 'Generating...' : 'Add Examples'}
            </button>
          </div>
        </div>
      )}
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex gap-2 mb-3">
          <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
            <FiImage size={16} className="mr-1" />
            Add Image
            <input type="file" accept="image/*" className="hidden" onChange={handleMediaUpload} />
          </label>
          <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
            <FiVideo size={16} className="mr-1" />
            Add Video
            <input type="file" accept="video/*" className="hidden" onChange={handleMediaUpload} />
          </label>
          <label className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition-colors">
            <FiMic size={16} className="mr-1" />
            Add Audio
            <input type="file" accept="audio/*" className="hidden" onChange={handleMediaUpload} />
          </label>
        </div>
        
        {mediaFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {mediaFiles.map((file, index) => (
              <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-lg text-sm">
                <span className="truncate max-w-xs">{file.name}</span>
                <button 
                  onClick={() => setMediaFiles(prev => prev.filter((_, i) => i !== index))}
                  className="ml-2 text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
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