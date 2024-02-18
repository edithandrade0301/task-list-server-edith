const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Variable para almacenar las tareas
const tasks = [];

app.use(express.json());

// Middleware para asegurar solicitudes HTTP válidas
app.use((req, res, next) => {
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
        return res.status(400).json({ message: "Método HTTP no válido" });
    }
    next();
});

// list-view-router
app.use('/view', listViewRouter(tasks));

// list-edit-router
app.use('/edit', listEditRouter(tasks));

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App running in port: " + PORT);
});