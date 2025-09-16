// // services/aiService.js
// const Groq = require('groq-sdk');

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// class AIService {
//   static async generateCourseOutline(topic, language, level, specialization) {
//     const prompt = `As an expert language course designer, generate a detailed course outline for a ${specialization} course in ${language} at ${level} level about ${topic}. 
    
//     Include:
//     1. 4-6 module titles with brief descriptions
//     2. 3-5 lessons per module with specific learning objectives
//     3. Suggested exercise types for each lesson
//     4. Final assessment criteria
    
//     Format as valid JSON with this structure:
//     {
//       "courseTitle": "Title",
//       "modules": [
//         {
//           "title": "Module Title",
//           "description": "Module description",
//           "lessons": [
//             {
//               "title": "Lesson Title",
//               "objectives": ["objective1", "objective2"],
//               "exerciseType": "exercise type"
//             }
//           ]
//         }
//       ],
//       "assessmentCriteria": ["criterion1", "criterion2"]
//     }`;
    
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 2000
//       });
      
//       // Extract JSON from the response
//       const content = response.choices[0].message.content;
//       const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/{[\s\S]*}/);
      
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[1] || jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse AI response as JSON');
//     } catch (error) {
//       console.error('Groq API Error:', error);
//       // Return a fallback outline
//       return {
//         courseTitle: `${specialization} Course for ${language} - ${level} Level`,
//         modules: [
//           {
//             title: "Introduction to Concepts",
//             description: "Basic foundations and terminology",
//             lessons: [
//               {
//                 title: "Getting Started",
//                 objectives: ["Understand basic concepts", "Learn fundamental terminology"],
//                 exerciseType: "mcq"
//               }
//             ]
//           }
//         ],
//         assessmentCriteria: ["Knowledge retention", "Practical application"]
//       };
//     }
//   }
  
//   static async generateExercise(content, exerciseType, difficulty, language) {
//     const prompt = `Create a ${exerciseType} exercise for ${language} learning at ${difficulty} difficulty level.
    
//     Based on this content: ${content}
    
//     Format as valid JSON with this structure:
//     {
//       "question": "Exercise question/prompt",
//       "options": [{"id": "1", "text": "Option 1", "isCorrect": false}, {"id": "2", "text": "Option 2", "isCorrect": true}],
//       "answer": "Correct answer for text-based exercises",
//       "explanation": "Explanation of the correct answer",
//       "hint": "Helpful hint for learners"
//     }
    
//     Only include options if exercise type is mcq.`;
    
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 1000
//       });
      
//       const content = response.choices[0].message.content;
//       const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/{[\s\S]*}/);
      
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[1] || jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse AI response as JSON');
//     } catch (error) {
//       console.error('Groq API Error:', error);
//       // Return a fallback exercise
//       return {
//         question: "Translate this sentence",
//         answer: "Sample translation",
//         explanation: "This is a sample exercise",
//         hint: "Think about the context"
//       };
//     }
//   }
  
//   static async generateAssessmentQuestions(topic, count = 5, questionTypes = ['mcq', 'fill-blank'], language, level) {
//     const prompt = `Create ${count} assessment questions about ${topic} for ${language} learners at ${level} level.
//     Include these question types: ${questionTypes.join(', ')}. 
    
//     Format as valid JSON array with this structure for each question:
//     [
//       {
//         "text": "Question text",
//         "type": "question type",
//         "options": [{"id": "1", "text": "Option 1", "isCorrect": false}, {"id": "2", "text": "Option 2", "isCorrect": true}],
//         "answer": "Correct answer for non-mcq questions",
//         "points": 1
//       }
//     ]`;
    
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 1500
//       });
      
//       const content = response.choices[0].message.content;
//       const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\[[\s\S]*\]/);
      
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[1] || jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse AI response as JSON');
//     } catch (error) {
//       console.error('Groq API Error:', error);
//       // Return fallback questions
//       return [
//         {
//           text: "What is the basic concept of this topic?",
//           type: "mcq",
//           options: [
//             { id: "1", text: "Option A", isCorrect: false },
//             { id: "2", text: "Option B", isCorrect: true },
//             { id: "3", text: "Option C", isCorrect: true },
//             { id: "4", text: "Option D", isCorrect: true }
//           ],
//           points: 1
//         }
//       ];
//     }
//   }
  
//   static async simplifyText(text, language, level) {
//     const prompt = `Simplify the following text for ${language} learners at ${level} level: 
    
//     "${text}"
    
//     Return only the simplified text without any additional explanations or formatting.`;
    
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 500
//       });
      
//       return response.choices[0].message.content;
//     } catch (error) {
//       console.error('Groq API Error:', error);
//       return text; // Return original text as fallback
//     }
//   }
  
//   static async generateExamples(text, count = 3, language) {
//     const prompt = `Generate ${count} practical examples that illustrate this concept for ${language} learners: 
    
//     "${text}"
    
//     Format as valid JSON array of objects with "text" and "explanation" properties.`;
    
//     try {
//       const response = await groq.chat.completions.create({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 800
//       });
      
//       const content = response.choices[0].message.content;
//       const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\[[\s\S]*\]/);
      
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[1] || jsonMatch[0]);
//       }
      
//       throw new Error('Failed to parse AI response as JSON');
//     } catch (error) {
//       console.error('Groq API Error:', error);
//       return [
//         {
//           text: "Example 1",
//           explanation: "This is a sample example"
//         }
//       ];
//     }
//   }
// }

// module.exports = AIService;


// Simple AI service with better error handling
class AIService {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY;
    if (!this.apiKey) {
      console.warn('GROQ_API_KEY not found. AI features will use mock data.');
    }
  }

  async makeGroqRequest(messages, model = 'mixtral-8x7b-32768', temperature = 0.7, max_tokens = 1024) {
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY not configured');
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages,
          model,
          temperature,
          max_tokens
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Groq API request failed:', error);
      throw new Error(`AI service unavailable: ${error.message}`);
    }
  }

  // Generate course outline
  async generateCourseOutline(courseTitle, language, level, specialization) {
    const prompt = `
      Generate a detailed course outline for a ${specialization} course titled "${courseTitle}" 
      teaching ${language} at ${level} level. 
      Please provide a structured outline with modules and lessons.
      Format the response in Markdown with clear headings.
    `;

    const messages = [
      {
        role: "system",
        content: "You are an expert course designer for language professionals. Create comprehensive, well-structured course outlines."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    return this.makeGroqRequest(messages);
  }

  // Generate lesson content
  async generateLessonContent(topic, language, level, context) {
    const prompt = `
      Create a comprehensive lesson about "${topic}" for ${level} level ${language} learners.
      ${context ? `Context: ${context}` : ''}
      Include explanations, examples, and key vocabulary.
      Format the response in Markdown.
    `;

    const messages = [
      {
        role: "system",
        content: "You are a language teaching expert. Create engaging, educational lesson content."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    return this.makeGroqRequest(messages, 'mixtral-8x7b-32768', 0.7, 2048);
  }

  // Generate exercise questions
  async generateExerciseQuestions(topic, questionType, language, difficulty, count = 3) {
    const prompt = `
      Generate ${count} ${questionType} exercise questions about "${topic}" 
      for ${difficulty} level ${language} learners.
      For multiple choice questions, provide 4 options with one correct answer.
      For translation exercises, provide source text and target language.
      For fill-in-blank, provide sentences with missing words.
      Return the response as a JSON array with each question having: 
      type, questionText, options (if applicable), correctAnswer, and explanation.
    `;

    const messages = [
      {
        role: "system",
        content: "You are a language education expert. Create effective exercise questions."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await this.makeGroqRequest(messages);
    
    try {
      // Try to parse JSON if the response is in JSON format
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/{[\s\S]*}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      return response;
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      return response;
    }
  }

  // Modify text (simplify, expand, add examples)
  async modifyText(text, action) {
    let prompt;
    switch (action) {
      case 'simplify':
        prompt = `Simplify this text for language learners: ${text}`;
        break;
      case 'expand':
        prompt = `Expand this text with more details and examples: ${text}`;
        break;
      case 'examples':
        prompt = `Provide 3 practical examples for this concept: ${text}`;
        break;
      default:
        prompt = `Improve this text: ${text}`;
    }

    const messages = [
      {
        role: "system",
        content: "You are a language expert who helps improve educational content."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    return this.makeGroqRequest(messages);
  }

  // Fallback mock responses when API key is not available
  getMockResponse(method, ...args) {
    const mockResponses = {
      generateCourseOutline: () => `# ${args[0]} Course Outline\n\n## Module 1: Introduction\n- Lesson 1: Basic Concepts\n- Lesson 2: Getting Started\n\n## Module 2: Core Skills\n- Lesson 3: Fundamental Techniques\n- Lesson 4: Practical Applications\n\n## Module 3: Advanced Topics\n- Lesson 5: Complex Scenarios\n- Lesson 6: Real-world Examples`,
      
      generateLessonContent: () => `# ${args[0]}\n\nThis is a comprehensive lesson about ${args[0]} for ${args[2]} level ${args[1]} learners.\n\n## Key Concepts\n- Main concept 1\n- Main concept 2\n- Main concept 3\n\n## Examples\n1. Example 1\n2. Example 2\n3. Example 3\n\n## Vocabulary\n- Term 1: Definition\n- Term 2: Definition\n- Term 3: Definition`,
      
      generateExerciseQuestions: () => [
        {
          type: 'mcq',
          questionText: 'Sample multiple choice question?',
          options: [
            { id: '1', text: 'Option 1', isCorrect: false },
            { id: '2', text: 'Option 2', isCorrect: true },
            { id: '3', text: 'Option 3', isCorrect: false },
            { id: '4', text: 'Option 4', isCorrect: false }
          ],
          correctAnswer: '2',
          explanation: 'This is the correct answer because...'
        }
      ],
      
      modifyText: () => `Modified text: ${args[0]} (${args[1]} version)`
    };

    return mockResponses[method] ? mockResponses[method](...args) : 'AI service not available';
  }

  // Wrapper method that uses mock responses if API is not available
  async callWithFallback(method, ...args) {
    try {
      if (!this.apiKey) {
        console.log(`Using mock response for ${method} (no API key)`);
        return this.getMockResponse(method, ...args);
      }
      console.log(`Making real AI request for ${method}`);
      return await this[method](...args);
    } catch (error) {
      console.error(`AI method ${method} failed:`, error);
      console.log(`Falling back to mock response for ${method}`);
      return this.getMockResponse(method, ...args);
    }
  }
}

// Create and export a singleton instance - THIS IS THE KEY CHANGE
export const aiService = new AIService();