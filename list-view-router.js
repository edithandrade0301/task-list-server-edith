const express = require('express');
const app = express();

const tasks = [
    {
        id: 123456,
        isCompleted: false,
        description: 'Walk the dog'
    }
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App running in port: " + PORT);
});
