import { ExamModel } from "../models/exam.js";

// Create a new exam
export const createExam = async (req, res) => {
  
  try {
    const newExam = new ExamModel({...req.body});
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get exams
export const getAllExams = async (req, res) => {
  try {
    let exams = null;
    if(req.query.id){
      exams = await ExamModel.findById(req.query.id)
    }else{
     exams  = await ExamModel.find();
    }
    res.status(200).json(exams);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get an exam by his job id
export const getOneExamsByJob = async (req,res)=>{
  try {
     const exams  = await ExamModel.find({job: req.params.id});
    res.status(200).json(exams);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Assign exam to a job
export const assignExamToJob = async (req, res) => {
  const { examId } = req.params;
  const { jobId } = req.body;
  
  try {
    const exam = await ExamModel.findByIdAndUpdate(examId, { job: jobId }, { new: true });
    res.status(200).json(exam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
