import User from "../models/user.model.js";

export const findUserByUsername = (req, res) => {

    // Need to use query parameters in endpoint
    User.find({username: req.query.username}).then((user) => {
        return res.status(200).json({
            success: true,
            message: "Returned user by username",
            User: user
        })
    }).catch((e) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: e.message
        })
    })
}

export const findUserByEmail = (req, res) => {

    // Need to use query parameters in endpoint
    User.find({email: req.query.email}).then((user) => {
        return res.status(200).json({
            success: true,
            message: "Returned user by email",
            User: user
        })
    }).catch((e) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: e.message
        })
    })
}

export const findUserByID = (req, res) => {

    // Need to use query parameters in endpoint
    User.find({_id: req.query.id}).then((user) => {
        return res.status(200).json({
            success: true,
            message: "Returned user by ID",
            User: user
        })
    }).catch((e) => {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: e.message
        })
    })
}

export const addNewUser = (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        pronouns: req.body.pronouns,
        about: req.body.about,
        interests: req.body.interests
    })

    user.save().then((newUser) => {
        return res.status(201).json({
            success: true,
            message: "New user added to database",
            User: newUser
        })
    }).catch((e) => {
        return res.status(500).json({
            success: false,
            message: "Failed to add new user to database",
            error: e.message
        })
    })
}

