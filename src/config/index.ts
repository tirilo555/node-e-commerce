import URLParse from 'url-parse';
import dotenv from 'dotenv';

dotenv.config();

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
if (process.env.APP_DATABASE) {
  const url = URLParse(process.env.APP_DATABASE);
  db.host = url.hostname;
  db.port = url.port;
  db.username = url.username;
  db.password = url.password;
  db.database = url.pathname.substring(1);
}

export default {
  db,
};
