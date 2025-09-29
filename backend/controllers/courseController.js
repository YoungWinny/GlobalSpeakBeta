// import Course from '../models/course.js';
// import CourseContent from '../models/courseContent.js';
// import { User } from '../models/user.js';

// // Create a new course
// export const createCourse = async (req, res) => {
//   try {
//     // Add validation for required fields
//     const { title, description, language, level, specialization, userId } = req.body;
    
//     if (!title || !description || !language || !level || !specialization) {
//       return res.status(400).json({ 
//         message: 'Missing required fields: title, description, language, level, specialization' 
//       });
//     }

//     // Use userId from request body (passed from frontend)
//     if (!userId) {
//       return res.status(400).json({ 
//         message: 'User ID is required. Please make sure you are logged in.' 
//       });
//     }

//     // Verify the user exists
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const course = new Course({
//       title,
//       description,
//       language,
//       level,
//       specialization,
//       duration: req.body.duration || 0,
//       creator: userId,
//       thumbnail: req.body.thumbnail,
//       price: req.body.price || 0,
//       tags: req.body.tags || [],
//       status: 'draft'
//     });
    
//     const savedCourse = await course.save();
    
//     // Populate creator info in the response
//     await savedCourse.populate('creator', 'fullName email');
    
//     res.status(201).json(savedCourse);
//   } catch (error) {
//     console.error('Error creating course:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ 
//         message: 'Validation failed',
//         errors 
//       });
//     }
    
//     // Handle duplicate key errors
//     if (error.code === 11000) {
//       return res.status(400).json({ 
//         message: 'Course with this title already exists' 
//       });
//     }
    
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all courses - Updated to not require authentication
// export const getCourses = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, language, level, specialization, status } = req.query;
//     const query = {};
    
//     // For non-authenticated requests, only show published courses
//     query.status = 'published';
    
//     if (search) query.title = { $regex: search, $options: 'i' };
//     if (language) query.language = language;
//     if (level) query.level = level;
//     if (specialization) query.specialization = specialization;
    
//     const courses = await Course.find(query)
//       .populate('creator', 'name email')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });
    
//     const total = await Course.countDocuments(query);
    
//     res.json({
//       courses,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//       total
//     });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single course - Updated to not require authentication for published courses
// export const getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate('creator', 'name email');
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // If course is not published, return not found (instead of auth error)
//     if (course.status !== 'published') {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     res.json(course);
//   } catch (error) {
//     console.error('Error fetching course:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update course - Simplified to not check user authentication
// export const updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Update allowed fields
//     const allowedUpdates = ['title', 'description', 'duration', 'language', 'level', 
//                            'specialization', 'status', 'thumbnail', 'outline', 'price', 'tags'];
//     const updates = {};
    
//     Object.keys(req.body).forEach(key => {
//       if (allowedUpdates.includes(key)) {
//         updates[key] = req.body[key];
//       }
//     });
    
//     Object.assign(course, updates);
//     const updatedCourse = await course.save();
    
//     res.json(updatedCourse);
//   } catch (error) {
//     console.error('Error updating course:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ 
//         message: 'Validation failed',
//         errors 
//       });
//     }
    
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete course - Simplified to not check user authentication
// export const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Also delete all associated content
//     await CourseContent.deleteMany({ course: req.params.id });
    
//     await Course.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Course and associated content deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting course:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get course content - Updated to not require authentication for published courses
// export const getCourseContent = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // If course is not published, return not found
//     if (course.status !== 'published') {
//       return res.status(404).json({ message: 'Course content not available' });
//     }
    
//     const content = await CourseContent.find({ course: req.params.id })
//       .sort({ order: 1 });
    
//     res.json(content);
//   } catch (error) {
//     console.error('Error fetching course content:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Enroll in a course - Simplified to not require authentication
// export const enrollCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     if (course.status !== 'published') {
//       return res.status(400).json({ message: 'Cannot enroll in unpublished course' });
//     }
    
//     // For simplicity, we'll just return success without actually enrolling
//     // In a real implementation, you'd need user authentication here
//     res.json({ 
//       message: 'Successfully enrolled in course (demo mode)',
//       course: {
//         _id: course._id,
//         title: course.title,
//         enrolled: true
//       }
//     });
//   } catch (error) {
//     console.error('Error enrolling in course:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get enrolled courses - Simplified demo version
// export const getEnrolledCourses = async (req, res) => {
//   try {
//     // Demo response - in real implementation, this would fetch user's courses
//     res.json([]);
//   } catch (error) {
//     console.error('Error fetching enrolled courses:', error);
//     res.status(500).json({ message: error.message });
//   }
// };




// import Course from '../models/course.js';
// import CourseContent from '../models/courseContent.js';
// import { User } from '../models/user.js';

// // Create a new course
// export const createCourse = async (req, res) => {
//   try {
//     const { title, description, language, level, specialization, userId } = req.body;
    
//     if (!title || !description || !language || !level || !specialization) {
//       return res.status(400).json({ 
//         message: 'Missing required fields: title, description, language, level, specialization' 
//       });
//     }

//     if (!userId) {
//       return res.status(400).json({ 
//         message: 'User ID is required. Please make sure you are logged in.' 
//       });
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const course = new Course({
//       title,
//       description,
//       language,
//       level,
//       specialization,
//       duration: req.body.duration || 0,
//       creator: userId,
//       thumbnail: req.body.thumbnail,
//       price: req.body.price || 0,
//       tags: req.body.tags || [],
//       status: 'draft'
//     });
    
//     const savedCourse = await course.save();
//     await savedCourse.populate('creator', 'fullName email');
    
//     res.status(201).json(savedCourse);
//   } catch (error) {
//     console.error('Error creating course:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return res.status(400).json({ 
//         message: 'Validation failed',
//         errors 
//       });
//     }
    
//     if (error.code === 11000) {
//       return res.status(400).json({ 
//         message: 'Course with this title already exists' 
//       });
//     }
    
//     res.status(400).json({ message: error.message });
//   }
// };


import Course from '../models/course.js';
import CourseContent from '../models/courseContent.js';
import { User } from '../models/user.js';

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const { title, description, language, level, specialization, userId } = req.body;
    
    if (!title || !description || !language || !level || !specialization) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, language, level, specialization' 
      });
    }

    if (!userId) {
      return res.status(400).json({ 
        message: 'User ID is required. Please make sure you are logged in.' 
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const course = new Course({
      title,
      description,
      language,
      level,
      specialization,
      duration: req.body.duration || 0,
      creator: userId,
      thumbnail: req.body.thumbnail,
      price: req.body.price || 0,
      tags: req.body.tags || [],
      status: 'draft'
      // courseID will be auto-generated by the pre-save middleware
    });
    
    const savedCourse = await course.save();
    await savedCourse.populate('creator', 'fullName email');
    
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }
    
    if (error.code === 11000) {
      // Handle duplicate courseID (shouldn't happen with our generation)
      return res.status(400).json({ 
        message: 'Course ID conflict. Please try again.' 
      });
    }
    
    res.status(400).json({ message: error.message });
  }
};

// // Get all courses with filtering
// export const getCourses = async (req, res) => {
//   try {
//     const { status = 'all', search, language, level, specialization, page = 1, limit = 10 } = req.query;
//     const query = {};
    
//     // Handle status filter
//     if (status !== 'all') {
//       query.status = status;
//     } else {
//       // For authenticated users, show all their courses regardless of status
//       // For public access, only show published courses
//       if (!req.user) {
//         query.status = 'published';
//       }
//     }
    
//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: 'i' } },
//         { description: { $regex: search, $options: 'i' } }
//       ];
//     }
    
//     if (language) query.language = language;
//     if (level) query.level = level;
//     if (specialization) query.specialization = specialization;

//     const courses = await Course.find(query)
//       .populate('creator', 'name email fullName')
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .sort({ createdAt: -1 });
    
//     const total = await Course.countDocuments(query);
    
//     res.json({
//       courses,
//       totalPages: Math.ceil(total / limit),
//       currentPage: parseInt(page),
//       total
//     });
//   } catch (error) {
//     console.error('Error fetching courses:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
// Get all courses with filtering - SIMPLIFIED VERSION
export const getCourses = async (req, res) => {
  try {
    const { status = 'all', search, language, level, specialization, page = 1, limit = 100 } = req.query;
    const query = {};
    
    console.log('Fetching courses with status:', status);
    
    // SIMPLIFIED: Always apply status filter unless it's 'all'
    if (status && status !== 'all') {
      query.status = status;
    }
    // If status is 'all', don't add any status filter - show everything
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (language) query.language = language;
    if (level) query.level = level;
    if (specialization) query.specialization = specialization;

    console.log('Database query:', query);
    
    const courses = await Course.find(query)
      .populate('creator', 'name email fullName')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(query);
    
    console.log(`Found ${courses.length} courses`);
    
    res.json({
      courses,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('creator', 'name email fullName');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const allowedUpdates = ['title', 'description', 'duration', 'language', 'level', 
                           'specialization', 'status', 'thumbnail', 'outline', 'price', 'tags'];
    const updates = {};
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });
    
    Object.assign(course, updates);
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }
    
    res.status(400).json({ message: error.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    await CourseContent.deleteMany({ course: req.params.id });
    await Course.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Publish course
export const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    course.status = 'published';
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error publishing course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Unpublish course
export const unpublishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    course.status = 'draft';
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error unpublishing course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get creator's courses
export const getCreatorCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status = 'all' } = req.query;
    
    const query = { creator: userId };
    if (status !== 'all') {
      query.status = status;
    }
    
    const courses = await Course.find(query)
      .populate('creator', 'name email fullName')
      .sort({ createdAt: -1 });
    
    res.json({ courses });
  } catch (error) {
    console.error('Error fetching creator courses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    if (course.status !== 'published') {
      return res.status(400).json({ message: 'Cannot enroll in unpublished course' });
    }
    
    // For demo purposes - in real implementation, you'd add user to enrolled courses
    res.json({ 
      message: 'Successfully enrolled in course',
      course: {
        _id: course._id,
        title: course.title,
        enrolled: true
      }
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get enrolled courses
export const getEnrolledCourses = async (req, res) => {
  try {
    // Demo response - in real implementation, this would fetch user's enrolled courses
    const courses = await Course.find({ status: 'published' })
      .populate('creator', 'name email')
      .limit(10)
      .sort({ createdAt: -1 });
    
    res.json(courses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get course content
export const getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // If course is not published, return not found for public access
    if (course.status !== 'published' && !req.user) {
      return res.status(404).json({ message: 'Course content not available' });
    }
    
    const content = await CourseContent.find({ course: req.params.id })
      .sort({ order: 1 });
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching course content:', error);
    res.status(500).json({ message: error.message });
  }
};

// Archive course
export const archiveCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    course.status = 'archived';
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error archiving course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Restore course from archive
export const restoreCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    course.status = 'draft';
    const updatedCourse = await course.save();
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error restoring course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get course statistics
export const getCourseStats = async (req, res) => {
  try {
    const courseId = req.params.id;
    
    const [course, contentCount, publishedContentCount] = await Promise.all([
      Course.findById(courseId),
      CourseContent.countDocuments({ course: courseId }),
      CourseContent.countDocuments({ course: courseId, isPublished: true })
    ]);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json({
      course,
      stats: {
        totalContent: contentCount,
        publishedContent: publishedContentCount,
        completionPercentage: contentCount > 0 ? Math.round((publishedContentCount / contentCount) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching course stats:', error);
    res.status(500).json({ message: error.message });
  }
};