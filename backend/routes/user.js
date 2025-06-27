import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { User } from '../models/user.js';

const router = express.Router();

const KEY = process.env.KEY || "jwttokenkey" 

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    console.log(`Running signup, req body`, req.body);

    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ message: "user already existed" })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    let newUser = null
    if(req.body?.role){
        newUser = new User({
            fullName,
            email,
            password: hashpassword,
            role: req.body?.role
        })
    }else{
        newUser = new User({
            fullName,
            email,
            password: hashpassword,
        })
    }

    await newUser.save();
    console.log('new user created', newUser);

    return res.json({ status: true, message: "Account created successfully !!!" })

})
router.post('/login', async (req, res) => {
    console.log('Logging in, req body: ');
    console.log(req.body);
    
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "user does not exist !!!" })
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: "Invalid password try again !!!" })
    }

    const token = jwt.sign({ email: user.email }, KEY, { expiresIn: '1hr' })
    res.cookie('token', token, { httpOnly: true, maxAge: 36000 })
    
    return res.json({ status: true, message: "login successfully", user })
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "user not registered" })
        }
        var nodemailer = require('nodemailer');

        const token = jwt.sign({ usrername: user.username }, KEY, { expiresIn: '1hr' })


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kanzues65@gmail.com',
                pass: 'yourpassword'
            }
        });

        var mailOptions = {
            from: 'kanzues65@gmail.com',
            to: 'myfriend@yahoo.com',
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "error sending email" })
            } else {
                return res.json({ status: true, message: "email sent" })

            }
        });

    } catch (err) {
        console.log(err)
    }
})

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body
    try {
        const decoded = jwt.verify(token, KEY);
        const id = decoded.id;
        const hashpassword = bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({ _id: id }, { password: hashpassword })
        return res.json({ status: true, message: "updated password" })
    }
    catch (err) {
        return res.json("invalid token")
    }

})

export default router;