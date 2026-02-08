const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');


router.get("/profile", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

router.put("/profile", authMiddleware, async (req, res) => {
    const { name, email } = req.body;

    try {
        let user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (name) user.name = name;
        if (email) {
          
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.userId) {
                return res.status(400).json({ msg: "Email already in use" });
            }
            user.email = email;
        }

        await user.save();
        const updatedUser = await User.findById(req.userId).select("-password");
        res.json(updatedUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
