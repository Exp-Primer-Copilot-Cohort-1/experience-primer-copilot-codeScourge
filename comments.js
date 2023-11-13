// Create web server
// 1. Create a web server
// 2. Handle GET /comments
// 3. Handle POST /comments
// 4. Handle GET /comments/:id
// 5. Handle DELETE /comments/:id
// 6. Handle PUT /comments/:id
// 7. Handle GET /comments/:id/author
// 8. Handle GET /comments/:id/post

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');
const posts = require('../data/posts');

// 2. Handle GET /comments
router.get('/', (req, res) => {
    res.json(comments);
});

// 3. Handle POST /comments
router.post('/', (req, res) => {
    // Check if all required fields are present
    if (!req.body) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    // Check if all required fields are non-empty
    if (!req.body.name || !req.body.comment || !req.body.postId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    // Check if the postId is valid
    if (!posts[req.body.postId]) {
        res.status(400).json({ error: 'Please provide a valid postId' });
        return;
    }

    // Add the comment to the comments array
    const comment = {
        ...req.body,
        id: comments.length + 1,
    };
    comments.push(comment);

    // Send the comment as response
    res.status(201).json(comment);
});

// 4. Handle GET /comments/:id
router.get('/:id', (req, res) => {
    // Check if the comment exists
    if (!comments[req.params.id - 1]) {
        res.status(404).json({ error: 'Comment not found' });
        return;
    }

    // Send the comment as response
    res.json(comments[req.params.id - 1]);
});

// 5. Handle DELETE /comments/:id
router.delete('/:id', (req, res) => {
    // Check if the comment exists
    if (!comments[req.params.id - 1]) {
        res.status(404).json({ error: 'Comment not found' });
        return;
    };
});