'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@gmail.com',
          phone: '0987654321',
          password:
            '$2b$10$6XIoUddA2rVCqvxbJqEkQe/crcUGhFfmciE34QiVZnveTQss9PDle',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
