import mongoose from "mongoose";
const state = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Database is not configured");
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!state.mongooseConnection) {
    state.mongooseConnection = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
  }
  try {
    return await state.mongooseConnection;
  } finally {
    state.mongooseConnection = undefined;
  }
}
