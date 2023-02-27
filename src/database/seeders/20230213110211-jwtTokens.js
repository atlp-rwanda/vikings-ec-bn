'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'jwtTokens',
      [
        {
          id: '872526ad-76be-4f44-b5d9-8032f0925c2d',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6InNlbGxlciIsImZpcnN0bmFtZSI6IkphbmUiLCJsYXN0bmFtZSI6IkRvZSIsImdlbmRlciI6bnVsbCwic3RhdHVzIjpudWxsLCJhdmF0YXIiOm51bGwsInZlcmlmaWVkIjp0cnVlLCJpYXQiOjE2NzYyNzk2NjN9.ZG0Pyw4394QUzwqnd61La4x6DTXNf5LqUjN3Al7zlEM',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '78da159f-924d-426e-bd3d-61e63813b982',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc2NDMyZDg4LWE4OTEtNGM0Zi05YjhmLWFjYTk2NTEzZjRkZCIsImVtYWlsIjoidW52ZXJpZmllZEBnbWFpbC5jb20iLCJyb2xlIjoiYnV5ZXIiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOm51bGwsImlhdCI6MTY3NzEzNDM5NCwiZXhwIjoxNjc3MjIwNzk0fQ.hBJoz5hVjUSyVTYth-F5Y2cTCyWVbesQa-2z_fVbxSI',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2aa055fa-c1de-42ef-9952-f2a751d78aac',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyYWI5NDE2LTgxMjktNDNkYi05ZGMxLTZmMmY3YTE3NjMwYiIsImVtYWlsIjoiaXJha296ZXl2ZXM5QGdtYWlsLmNvbSIsInJvbGUiOiJzZWxsZXIiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOm51bGwsImlhdCI6MTY3NzEzMjYxNCwiZXhwIjoxNjc3MjE5MDE0fQ.0A0qNeE0C0IQif8iA5WBzL7dgYPSqo-v_-Idv3XUgDw',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '1c84c3d3-3ef0-4bba-8eb9-e3e9231b55d7',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2NzcxNDQxNzIsImV4cCI6MTcwODY4MDE3Mn0.tgs7nBut8C2QmtgRTxD1s4I3FFQaq_4NRMED0L7Nfjc',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
