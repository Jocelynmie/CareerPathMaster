export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017",
    dbName: process.env.DB_NAME || "careerpath",
  },
};
