import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.RDS_ENDPOINT,
  user: process.env.RDS_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 30000,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 5,
  timezone: "+00:00",
};

const db = mysql.createPool(dbConfig);
export default db;
export { db };
