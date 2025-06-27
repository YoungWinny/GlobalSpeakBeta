// models/user.js
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  fullName: {type:String,required:true,unique:false},
  email: {type:String,required:true,unique:true},
  password: {type:String,required:true},
  role: {
    type: String,
    enum: ['admin', 'recruiter', 'jobseeker'],
    default: 'jobseeker',
  },
  exams: [
    {
      exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
      },
      responses: [
        {
          question: {
            type: String
          },
          option1: {
            type: String
          },
          option2: {
            type: String
          },
          option3: {
            type: String
          },
          option4: {
            type: String
          },
          answer: {
            type: String
          }
        }
      ],
      score: {
        type: String
      }
    }
  ],
  isProfileComplete:{
    type: Boolean,
    default: false,
  }
});

const UserModel = mongoose.model('User', UserSchema);
export {UserModel as User}
