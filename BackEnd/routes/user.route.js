import express from 'express';

const router = express.Router();

router.put('/user/:id', (req, res) => {
    res.send('User updated successfully');
});