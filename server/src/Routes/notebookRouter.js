const notebookRouter = require('express').Router();
const NotebookController = require('../Controllers/NotebookController');
const verifyAccessToken = require('../middlewares/verifyTokens');

notebookRouter.post('/', verifyAccessToken, NotebookController.createNotebook);
notebookRouter.get('/', verifyAccessToken, NotebookController.getNotebooks);
notebookRouter.put('/:id', verifyAccessToken, NotebookController.updateNotebook);
notebookRouter.delete('/:id', verifyAccessToken, NotebookController.deleteNotebook);

module.exports = notebookRouter;
