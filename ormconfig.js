const fs = require("fs");

module.exports = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: "all",
  // Change below to run ts or dev scripts
  entities: ["build/entities/**/*.js"],
  migrations: ["build/migration/**/*.js"],
  subscribers: ["build/subscriber/**/*.js"],
  cli: {
    entitiesDir: "build/entities",
    migrationsDir: "build/migration",
    subscribersDir: "build/subscriber",
  },
  // Only for SSL required connections
  ssl: {
    ca: fs.readFileSync(__dirname + "/ca-certificates.crt"),
    mode: "VERIFY_IDENTITY",
  },
};
