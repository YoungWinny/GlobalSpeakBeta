import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category:{
      type:String,
      required:true,
    },
    salary: { 
    type: Number, 
    required: true 
    },
    location: { 
    type: String, 
    required: true
   },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    // summary: {
    //   type: String, 
    //   required: true
    // },

    // exam: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Exam",
    // },
    userId: {
      type: String,
      required: true
    },
    files: [{ // Add this field to store file paths
             type: String,
         }],
    assignedTask: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt`
  }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
