import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.DB_NAME || "careerpath",
  },
  nodeEnv: process.env.NODE_ENV || "development",
};

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required in environment variables");
}
