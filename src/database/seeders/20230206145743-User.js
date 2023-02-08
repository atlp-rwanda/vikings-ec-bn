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
          email: 'unverified@gmail.com',
          phone: '0987654321',
          password:
            '$2b$10$V18ICOCv3sSBMYpONxTH6.iLeG6f7xL57oLz/ZwqMXyO521qi1XBK',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'verified@gmail.com',
          phone: '0987654321',
          password:
            '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
          createdAt: new Date(),
          updatedAt: new Date(),
          verified: true
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
