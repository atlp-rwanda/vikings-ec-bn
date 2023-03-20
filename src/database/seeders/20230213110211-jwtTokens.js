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
        {
          id: '95f1904c-375a-43f0-ab30-a13433d5ccce',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNzA2ZWE5LWEwMjAtNGE0MC05MDEwLWQ1ZjEwYzA0NDRlYyIsImVtYWlsIjoibXVrdW56aWZhYnJpY2VAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpmYWxzZSwiaWF0IjoxNjc3MjczODIzLCJleHAiOjE3MDg4MDk4MjN9.GF687iepo4QhAruPpGA4ngarvB-rV8KXlMyKPxznW6U',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd78bff40-44d1-4f63-9dca-7cb08e621778',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIyYWI5NDE2LTgxMjktNDNkYi05ZGMxLTZmMmY3YTE3NjMwYiIsImVtYWlsIjoiaXJha296ZXl2ZXM5QGdtYWlsLmNvbSIsInJvbGUiOiJzZWxsZXIiLCJtdXN0VXBkYXRlUGFzc3dvcmQiOm51bGwsImlhdCI6MTY3NzI2NTI3MywiZXhwIjoxNzA4ODAxMjczfQ.hd5v2x2YmKVkTGjlWQfxBjctZ4PHuPxHVdontmwkEsA',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'b0c35d3a-b0a5-4d31-98a3-4175da16d755',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2NzcyNzQwODIsImV4cCI6MTcwODgxMDA4Mn0.8kMCpB7JHqLrsggJlT2mlu5ZCOrEfJn1k-ImUYWWZ4M',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '10f95364-a42a-49fc-bcbc-1aa4406aecc6',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjUyNmFkLTc2YmUtNGY0NC1iNWQ5LTgwMzJmMDkyNWMyZCIsImVtYWlsIjoidmVyaWZpZWRAZ21haWwuY29tIiwicm9sZSI6ImJ1eWVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2NzgxODQxNTUsImV4cCI6MTcwOTcyMDE1NX0.56B8Bpj_OHRLCc4kuTBEN_NOvFNPa-ZT6PzlkkTbQXw',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'fe08d533-dadd-4605-90be-fff2733a198d',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1MzI3OGE3LWRhZjMtNGM2YS05OWVmLTc1NzlkOWI0M2MzMiIsImVtYWlsIjoia3dpenNhbUBnbWFpbC5jb20iLCJyb2xlIjoic2VsbGVyIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2NzgyMTg2ODEsImV4cCI6MTcwOTc1NDY4MX0.DEc1a-ioBjFXMubnBt2l8Zl4ZZNkb3ol0c50hK_xmIk',
          revoked: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'e16033ac-ca93-4949-b36f-cafd0463b3b9',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhlNGM2NWQwLWFiZTktNDA1YS1hMmY0LTViNzFhMjMzOGNkZCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwibXVzdFVwZGF0ZVBhc3N3b3JkIjpudWxsLCJpYXQiOjE2Nzg0NTcyODksImV4cCI6MTcwOTk5MzI4OX0.Tnl0hbkfWhxSH2zUXcu89KSJNSwEvZy6L42f9q9aySw',
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
