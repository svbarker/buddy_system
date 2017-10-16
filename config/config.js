require("dotenv").config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "buddy_system_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: "buddy_system_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: process.env.DATABASE_URL,
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
