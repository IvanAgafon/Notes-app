const noteRouter = require('express').Router();
const NoteController = require('../Controllers/NoteController');
const verifyAccessToken = require('../middlewares/verifyTokens');

noteRouter.post('/', verifyAccessToken, NoteController.createNote);
noteRouter.get('/', verifyAccessToken, NoteController.getNotes);
noteRouter.put('/:id', verifyAccessToken, NoteController.updateNote);
noteRouter.delete('/:id', verifyAccessToken, NoteController.deleteNote);

module.exports = noteRouter;
