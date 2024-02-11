const express = require('express');
const listViewRouter = express.Router();

//ejemplo
const tasks = [
    { id: 1, description: "Tarea 1", completed: true },
    { id: 2, description: "Tarea 2", completed: true },
    { id: 3, description: "Tarea 3", completed: false }
];

//listar todas las tareas
listViewRouter.get('/tasks', (req, res) => {
    res.json(tasks);
});

//ver una tarea en especifico
listViewRouter.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(task);
});

//filtrar por tareas completas o incompletas
listViewRouter.get('/tasks/filter/:completed', (req, res) => {
    const filterCompleted = req.params.completed === 'completed';
    const filteredTasks = tasks.filter(task => task.completed === filterCompleted);
    res.json(filteredTasks);
});

module.exports = listViewRouter;