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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoidW52ZXJpZmllZEBnbWFpbC5jb20iLCJyb2xlIjpudWxsLCJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJnZW5kZXIiOm51bGwsInN0YXR1cyI6bnVsbCwiYXZhdGFyIjpudWxsLCJ2ZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjc2MzE3MzI0fQ.V-cSXeJe6GbSusqIff2ttiJSXi3-t7uFwrqtq2n5lyM',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '1c84c3d3-3ef0-4bba-8eb9-e3e9231b55d7',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwiaWF0IjoxNjc3MDU2MzU5LCJleHAiOjE2NzcxNDI3NTl9.c971QztK-_jdubOn4sXHr6lez3BumlsBHXVUzoJLp5o',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '10f3f744-ab25-4a3a-8b02-745834cf7056',
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
