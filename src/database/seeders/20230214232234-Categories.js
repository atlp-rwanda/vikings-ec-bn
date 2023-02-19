'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
          name: 'shoes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'e0bebe02-acb2-440d-b445-267c3c586a9f',
          name: 'clothes',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
