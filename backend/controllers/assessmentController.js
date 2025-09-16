import Assessment from '../models/assessment.js';
import CourseContent from '../models/courseContent.js';
import {User} from '../models/user.js';
import Certificate from '../models/certificate.js';

// Attempt an assessment
export const attemptAssessment = async (req, res) => {
  try {
    const { contentId } = req.body;
    
    const content = await CourseContent.findById(contentId);
    if (!content || content.type !== 'assessment') {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Check if user is enrolled in the course
    const user = await User.findById(req.user.id);
    const isEnrolled = user.enrolledCourses.find(
      ec => ec.course.toString() === content.courseID.toString()
    );
    
    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    let assessment = await Assessment.findOne({
      questions: contentId,
      learner: req.user.id,
      course: content.courseID
    });
    
    if (assessment && assessment.status === 'completed') {
      return res.status(400).json({ message: 'Assessment already completed' });
    }
    
    if (!assessment) {
      assessment = new Assessment({
        assessmentID: `ass_${Date.now()}`,
        questions: contentId,
        learner: req.user.id,
        course: content.courseID,
        status: 'in_progress',
        startedAt: new Date()
      });
    }
    
    const savedAssessment = await assessment.save();
    res.json(savedAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Evaluate assessment
export const evaluateAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;
    
    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Check if user owns this assessment
    if (assessment.learner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    const content = await CourseContent.findById(assessment.questions);
    if (!content) {
      return res.status(404).json({ message: 'Assessment content not found' });
    }
    
    assessment.answers = answers;
    assessment.completedAt = new Date();
    assessment.timeSpent = Math.floor(
      (assessment.completedAt - assessment.startedAt) / 1000
    );
    
    // Calculate score
    assessment.score = evaluateAssessmentAnswers(content.questions, answers);
    assessment.status = assessment.score >= content.passingScore ? 'passed' : 'failed';
    assessment.attempts += 1;
    
    const savedAssessment = await assessment.save();
    
    // Update user progress
    const user = await User.findById(req.user.id);
    const courseProgress = user.enrolledCourses.find(
      ec => ec.course.toString() === content.courseID.toString()
    );
    
    if (!courseProgress.completedAssessments.includes(assessment.questions)) {
      courseProgress.completedAssessments.push(assessment.questions);
      
      // Award XP based on assessment score
      courseProgress.xp += assessment.score * 20;
      
      // If passed, mark course as completed if all content is done
      if (assessment.status === 'passed') {
        const allContent = await CourseContent.find({ courseID: content.courseID });
        const completedContent = [
          ...courseProgress.completedLessons,
          ...courseProgress.completedExercises,
          assessment.questions
        ];
        
        if (allContent.every(c => completedContent.includes(c._id.toString()))) {
          courseProgress.completed = true;
          courseProgress.courseProgress = 100;
          
          // Generate certificate
          await generateCertificate({
            course: content.courseID,
            learner: req.user.id,
            score: assessment.score
          });
        } else {
          courseProgress.courseProgress = Math.round(
            (completedContent.length / allContent.length) * 100
          );
        }
      }
      
      await user.save();
    }
    
    res.json(savedAssessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Evaluate assessment answers
const evaluateAssessmentAnswers = (questions, userAnswers) => {
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
    // Essay questions need manual evaluation and are not scored here
  });
  
  return Math.round((score / totalPoints) * 100);
};

// Get assessment by ID
export const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('questions')
      .populate('learner', 'name email')
      .populate('course', 'title');
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all assessments for a user
export const getUserAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ learner: req.params.userId })
      .populate('questions', 'title')
      .populate('course', 'title')
      .sort({ createdAt: -1 });
    
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assessment results
export const getAssessmentResults = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.assessmentId)
      .populate('questions')
      .populate('course', 'title passingScore');
    
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }
    
    // Check if user has permission to view results
    if (assessment.learner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};