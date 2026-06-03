import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { hashPassword } from "@/lib/hash";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const hashedPassword = await hashPassword(
      body.password
    );

    const user = await User.create({
      nombre: body.nombre,
      cc: body.cc,
      email: body.email,
      password: hashedPassword,
      role: body.role,
    });

    return NextResponse.json(
      {
        success: true,
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}