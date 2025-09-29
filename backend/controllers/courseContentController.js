// import CourseContent from '../models/courseContent.js';
// import Course from '../models/course.js';
// import { aiService } from '../services/aiServices.js';

// // Create new content
// export const createContent = async (req, res) => {
//   try {
//     const course = await Course.findById(req.body.course);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Set order if not provided
//     if (!req.body.order) {
//       const lastContent = await CourseContent.findOne({ course: req.body.courseID })
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
    
//     // Check if courseId is provided
//     if (!courseId) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'courseId is required' 
//       });
//     }
    
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ 
//         success: false,
//         message: 'Course not found' 
//       });
//     }

//     let generatedContent;
    
//     switch (contentType) {
//       case 'outline':
//         generatedContent = await aiService.callWithFallback(
//           'generateCourseOutline',
//           course.title, 
//           course.language, 
//           course.level, 
//           course.specialization
//         );
//         break;
        
//       case 'lesson':
//         generatedContent = await aiService.callWithFallback(
//           'generateLessonContent',
//           topic || 'General topic', 
//           course.language, 
//           course.level, 
//           options?.context
//         );
//         break;
        
//       case 'exercises':
//         generatedContent = await aiService.callWithFallback(
//           'generateExerciseQuestions',
//           topic || 'General topic', 
//           options?.questionType || 'mcq', 
//           course.language, 
//           course.level, 
//           options?.count || 3
//         );
//         break;
        
//       case 'modify':
//         if (!options?.text) {
//           return res.status(400).json({
//             success: false,
//             message: 'Text is required for modification'
//           });
//         }
//         generatedContent = await aiService.callWithFallback(
//           'modifyText',
//           options.text,
//           options?.action || 'expand'
//         );
//         break;
        
//       default:
//         return res.status(400).json({ 
//           success: false,
//           message: 'Invalid content type' 
//         });
//     }

//     res.json({ 
//       success: true,
//       generatedContent,
//       usingMock: !process.env.GROQ_API_KEY
//     });
//   } catch (error) {
//     console.error('Error generating AI content:', error);
//     res.status(500).json({ 
//       success: false,
//       message: error.message,
//       generatedContent: "AI service is currently unavailable. Please try again later."
//     });
//   }
// };

// // Modify text using AI
// export const modifyTextWithAI = async (req, res) => {
//   try {
//     const { text, action } = req.body;
    
//     if (!text || !action) {
//       return res.status(400).json({ 
//         success: false,
//         message: 'Text and action are required' 
//       });
//     }

//     const modifiedText = await aiService.callWithFallback(
//       'modifyText',
//       text, 
//       action
//     );
    
//     res.json({ 
//       success: true,
//       modifiedText,
//       usingMock: !process.env.GROQ_API_KEY
//     });
//   } catch (error) {
//     console.error('Error modifying text with AI:', error);
//     res.status(500).json({ 
//       success: false,
//       message: error.message
//     });
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
    
//     await CourseContent.findByIdAndDelete(req.params.id);
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

console.log('=== COURSE CONTENT CONTROLLER LOADING ===');

// Create new content
export const createContent = async (req, res) => {
  try {
    console.log('Creating content with data:', req.body);
    
    const course = await Course.findById(req.body.course);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Set order if not provided
    if (!req.body.order) {
      const lastContent = await CourseContent.findOne({ course: req.body.course })
        .sort({ order: -1 });
      req.body.order = lastContent ? lastContent.order + 1 : 1;
    }
    
    const content = new CourseContent(req.body);
    const savedContent = await content.save();
    
    console.log('Content created successfully:', savedContent._id);
    res.status(201).json(savedContent);
  } catch (error) {
    console.error('Error creating content:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get content by ID
export const getContent = async (req, res) => {
  try {
    console.log('Getting content with ID:', req.params.id);
    
    const content = await CourseContent.findById(req.params.id)
      .populate('course', 'title');
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update content
export const updateContent = async (req, res) => {
  try {
    console.log('Updating content with ID:', req.params.id);
    
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    Object.assign(content, req.body);
    const updatedContent = await content.save();
    
    res.json(updatedContent);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete content
export const deleteContent = async (req, res) => {
  try {
    console.log('Deleting content with ID:', req.params.id);
    
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    await CourseContent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all content for a course
export const getCourseContent = async (req, res) => {
  try {
    console.log('Getting content for course:', req.params.courseId);
    
    const content = await CourseContent.find({ course: req.params.courseId })
      .sort({ order: 1 })
      .populate('course', 'title');
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching course content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Reorder content
export const reorderContent = async (req, res) => {
  try {
    console.log('Reordering content for course:', req.params.courseId);
    console.log('New order:', req.body.contentOrder);
    
    const { contentOrder } = req.body;
    
    for (let i = 0; i < contentOrder.length; i++) {
      await CourseContent.findByIdAndUpdate(
        contentOrder[i],
        { order: i + 1 }
      );
    }
    
    res.json({ message: 'Content reordered successfully' });
  } catch (error) {
    console.error('Error reordering content:', error);
    res.status(500).json({ message: error.message });
  }
};

// AI-generated content
export const generateAIContent = async (req, res) => {
  try {
    console.log('Generating AI content with data:', req.body);
    
    const { courseId, contentType, topic, options } = req.body;
    
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

    console.log('AI content generated successfully');
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
    console.log('Modifying text with AI:', req.body);
    
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
    
    console.log('Text modified successfully');
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

// Publish content
export const publishContent = async (req, res) => {
  try {
    console.log('Publishing content with ID:', req.params.id);
    
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    content.isPublished = true;
    const updatedContent = await content.save();
    
    res.json(updatedContent);
  } catch (error) {
    console.error('Error publishing content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Unpublish content
export const unpublishContent = async (req, res) => {
  try {
    console.log('Unpublishing content with ID:', req.params.id);
    
    const content = await CourseContent.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    content.isPublished = false;
    const updatedContent = await content.save();
    
    res.json(updatedContent);
  } catch (error) {
    console.error('Error unpublishing content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get content by type
export const getContentByType = async (req, res) => {
  try {
    const { courseId, type } = req.params;
    console.log('Getting content by type:', { courseId, type });
    
    const content = await CourseContent.find({ 
      course: courseId, 
      type: type 
    })
    .sort({ order: 1 })
    .populate('course', 'title');
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content by type:', error);
    res.status(500).json({ message: error.message });
  }
};

// Debug endpoint
export const debugContent = async (req, res) => {
  try {
    console.log('Debug content endpoint hit');
    
    const allContent = await CourseContent.find()
      .populate('course', 'title')
      .limit(10)
      .sort({ createdAt: -1 });
    
    res.json({
      message: 'Content controller is working!',
      totalContent: allContent.length,
      sampleContent: allContent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    res.status(500).json({ message: error.message });
  }
};

console.log('=== COURSE CONTENT CONTROLLER LOADED ===');
console.log('Available exports:', {
  createContent: typeof createContent,
  getContent: typeof getContent,
  updateContent: typeof updateContent,
  deleteContent: typeof deleteContent,
  getCourseContent: typeof getCourseContent,
  reorderContent: typeof reorderContent,
  generateAIContent: typeof generateAIContent,
  modifyTextWithAI: typeof modifyTextWithAI,
  publishContent: typeof publishContent,
  unpublishContent: typeof unpublishContent,
  getContentByType: typeof getContentByType,
  debugContent: typeof debugContent
});

