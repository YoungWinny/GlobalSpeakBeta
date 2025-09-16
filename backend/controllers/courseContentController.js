// import CourseContent from '../models/courseContent.js';
// import Course from '../models/course.js';
// import {AIService} from '../services/aiServices.js';

// // Create new content
// export const createContent = async (req, res) => {
//   try {
//     const course = await Course.findById(req.body.courseID);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Check if user is the course creator
//     if (course.creator.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     // Set order if not provided
//     if (!req.body.order) {
//       const lastContent = await CourseContent.findOne({ courseID: req.body.courseID })
//         .sort({ order: -1 });
//       req.body.order = lastContent ? lastContent.order + 1 : 1;
//     }
    
//     const content = new CourseContent(req.body);
//     const savedContent = await content.save();
    
//     res.status(201).json(savedContent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // AI-generated content
// export const generateAIContent = async (req, res) => {
//   try {
//     const { courseId, contentType, topic, options } = req.body;
    
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     let generatedContent;
    
//     switch (contentType) {
//       case 'outline':
//         generatedContent = await AIService.generateCourseOutline(
//           course.title, 
//           course.language, 
//           course.level, 
//           course.specialization
//         );
//         break;
        
//       case 'lesson':
//         generatedContent = await AIService.generateLessonContent(
//           topic, 
//           course.language, 
//           course.level, 
//           options?.context
//         );
//         break;
        
//       case 'exercises':
//         generatedContent = await AIService.generateExerciseQuestions(
//           topic, 
//           options?.questionType, 
//           course.language, 
//           course.level, 
//           options?.count
//         );
//         break;
        
//       case 'assessment':
//         // Get existing course content to base assessment on
//         const courseContent = await CourseContent.find({ courseID: courseId });
//         generatedContent = await AIService.generateAssessmentQuestions(
//           courseContent,
//           options?.questionCount
//         );
//         break;
        
//       case 'translation':
//         generatedContent = await AIService.generateTranslation(
//           options?.text,
//           options?.sourceLang || 'English',
//           options?.targetLang || course.language
//         );
//         break;
        
//       case 'transcription':
//         generatedContent = await AIService.generateTranscriptionExercise(
//           course.level,
//           course.language,
//           topic
//         );
//         break;
        
//       default:
//         return res.status(400).json({ message: 'Invalid content type' });
//     }

//     res.json({ generatedContent });
//   } catch (error) {
//     console.error('Error generating AI content:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Modify text using AI
// export const modifyTextWithAI = async (req, res) => {
//   try {
//     const { text, action } = req.body;
    
//     if (!text || !action) {
//       return res.status(400).json({ message: 'Text and action are required' });
//     }

//     const modifiedText = await AIService.modifyText(text, action);
//     res.json({ modifiedText });
//   } catch (error) {
//     console.error('Error modifying text with AI:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get content by ID
// export const getContent = async (req, res) => {
//   try {
//     const content = await CourseContent.findById(req.params.id);
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update content
// export const updateContent = async (req, res) => {
//   try {
//     const content = await CourseContent.findById(req.params.id);
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     const course = await Course.findById(content.courseID);
    
//     // Check if user is the course creator
//     if (course.creator.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     Object.assign(content, req.body);
//     const updatedContent = await content.save();
    
//     res.json(updatedContent);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete content
// export const deleteContent = async (req, res) => {
//   try {
//     const content = await CourseContent.findById(req.params.id);
    
//     if (!content) {
//       return res.status(404).json({ message: 'Content not found' });
//     }
    
//     const course = await Course.findById(content.courseID);
    
//     // Check if user is the course creator
//     if (course.creator.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     await content.remove();
//     res.json({ message: 'Content deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all content for a course
// export const getCourseContent = async (req, res) => {
//   try {
//     const content = await CourseContent.find({ courseID: req.params.courseId })
//       .sort({ order: 1 });
    
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Reorder content
// export const reorderContent = async (req, res) => {
//   try {
//     const { contentOrder } = req.body;
    
//     for (let i = 0; i < contentOrder.length; i++) {
//       await CourseContent.findByIdAndUpdate(
//         contentOrder[i],
//         { order: i + 1 }
//       );
//     }
    
//     res.json({ message: 'Content reordered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import CourseContent from '../models/courseContent.js';
import Course from '../models/course.js';
import { aiService } from '../services/aiServices.js';

// Create new content
export const createContent = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseID);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Set order if not provided
    if (!req.body.order) {
      const lastContent = await CourseContent.findOne({ courseID: req.body.courseID })
        .sort({ order: -1 });
      req.body.order = lastContent ? lastContent.order + 1 : 1;
    }
    
    const content = new CourseContent(req.body);
    const savedContent = await content.save();
    
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// AI-generated content
export const generateAIContent = async (req, res) => {
  try {
    const { courseId, contentType, topic, options } = req.body;
    
    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({ 
        success: false,
        message: 'courseId is required' 
      });
    }
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false,
        message: 'Course not found' 
      });
    }

    let generatedContent;
    
    switch (contentType) {
      case 'outline':
        generatedContent = await aiService.callWithFallback(
          'generateCourseOutline',
          course.title, 
          course.language, 
          course.level, 
          course.specialization
        );
        break;
        
      case 'lesson':
        generatedContent = await aiService.callWithFallback(
          'generateLessonContent',
          topic || 'General topic', 
          course.language, 
          course.level, 
          options?.context
        );
        break;
        
      case 'exercises':
        generatedContent = await aiService.callWithFallback(
          'generateExerciseQuestions',
          topic || 'General topic', 
          options?.questionType || 'mcq', 
          course.language, 
          course.level, 
          options?.count || 3
        );
        break;
        
      case 'modify':
        if (!options?.text) {
          return res.status(400).json({
            success: false,
            message: 'Text is required for modification'
          });
        }
        generatedContent = await aiService.callWithFallback(
          'modifyText',
          options.text,
          options?.action || 'expand'
        );
        break;
        
      default:
        return res.status(400).json({ 
          success: false,
          message: 'Invalid content type' 
        });
    }

    res.json({ 
      success: true,
      generatedContent,
      usingMock: !process.env.GROQ_API_KEY
    });
  } catch (error) {
    console.error('Error generating AI content:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      generatedContent: "AI service is currently unavailable. Please try again later."
    });
  }
};

// Modify text using AI
export const modifyTextWithAI = async (req, res) => {
  try {
    const { text, action } = req.body;
    
    if (!text || !action) {
      return res.status(400).json({ 
        success: false,
        message: 'Text and action are required' 
      });
    }

    const modifiedText = await aiService.callWithFallback(
      'modifyText',
      text, 
      action
    );
    
    res.json({ 
      success: true,
      modifiedText,
      usingMock: !process.env.GROQ_API_KEY
    });
  } catch (error) {
    console.error('Error modifying text with AI:', error);
    res.status(500).json({ 
      success: false,
      message: error.message
    });
  }
};

// Get content by ID
export const getContent = async (req, res) => {
  try {
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    Object.assign(content, req.body);
    const updatedContent = await content.save();
    
    res.json(updatedContent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    await CourseContent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all content for a course
export const getCourseContent = async (req, res) => {
  try {
    const content = await CourseContent.find({ courseID: req.params.courseId })
      .sort({ order: 1 });
    
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reorder content
export const reorderContent = async (req, res) => {
  try {
    const { contentOrder } = req.body;
    
    for (let i = 0; i < contentOrder.length; i++) {
      await CourseContent.findByIdAndUpdate(
        contentOrder[i],
        { order: i + 1 }
      );
    }
    
    res.json({ message: 'Content reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};