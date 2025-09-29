

















class AIService {
  constructor() {
    // Don't check API key in constructor - it might not be loaded yet
    this.apiKey = null;
    this.initialized = false;
  }

  // Initialize when needed, not in constructor
  initialize() {
    if (this.initialized) return;
    
    this.apiKey = process.env.GROQ_API_KEY;
    this.initialized = true;
    
    if (!this.apiKey) {
      console.warn('GROQ_API_KEY not found. AI features will use mock data.');
    } else {
      console.log('GROQ_API_KEY loaded successfully. AI features enabled.');
    }
  }

  async makeGroqRequest(messages, model = 'llama-3.3-70b-versatile', temperature = 0.7, max_tokens = 1024) {
    this.initialize(); // Ensure initialized
    
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

    return this.makeGroqRequest(messages, 'llama-3.3-70b-versatile', 0.7, 2048);
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

  // Generate assessment questions
  async generateAssessmentQuestions(courseContent, questionCount = 10) {
    const prompt = `
      Based on the following course content, generate ${questionCount} assessment questions:
      ${JSON.stringify(courseContent)}
      
      Include a mix of question types: multiple choice, fill-in-blank, and short answer.
      For multiple choice, provide 4 options with one correct answer.
      Return as JSON with questions array containing type, question, options, correctAnswer, and points.
    `;

    const messages = [
      {
        role: "system",
        content: "You are an assessment designer. Create valid assessment questions based on course content."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    const response = await this.makeGroqRequest(messages, 'llama-3.3-70b-versatile', 0.5, 2048);
    
    try {
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || response.match(/{[\s\S]*}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      return response;
    } catch (error) {
      console.error('Failed to parse assessment response as JSON:', error);
      return response;
    }
  }

  // Generate translation
  async generateTranslation(text, sourceLang, targetLang) {
    const prompt = `
      Translate the following text from ${sourceLang} to ${targetLang}:
      "${text}"
      
      Provide a accurate translation and include 2-3 alternative translations if applicable.
    `;

    const messages = [
      {
        role: "system",
        content: "You are a professional translator. Provide accurate and natural translations."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    return this.makeGroqRequest(messages, 'llama-3.3-70b-versatile', 0.3, 512);
  }

  // Generate transcription exercise
  async generateTranscriptionExercise(difficulty, language, topic) {
    const prompt = `
      Create a transcription exercise for ${difficulty} level ${language} learners.
      Topic: ${topic}
      Provide a paragraph of text that would be used for transcription practice.
      Also provide 3 comprehension questions about the text.
    `;

    const messages = [
      {
        role: "system",
        content: "You create transcription exercises for language learners."
      },
      {
        role: "user",
        content: prompt
      }
    ];

    return this.makeGroqRequest(messages, 'llama-3.3-70b-versatile', 0.7, 1024);
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
      
      generateAssessmentQuestions: () => ({
        questions: [
          {
            type: 'mcq',
            question: 'Sample assessment question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswer: 'Option 2',
            points: 1
          }
        ]
      }),
      
      generateTranslation: () => `Translated text: "${args[0]}" from ${args[1]} to ${args[2]}`,
      
      generateTranscriptionExercise: () => `Transcription exercise for ${args[0]} level ${args[1]} learners about ${args[2]}`,
      
      modifyText: () => `Modified text: ${args[0]} (${args[1]} version)`
    };

    return mockResponses[method] ? mockResponses[method](...args) : 'AI service not available';
  }

  // Wrapper method that uses mock responses if API is not available
  async callWithFallback(method, ...args) {
    this.initialize(); // Ensure initialized before checking API key
    
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

// Create and export a singleton instance
export const aiService = new AIService();