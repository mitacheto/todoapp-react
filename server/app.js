const express = require('express');
const cors = require('cors');

const user = require('./routes/user');
const todos = require('./routes/todos');

const app = express();
const mongoose = require('mongoose');

const port = 4000;

//connect to DB
mongoose.connect('mongodb://localhost:27017/todoappdb');

app.use(cors());
app.use(express.json());

app.use('/user', user);
app.use('/todos', todos);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    app.listen(port, () => {
        console.log(`App is listening at http://localhost:${port} and is connected to mongoDB`);
    });
});

module.exports = app;
