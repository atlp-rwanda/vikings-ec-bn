'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          id: '6717e8c7-c058-4670-90c3-5c8953cc844a',
          name: 'Beans',
          price: 1500,
          categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
          bonus: 200,
          expiryDate:'2023-04-29T00:00:00.000Z',
          images: [
            'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
            'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
            'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
            'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
          ],
          userId: '8e4c65d0-abe9-405a-a2f4-5b71a2338cdd',
          isAvailable:true,
          isExpired:false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
          {
            id: 'b5e75a01-5e67-44ad-91bd-f36ab3564a48',
            name: 'Jordan',
            price: 15000,
            categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
            expiryDate:'2023-04-29T00:00:00.000Z',
            bonus: 2000,
            images: [
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
            ],
            userId: 'b2ab9416-8129-43db-9dc1-6f2f7a17630b',
            isAvailable:false,
            isExpired:false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '470b79cc-35ca-49ec-b0d8-3334bfe735a6',
            name: 'Jordan',
            price: 15000,
            categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
            expiryDate:'2023-04-29T00:00:00.000Z',
            bonus: 2000,
            images: [
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
            ],
            userId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 'b1093b42-f577-4c7f-86db-13a35b6e1112',
            name: 'nike',
            price: 15000,
            categoryId: '1a2ef741-1488-4435-b2e2-4075a6a169eb',
            expiryDate:'2023-04-29T00:00:00.000Z',
            bonus: 2000,
            images: [
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800915/projects/ecommerce/f258e7aa-b540-469d-b866-fd13747c81ce_1676800912.287.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800917/projects/ecommerce/e2f9d092-324d-42e1-9afe-97eda06c62c6_1676800915.589.jpg',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800918/projects/ecommerce/3b61b563-7451-4d6b-973a-b8fda5b90d1d_1676800917.439.webp',
              'http://res.cloudinary.com/djg7yg23y/image/upload/v1676800921/projects/ecommerce/daf580b9-306c-4e6c-a403-ac51317642e7_1676800918.739.webp',
            ],
            userId: '872526ad-76be-4f44-b5d9-8032f0925c2d',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {},
};
