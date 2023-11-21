import { config } from 'dotenv';
import { cleanEnv, num } from 'envalid';
config();

export const ENV = cleanEnv(process.env, {
  HTTP_PORT: num(),
  SOCKET_PORT: num(),
  DATABASE_URL: num(),
});
