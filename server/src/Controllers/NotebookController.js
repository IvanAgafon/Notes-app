const { Notebook } = require('../../db/models');

class NotebookController {
  static createNotebook = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = res.locals.user.id;

      const notebook = await Notebook.create({ name, userId });
      res.status(201).json(notebook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getNotebooks = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const notebooks = await Notebook.findAll({ where: { userId } });
      res.json(notebooks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static updateNotebook = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;

      const notebook = await Notebook.findOne({ where: { id, userId } });
      if (!notebook)
        return res.status(404).json({ error: 'Notebook not found or unauthorized' });

      await notebook.update(req.body);
      res.json(notebook);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static deleteNotebook = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;

      const deleted = await Notebook.destroy({ where: { id, userId } });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Notebook not found or unauthorized' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = NotebookController;
