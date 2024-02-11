const express = require('express');
const listEditRouter = express.Router();

//crear una tarea
listEditRouter.post('/tasks', (req, res) => {
    const { description, completed } = req.body;
    if (!description) {
        return res.status(400).json({ message: "La descripción de la tarea es requerida" });
    }
    const newTask = { id: Date.now(), description, completed: !!completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

//eliminar tarea en especifico
listEditRouter.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    tasks.splice(index, 1);
    res.json({ message: "Tarea eliminada" });
});

//actualizar tarea en especifico
listEditRouter.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { description, completed } = req.body;
    const index = tasks.findIndex(task => task.id === taskId);
    if (index === -1) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    if (!description) {
        return res.status(400).json({ message: "La descripción de la tarea es requerida" });
    }
    tasks[index].description = description;
    tasks[index].completed = !!completed;
    res.json(tasks[index]);
});

module.exports = listEditRouter;