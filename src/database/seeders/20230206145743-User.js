/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          firstname: 'Admin',
          lastname: 'Doe',
          email: 'admin@gmail.com',
          phone: '0987654321',
          password:'$2b$10$UZX4Fy9x4yJp4rTgiw0imelLLg.7JnGrrHqoPvbq9ThUlOu8e4n1e',
          role:'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
          verified: true
        },
        {
          id: '76432d88-a891-4c4f-9b8f-aca96513f4dd',
          firstname: 'Aline',
          lastname: 'Doe',
          email: 'unverified@gmail.com',
          phone: '0987654321',
          password:
            '$2b$10$V18ICOCv3sSBMYpONxTH6.iLeG6f7xL57oLz/ZwqMXyO521qi1XBK',
          role:'buyer',
          createdAt: new Date(),
          updatedAt: new Date(),
          verified: false,
        },
        {
          id: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'verified@gmail.com',
          phone: '0987654321',
          password:
            '$2b$10$loTArhq8vmd0bvzCP73VXut779UA1eltYXCsbPBL5Xddi7Y92oDka',
          role:'buyer',
          createdAt: new Date(),
          updatedAt: new Date(),
          verified: true,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
