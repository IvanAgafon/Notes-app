'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Notebooks', [
      { name: 'Рабочие заметки', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Личное', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notebooks', null, {});
  },
};
