const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
    userId: String,
    todos: [
        {
            checked: Boolean,
            text: String
        },
    ],
});

module.exports = mongoose.model('Todos', todosSchema);