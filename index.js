const express = require('express');
const app = express();
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json());

//list-view-router
app.use('/view', listViewRouter);

//list-edit-router
app.use('/edit', listEditRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App running in port: " + PORT);
});