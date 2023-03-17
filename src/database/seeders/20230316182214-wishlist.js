'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
function cleanArray (arr) {
  return '{"' + arr.join('", "') + '"}';
}

function cleanEntry (obj) {
  return JSON.stringify(obj).replace(/"/g, '\\"');
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Wishlists',
      [
        {
          id: '6db24f63-8110-4162-bc5e-a7641e7c92f1',
          productsId: cleanArray(["b5e75a01-5e67-44ad-91bd-f36ab3564a48"]),
          userId: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
