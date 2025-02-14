import bcrypt from 'bcrypt'
import { User } from '../model/user.model.js'
import { generateToken } from '../utils/generateToken.js'
import cloudinary from '../utils/cloudinary.js'

export const createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields', success: false })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters', success: false })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            fullName,
            email,
            password: hashPassword,
        });

        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error for create user' })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields', success: false })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found', success: false })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password', success: false })
        }

        generateToken(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error for login user' })
    }
}

export const logoutUser = (req, res) => {
    try {
        return res.status(200).cookie("jwt", "", { maxAge: 0 }).json({ success: true, message: 'Logged out successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Error for logout user')
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user?._id;
        if (!profilePic) {
            return res.status(400).json({ message: 'Please provide profile pic', success: false })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })
        return res.status(200).json({ success: true, message: 'Profile updated successfully', data: updateUser })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Error for update profile' })
    }

}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



