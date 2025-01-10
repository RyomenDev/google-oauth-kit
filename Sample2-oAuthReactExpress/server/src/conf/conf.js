import dotenv from "dotenv";
dotenv.config();

const conf = {
  PORT: String(process.env.PORT),
  CLIENT_URL: String(process.env.CLIENT_URL),
  SERVER_URL: String(process.env.SERVER_URL),
  CORS_ORIGIN1: String(process.env.CORS_ORIGIN1),
  CORS_ORIGIN2: String(process.env.CORS_ORIGIN2),
  CORS_ORIGIN3: String(process.env.CORS_ORIGIN3),
  GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET),
  GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID),
};

export default conf;
