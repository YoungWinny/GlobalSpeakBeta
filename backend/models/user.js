// models/user.js
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  fullName: {type:String,required:true,unique:false},
  email: {type:String,required:true,unique:true},
  password: {type:String,required:true},
  role: {
    type: String,
    enum: ['admin', 'recruiter', 'jobseeker','learner'],
    default: 'jobseeker',
  },
  isProfileComplete:{
    type: Boolean,
    default: false,
  },
  // Additional fields for learners
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  completedExercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    score: Number,
    completedAt: Date
  }],
  completedAssessments: [{
    assessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment'
    },
    score: Number,
    completedAt: Date
  }],
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certificate'
  }],
  xp: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  lastActive: Date,
  cv: String,
  documents: [String]
}, {
  timestamps: true
});


const UserModel = mongoose.model('User', UserSchema);
export {UserModel as User}
