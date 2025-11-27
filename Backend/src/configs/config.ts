import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port_backend: process.env.PORT_BACKEND ? Number(process.env.PORT_BACKEND): 5000,
  port_frontend: process.env.PORT_FRONTEND ? Number(process.env.PORT_FRONTEND): 8000,
  mongo_uri: process.env.MONGO_URI || ""
}