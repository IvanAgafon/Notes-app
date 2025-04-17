const { Note, Notebook } = require('../../db/models');

class NoteController {
  // Создание заметки — проверяем, что notebook принадлежит пользователю
  static createNote = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const { title, content, notebookId } = req.body;

      const notebook = await Notebook.findOne({ where: { id: notebookId, userId } });
      if (!notebook) {
        return res.status(403).json({ error: 'Unauthorized or notebook not found' });
      }

      const note = await Note.create({ title, content, notebookId });
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Получение всех заметок пользователя через include Notebook
  static getNotes = async (req, res) => {
    try {
      const userId = res.locals.user.id;

      const notes = await Note.findAll({
        include: {
          model: Notebook,
          where: { userId },
          attributes: [], // не включаем notebook в ответ
        },
      });

      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Обновление заметки — через include проверяем владельца
  static updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;

      const note = await Note.findOne({
        where: { id },
        include: {
          model: Notebook,
          where: { userId },
          attributes: [],
        },
      });

      if (!note) {
        return res.status(404).json({ error: 'Note not found or unauthorized' });
      }

      await note.update(req.body);
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Удаление заметки — через include проверяем владельца
  static deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user.id;

      const note = await Note.findOne({
        where: { id },
        include: {
          model: Notebook,
          where: { userId },
          attributes: [],
        },
      });

      if (!note) {
        return res.status(404).json({ error: 'Note not found or unauthorized' });
      }

      await note.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = NoteController;
