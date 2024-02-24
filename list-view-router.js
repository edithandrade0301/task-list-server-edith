const express = require('express');
const listViewRouter = express.Router();

module.exports = function(tasks) {
    // Middleware para verificar parámetros en la ruta
    listViewRouter.param('id', (req, res, next, id) => {
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID de tarea inválido" });
        }
        next();
    });

    // Listar todas las tareas
    listViewRouter.get('/', (req, res) => {
        res.json(tasks);
    });

    // Ver una tarea en específico
    listViewRouter.get('/:id', (req, res) => {
        const taskId = req.params.id;
        const task = tasks.find(task => task.id === parseInt(taskId));
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        res.json(task);
    });

    // Filtrar por tareas completas o incompletas
    listViewRouter.get('/filter/:completed', (req, res) => {
        const filterCompleted = req.params.completed === 'completed';
        const filteredTasks = tasks.filter(task => task.completed === filterCompleted);
        res.json(filteredTasks);
    });

    return listViewRouter;
};
