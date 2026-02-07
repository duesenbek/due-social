const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "name")
            .populate({
                path: 'replyTo',
                populate: { path: 'author', select: 'name' }
            })
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    const { content, replyTo } = req.body;
    if (!content) return res.status(400).json({ msg: "Content required" });

    try {
        const postData = {
            content,
            author: req.userId
        };
        if (replyTo) {
            postData.replyTo = replyTo;
        }

        const post = await Post.create(postData);

        await post.populate("author", "name");
        if (replyTo) {
            await post.populate({
                path: 'replyTo',
                populate: { path: 'author', select: 'name' }
            });
        }

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ msg: "Post not found" });

        if (post.author.toString() !== req.userId) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.deleteOne();
        res.json({ msg: "Post removed" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.put("/like", authMiddleware, async (req, res) => {
    try {
        const { postId } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(422).json({ error: "Post not found" });
        }

        const operator = post.likes.includes(req.userId) ? '$pull' : '$push';

        const result = await Post.findByIdAndUpdate(postId, {
            [operator]: { likes: req.userId }
        }, {
            new: true
        })
            .populate("author", "name")
            .populate({
                path: 'replyTo',
                populate: { path: 'author', select: 'name' }
            });

        res.json(result);
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});

module.exports = router;
