const express = require('express');
const listEditRouter = express.Router();

module.exports = function(tasks) {
    // Middleware para manejar errores en solicitudes POST y PUT
    listEditRouter.use((req, res, next) => {
        if ((req.method === 'POST' || req.method === 'PUT') && Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Cuerpo de solicitud vacío" });
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            const { completed } = req.body;
            if (completed !== undefined && typeof completed !== 'boolean') {
                return res.status(400).json({ message: "El valor del atributo 'completed' debe ser un booleano" });
            }
        }
        
        next();
    });

    // Crear una tarea
    listEditRouter.post('/', (req, res) => {
        const { description, completed } = req.body;
        const newTask = { id: Date.now(), description, completed: !!completed };
        tasks.push(newTask);
        res.status(201).json(newTask);
    });

    // Eliminar tarea en específico
    listEditRouter.delete('/:id', (req, res) => {
        const taskId = parseInt(req.params.id);
        const index = tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        tasks.splice(index, 1);
        res.json({ message: "Tarea eliminada" });
    });

    // Actualizar tarea en específico
    listEditRouter.put('/:id', (req, res) => {
        const taskId = parseInt(req.params.id);
        const { description, completed } = req.body;
        const index = tasks.findIndex(task => task.id === taskId);
        if (index === -1) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        if (description) {
            tasks[index].description = description;
        }
        if (completed !== undefined) {
            tasks[index].completed = !!completed;
        }
        res.json(tasks[index]);
    });

    return listEditRouter;
};
