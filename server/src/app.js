const exrpess = require('express');
const cookieParser = require('cookie-parser');
const noteRouter = require('./Routes/noteRouter');
const notebookRouter = require('./Routes/notebookRouter');
const authRouter = require('./Routes/authRouter');

const app = exrpess();

app.use(exrpess.urlencoded({ extended: true }));
app.use(exrpess.json());
app.use(cookieParser());

app.use('/api/notes', noteRouter);
app.use('/api/notebooks', notebookRouter);
app.use('/api/auth', authRouter);

module.exports = app;
