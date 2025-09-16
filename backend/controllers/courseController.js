// import Course from '../models/course.js';
// import CourseContent from '../models/courseContent.js';
// import {User} from '../models/user.js'

// // Create a new course
// export const createCourse = async (req, res) => {
//   try {
//     const course = new Course({
//       ...req.body,
//       creator: req.user.id
//     });
    
//     const savedCourse = await course.save();
//     res.status(201).json(savedCourse);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all courses
// export const getCourses = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search, language, level, specialization } = req.query;
//     const query = { status: 'published' };
    
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
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single course
// export const getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate('creator', 'name email');
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     res.json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update course
// export const updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Check if user is the creator
//     if (course.creator.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     Object.assign(course, req.body);
//     const updatedCourse = await course.save();
    
//     res.json(updatedCourse);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete course
// export const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     // Check if user is the creator
//     if (course.creator.toString() !== req.user.id) {
//       return res.status(403).json({ message: 'Not authorized' });
//     }
    
//     await course.remove();
//     res.json({ message: 'Course deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get course content
// export const getCourseContent = async (req, res) => {
//   try {
//     const content = await CourseContent.find({ courseID: req.params.id })
//       .sort({ order: 1 });
    
//     res.json(content);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Enroll in a course
// export const enrollCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);
    
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }
    
//     const user = await User.findById(req.user.id);
    
//     // Check if already enrolled
//     const alreadyEnrolled = user.enrolledCourses.find(
//       ec => ec.course.toString() === req.params.id
//     );
    
//     if (alreadyEnrolled) {
//       return res.status(400).json({ message: 'Already enrolled in this course' });
//     }
    
//     user.enrolledCourses.push({
//       course: req.params.id,
//       courseProgress: 0,
//       completed: false
//     });
    
//     await user.save();
//     res.json({ message: 'Successfully enrolled in course' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get user's enrolled courses
// export const getEnrolledCourses = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('enrolledCourses.course', 'title description language level thumbnail');
    
//     res.json(user.enrolledCourses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


















import Course from '../models/course.js';
import CourseContent from '../models/courseContent.js';
import User from '../models/user.js';

// Create a new course
export const createCourse = async (req, res) => {
  try {
    // Add validation for required fields
    const { title, description, language, level, specialization } = req.body;
    
    if (!title || !description || !language || !level || !specialization) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, language, level, specialization' 
      });
    }

    const course = new Course({
      title,
      description,
      language,
      level,
      specialization,
      duration: req.body.duration || 0,
      creator: req.user.id,
      thumbnail: req.body.thumbnail,
      price: req.body.price || 0,
      tags: req.body.tags || []
    });
    
    const savedCourse = await course.save();
    
    // Populate creator info in the response
    await savedCourse.populate('creator', 'name email');
    
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed',
        errors 
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Course with this title already exists' 
      });
    }
    
    res.status(400).json({ message: error.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, language, level, specialization, status } = req.query;
    const query = {};
    
    // Only show published courses to non-creators
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }
    
    if (search) query.title = { $regex: search, $options: 'i' };
    if (language) query.language = language;
    if (level) query.level = level;
    if (specialization) query.specialization = specialization;
    
    const courses = await Course.find(query)
      .populate('creator', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Course.countDocuments(query);
    
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
      .populate('creator', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // If course is not published, only creator can view it
    if (course.status !== 'published' && course.creator._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this course' });
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
    
    // Check if user is the creator
    if (course.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Update allowed fields
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
    await updatedCourse.populate('creator', 'name email');
    
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
    
    // Check if user is the creator
    if (course.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    // Also delete all associated content
    await CourseContent.deleteMany({ courseID: req.params.id });
    
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course and associated content deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
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
    
    // Check if user can access this content
    if (course.status !== 'published' && course.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this content' });
    }
    
    const content = await CourseContent.find({ courseID: req.params.id })
      .sort({ order: 1 });
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching course content:', error);
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
    
    const user = await User.findById(req.user.id);
    
    // Check if already enrolled
    const alreadyEnrolled = user.enrolledCourses.find(
      ec => ec.course.toString() === req.params.id
    );
    
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    user.enrolledCourses.push({
      course: req.params.id,
      courseProgress: 0,
      completed: false
    });
    
    await user.save();
    
    // Populate the course info in the response
    await user.populate('enrolledCourses.course', 'title description language level thumbnail');
    
    res.json({ 
      message: 'Successfully enrolled in course',
      enrolledCourse: user.enrolledCourses.find(ec => ec.course._id.toString() === req.params.id)
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's enrolled courses
export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title description language level thumbnail');
    
    res.json(user.enrolledCourses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: error.message });
  }
};