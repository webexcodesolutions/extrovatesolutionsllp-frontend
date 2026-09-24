import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/db/mongodb";

export async function GET() {
  try {
    await connectDB();

    const db = mongoose.connection.db;

    if (!db) {
      throw new Error("MongoDB database is unavailable");
    }

    await db.admin().ping();

    return NextResponse.json({
      success: true,
      database: mongoose.connection.name,
      state: mongoose.connection.readyState,
      message: "MongoDB connected successfully",
    });
  } catch (error) {
    console.error("MongoDB health check failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed",
      },
      { status: 500 },
    );
  }
}
