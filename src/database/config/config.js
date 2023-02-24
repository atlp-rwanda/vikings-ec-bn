require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  //   logging:false
   },
  test: {
    url: process.env.TEST_DATABASE_URL,
    // url: process.env.HUGUE_REMOTE,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
     logging:false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
