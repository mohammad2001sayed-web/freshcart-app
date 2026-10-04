import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "hello",
    User: [
      { name: "hamada", email: "hj6W4@example.com" },
      { name: "mohamed", email: "hj6W4@example.com" },
      { name: "ali", email: "hj6W4@example.com" },
    ],
  });
}
