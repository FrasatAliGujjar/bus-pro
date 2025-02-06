import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ===============================================================================

// Get Api
export async function GET() {
  try {
    const data = await prisma.users.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users", details: error.message },
      { status: 500 }
    );
  }
}

// ===============================================================================

// POST API--
export async function POST(req) {
  try {
    const { firstname, lastname, email, password, role } = await req.json();

    const UserData = await prisma.users.create({
      data: {
        firstname,
        lastname,
        email,
        password,
        role
      },
    });

    return NextResponse.json(UserData, { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error);

    return NextResponse.json(
      { error: "Failed to add user. Please try again later." },
      { status: 500 }
    );
  }
}

// ===============================================================================
