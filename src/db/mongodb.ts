// src/db/mongodb.ts

import mongoose from "mongoose";

const globalForMongoose = global as typeof globalThis & { mongooseConnection?: Promise<typeof mongoose> };

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured. Add it to .env.local before using the API.");
  if (mongoose.connection.readyState === 1) return mongoose;
  globalForMongoose.mongooseConnection ??= mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    return await globalForMongoose.mongooseConnection;
  } catch (error) {
    globalForMongoose.mongooseConnection = undefined;
    throw error;
  }
}
