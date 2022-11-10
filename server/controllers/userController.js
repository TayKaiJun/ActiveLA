import User from "../models/user.model.js";


// TODO: Make login and signup methods that are secure 

export const findUserByUsername = async (req, res) => {
    try {
        const user = User.find({username: req.query.username})
        return res.status(200).json({
            success: true,
            message: "Returned user by username",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const findUserByEmail = async (req, res) => {
    try {
        const user = await User.find({email: req.query.email})
        return res.status(200).json({
            success: true,
            message: "Returned user by email",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const data = await User.find({email: req.query.email})
        return res.status(200).json({
            success: true,
            message: "Login successful",
            User: data
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const findUserByID = async (req, res) => {
    try {
        const user = await User.find({_id: req.query.id})
        return res.status(200).json({
            success: true,
            message: "Returned user by ID",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        })
    }
}

export const addNewUser = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name,
            pronouns: req.body.pronouns,
            about: req.body.about,
            interests: req.body.interests,
            eventsHosting: [],
            eventsGoing: [],
            eventsPending: []
        })

        await user.save();

        return res.status(201).json({
            success: true,
            message: "New user added to database",
            User: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to add new user to database",
            error: err.message
        })
    }
}

