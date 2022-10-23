const express = require('express');
const User = require('../schemas/userSchema');
const Todos = require('../schemas/todosSchema');
const auth = require('../services/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
    const todos = await Todos.findOne({ userId: req.user.id });
    if (!todos) {
        await Todos.create({
            userId: req.user.id,
            todos: req.body,
        });
    } else {
        todos.todos = req.body;
        await todos.save();
    }

    res.send(todos.todos);
});

router.get('/', auth, async (req, res) => {
    const todos = await Todos.findOne({ userId: req.user.id });
    if (todos) {
        res.json(todos.todos);
    } else {
        res.json({ message: 'There is no tasks' });
    }
});

module.exports = router;
