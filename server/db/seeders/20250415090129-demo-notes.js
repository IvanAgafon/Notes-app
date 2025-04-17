'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notes', [
      {
        title: 'План на день',
        content: '1. Совещание 2. Код ревью 3. Запись в дневник',
        notebookId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Список покупок',
        content: 'Хлеб, молоко, сыр',
        notebookId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notes', null, {});
  },
};
