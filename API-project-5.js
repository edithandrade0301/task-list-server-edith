const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());

// Lista de tareas (simulamos un arreglo)
let tasks = [];

// Endpoint para crear una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = req.body;
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Endpoint para actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    tasks[taskId] = updatedTask;
    res.json(updatedTask);
});

// Endpoint para eliminar una tarea existente
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    tasks.splice(taskId, 1);
    res.sendStatus(204);
});

// Endpoint para listar todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint para listar las tareas completas
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(task => task.completed);
    res.json(completedTasks);
});

// Endpoint para listar las tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    res.json(incompleteTasks);
});

// Endpoint para obtener una sola tarea por su ID
app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks[taskId];
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
