'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        'Notifications',
        [
          {
            id: '6db24f63-8110-4162-bc5e-a7641e7c92f1',
            receiverId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
            type:'update-password',
            message: 'it\'s time to update your password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'cf775e9e-0a7e-44b1-bded-2db74adf9e6d',
            receiverId: 'b53278a7-daf3-4c6a-99ef-7579d9b43c32',
            type:'update-password',
            message: 'it\'s time to update your password',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
    );
  },

  // eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {}
};
