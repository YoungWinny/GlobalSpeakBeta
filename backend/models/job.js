// import mongoose from "mongoose";

// const jobSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     category:{
//       type:String,
//       required:true,
//     },
//     salary: { 
//     type: Number, 
//     required: true 
//     },
//     location: { 
//     type: String, 
//     required: true
//    },
//     status: {
//       type: String,
//       enum: ["open", "closed"],
//       default: "open",
//     },

//     userId: {
//       type: String,
//       required: true
//     },

//     assignedTask: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Task",
//       },
//     ],
//   },
//   {
//     timestamps: true, // Automatically creates `createdAt` and `updatedAt`
//   }
// );

// const Job = mongoose.model("Job", jobSchema);
// export default Job;

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Tech', 'Design', 'Marketing', 'Business', 'Real Estate', 'Industry', 'Finance', 'Archiving']
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship']
  },
  experience: {
    type: String,
    required: true,
    enum: ['Beginner', 'Mid level', 'Above average', 'Senior level', 'Expert']
  },
  location: {
    type: String,
    required: true,
    enum: ['Yaounde', 'Douala', 'Ebolowa', 'Ngaoundere', 'Bafoussam', 
           'Maroua', 'Bamenda', 'Bertoua', 'Buea', 'Garoua']
  },
  salary: {
    type: String,
    required: true
  },
}, { 
  timestamps: true // Adds createdAt and updatedAt automatically
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
