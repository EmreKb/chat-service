import { config } from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
config();

export const ENV = cleanEnv(process.env, {
  HTTP_PORT: num(),
  SOCKET_PORT: num(),
  DATABASE_URL: str(),
  GET_USER_URL: str(),
  GET_USER_BY_ID_URL: str(),
  KEY: str(),
});
