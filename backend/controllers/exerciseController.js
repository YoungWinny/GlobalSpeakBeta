import Exercise from '../models/exercise.js';
import CourseContent from '../models/courseContent.js';
import {User} from '../models/user.js';

// Attempt an exercise
export const attemptExercise = async (req, res) => {
  try {
    const { contentId, answers } = req.body;
    
    const content = await CourseContent.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    
    // Check if user is enrolled in the course
    const user = await User.findById(req.user.id);
    const isEnrolled = user.enrolledCourses.find(
      ec => ec.course.toString() === content.courseID.toString()
    );
    
    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    let exercise = await Exercise.findOne({
      content: contentId,
      learner: req.user.id
    });
    
    if (!exercise) {
      exercise = new Exercise({
        exerciseID: `ex_${Date.now()}`,
        content: contentId,
        learner: req.user.id,
        answers,
        attempts: 1
      });
    } else {
      exercise.answers = answers;
      exercise.attempts += 1;
    }
    
    // Auto-evaluate if possible (MCQ, fill-in-blank)
    if (content.type === 'exercise' && 
        (content.questions[0].type === 'mcq' || content.questions[0].type === 'fill-blank')) {
      exercise.score = evaluateExerciseAnswers(content.questions, answers);
      exercise.bestScore = Math.max(exercise.score, exercise.bestScore || 0);
      exercise.completed = true;
      
      // Update user progress
      if (!user.enrolledCourses.find(ec => 
        ec.course.toString() === content.courseID.toString()
      ).completedExercises.includes(contentId)) {
        user.enrolledCourses.find(ec => 
          ec.course.toString() === content.courseID.toString()
        ).completedExercises.push(contentId);
        
        // Award XP
        user.enrolledCourses.find(ec => 
          ec.course.toString() === content.courseID.toString()
        ).xp += exercise.score * 10;
        
        await user.save();
      }
    }
    
    const savedExercise = await exercise.save();
    res.json(savedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Evaluate exercise answers
const evaluateExerciseAnswers = (questions, userAnswers) => {
  let score = 0;
  let totalPoints = 0;
  
  questions.forEach(question => {
    totalPoints += question.points || 1;
    
    if (question.type === 'mcq') {
      const selectedOption = question.options.find(
        opt => opt.id === userAnswers[question._id]
      );
      
      if (selectedOption && selectedOption.isCorrect) {
        score += question.points || 1;
      }
    } else if (question.type === 'fill-blank') {
      if (userAnswers[question._id]?.toLowerCase().trim() === question.answer.toLowerCase().trim()) {
        score += question.points || 1;
      }
    }
    // Translation and essay questions need manual evaluation
  });
  
  return Math.round((score / totalPoints) * 100);
};

// Manual evaluation (for translation/essay exercises)
export const evaluateExercise = async (req, res) => {
  try {
    const { exerciseId, score, feedback } = req.body;
    
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    
    // Check if user has permission to evaluate (admin or instructor)
    const content = await CourseContent.findById(exercise.content);
    const course = await Course.findById(content.courseID);
    
    if (course.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    exercise.score = score;
    exercise.bestScore = Math.max(score, exercise.bestScore || 0);
    exercise.completed = true;
    exercise.feedback = feedback;
    
    const savedExercise = await exercise.save();
    
    // Update user progress and XP
    const user = await User.findById(exercise.learner);
    if (!user.enrolledCourses.find(ec => 
      ec.course.toString() === content.courseID.toString()
    ).completedExercises.includes(exercise.content)) {
      user.enrolledCourses.find(ec => 
        ec.course.toString() === content.courseID.toString()
      ).completedExercises.push(exercise.content);
      
      user.enrolledCourses.find(ec => 
        ec.course.toString() === content.courseID.toString()
      ).xp += score * 10;
      
      await user.save();
    }
    
    res.json(savedExercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exercise by ID
export const getExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
      .populate('content')
      .populate('learner', 'name email');
    
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get exercise progress for a user
export const getExerciseProgress = async (req, res) => {
  try {
    const exercise = await Exercise.findOne({
      content: req.params.contentId,
      learner: req.user.id
    });
    
    res.json(exercise || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all exercises for a user
export const getUserExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ learner: req.params.userId })
      .populate('content', 'title type')
      .sort({ createdAt: -1 });
    
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};