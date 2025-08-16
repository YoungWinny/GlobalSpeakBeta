import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function AssessmentComposer() {
  // const { activeTab } = useOutletContext();
  const [assessment, setAssessment] = useState({
    title: '',
    questions: [],
    passingScore: 70,
    timeLimit: 30 // minutes
  });
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    type: 'mcq',
    options: [{ text: '', isCorrect: false }],
    points: 1
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved assessment when tab becomes active
  useEffect(() => { 
      // Load assessment from API or local state
      const loadAssessment = async () => {
        // const response = await fetch('/api/assessment');
        // setAssessment(response.data);
      };
      loadAssessment();
  }, []);
    // }
  // }, [activeTab]);

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) return;
    
    setAssessment(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    
    // Reset new question form
    setNewQuestion({
      text: '',
      type: 'mcq',
      options: [{ text: '', isCorrect: false }],
      points: 1
    });
  };

  const handleGenerateQuestions = async () => {
    if (!assessment.title) {
      alert('Please set an assessment title first');
      return;
    }
    
    setIsGenerating(true);
    try {
      // Simulate API call to AI service
      // const response = await fetch('/api/ai/generate-questions', {
      //   method: 'POST',
      //   body: JSON.stringify({ topic: assessment.title })
      // });
      // const generatedQuestions = await response.json();
      
      // Mock generated questions
      const generatedQuestions = [
        {
          text: 'What is the capital of France?',
          type: 'mcq',
          options: [
            { text: 'London', isCorrect: false },
            { text: 'Paris', isCorrect: true },
            { text: 'Berlin', isCorrect: false }
          ],
          points: 1
        },
        {
          text: 'Explain the main theme of the course in 2-3 sentences.',
          type: 'essay',
          points: 5
        }
      ];
      
      setAssessment(prev => ({
        ...prev,
        questions: [...prev.questions, ...generatedQuestions]
      }));
    } catch (error) {
      console.error('Question generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...prev.options, { text: '', isCorrect: false }]
    }));
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index][field] = value;
    setNewQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  const handlePublishAssessment = () => {
    if (assessment.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }
    
    // Save to backend
    console.log('Publishing assessment:', assessment);
    alert('Assessment published successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Assessment Setup</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Assessment Title</label>
            <input
              type="text"
              value={assessment.title}
              onChange={(e) => setAssessment({...assessment, title: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Passing Score (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={assessment.passingScore}
              onChange={(e) => setAssessment({...assessment, passingScore: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Time Limit (minutes)</label>
            <input
              type="number"
              min="1"
              value={assessment.timeLimit}
              onChange={(e) => setAssessment({...assessment, timeLimit: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Add New Question</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question Type</label>
            <select
              value={newQuestion.type}
              onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value, options: e.target.value === 'mcq' ? newQuestion.options : []})}
              className="w-full p-2 border rounded"
            >
              <option value="mcq">Multiple Choice</option>
              <option value="essay">Essay</option>
              <option value="short-answer">Short Answer</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Question Text</label>
            <textarea
              value={newQuestion.text}
              onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
          
          {newQuestion.type === 'mcq' && (
            <div>
              <label className="block text-sm font-medium mb-2">Options</label>
              {newQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="ml-2 flex-1 p-2 border rounded"
                    placeholder={`Option ${index + 1}`}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => {
                        const updatedOptions = [...newQuestion.options];
                        updatedOptions.splice(index, 1);
                        setNewQuestion({...newQuestion, options: updatedOptions});
                      }}
                      className="ml-2 text-red-500"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="mt-2 text-sm text-indigo-600 hover:text-indigo-800"
              >
                + Add Option
              </button>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1">Points</label>
            <input
              type="number"
              min="1"
              value={newQuestion.points}
              onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 1})}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add Question
            </button>
            
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'AI Suggest Questions'}
            </button>
          </div>
        </div>
      </div>
      
      {assessment.questions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Assessment Questions ({assessment.questions.length})</h3>
            <button
              onClick={handlePublishAssessment}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Publish Assessment
            </button>
          </div>
          
          <div className="space-y-4">
            {assessment.questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div className="font-medium">
                    {question.text} ({question.points} point{question.points !== 1 ? 's' : ''})
                  </div>
                  <button
                    onClick={() => {
                      const updatedQuestions = [...assessment.questions];
                      updatedQuestions.splice(qIndex, 1);
                      setAssessment({...assessment, questions: updatedQuestions});
                    }}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
                
                {question.type === 'mcq' && question.options?.length > 0 && (
                  <ul className="mt-2 ml-6 list-disc">
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex} className={option.isCorrect ? 'text-green-600' : ''}>
                        {option.text} {option.isCorrect && '(Correct)'}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}