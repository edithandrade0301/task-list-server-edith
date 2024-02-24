const express = require('express');
const app = express();
const listEditRouter = require('./list-edit-router');
const listViewRouter = require('./list-view-router');

const tasks = [
    {
        id: 123456,
        isCompleted: false,
        description: 'Walk the dog'
    }
];

app.use(express.json());

// Rutas para crear, actualizar y eliminar tareas
app.use('/tasks', listEditRouter(tasks));

// Rutas para ver tareas
app.use('/tasks', listViewRouter(tasks));

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App running in port: " + PORT);
});
