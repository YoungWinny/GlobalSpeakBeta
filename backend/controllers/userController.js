// controllers/userController.js
import {User} from '../models/user.js'
import bcrypt from 'bcrypt'

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  
  const{fullName,email,password} = req.body;
  const user = User.findOne({email})
  if (user){
     return res.json({message:"user already exists", user})
  }

  const saltRound = 10
  const genSalt = await bcrypt.genSalt(saltRound)
  const hashpassword = await bcrypt.hash(password, saltRound)
  const newUser = new User({
      fullName,
      email,
      password:hashpassword,
  })
  await newUser.save()
  return res.json({message:"record registered"})
}


export {Login, deleteUser}

