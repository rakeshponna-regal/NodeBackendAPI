import User from "../model/User.js";
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /
 *   get:
 *     summary: Get all User
 *     responses:
 *       200:
 *         description: Returns all User
 */
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find()
    } catch (error) {
        console.log(error)
    }
    if (!users) {
        return res.status(404).json({
            message: "No users found"
        })
    }
    return res.status(200).json({
        users
    })
}

/** 
 * @swagger
 * /signup:
 *  post:
 *   
 * 
 * */ 
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email })
    } catch (error) {
        console.log(error)
    }
    if (existingUser) {
        return res.status(404).json({
            message: "User Already exists! Login Instead"
        })
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs:[]
    })
    try {
        user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(200).json({
        user
    })
}

export const login = async (req, res,next) => {
    const { email, password } = req.body;
    let user;
    try {
        user = await User.findOne({ email })
    } catch (e) {
        console.log(e);
    }
    if (!user) {
        return res.status(404).json({
            message: "Couldn't find user by this email"
        })
    }
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(404).json({message :"Invalid  Password"});
    };
    return res.status(200).json({
        message: "Login Successfull"
    });

}
