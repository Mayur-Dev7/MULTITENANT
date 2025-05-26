import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/init-db"

export async function POST() {
  try {
    console.log("Initializing database...")
    await initializeDatabase()

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully with demo data",
    })
  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize database", details: error }, { status: 500 })
  }
}
